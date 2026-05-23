// RAG Engine: chunking, embeddings, and retrieval (serverless-compatible)
const CHUNK_SIZE = 400;
const CHUNK_OVERLAP = 80;
const TOP_K = 3;

// ─── Embedding (word-frequency, no external deps) ────────────────────────
function getEmbedding(text) {
  const stopWords = new Set([
    'the','and','for','are','but','not','you','all','can','had','her','was',
    'one','our','out','has','have','been','from','this','that','with','will',
    'each','made','also','into','like','just','more','some','them','than',
    'then','its','over','such','when','which','their','there','about',
    'what','where','would','could','should','after','before','between','during',
    'through','because','while','although','though','however','therefore',
    'de','del','la','el','en','es','un','una','los','las','se','por','con',
    'para','sus','como','fue','muy','son','sus','me','al','lo','le','si','no',
    'ha','he','te','mi','tu','nos','os','yo','tu','él','ella','esto','esa',
    'ese','eso','esos','esas','aquel','aquella','que','es','su','por','para',
    'con','sus','como','fue','muy','son','sus','una','los','las','del','se'
  ]);
  
  const words = text.toLowerCase()
    .replace(/[^a-záéíóúñü0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
  
  const freq = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }
  
  const max = Math.max(...Object.values(freq), 1);
  const sorted = Object.entries(freq)
    .map(([word, count]) => [word, count / max])
    .sort((a, b) => b[1] - a[1]);
  
  return sorted.slice(0, 50);
}

// ─── Cosine similarity for sparse vectors ────────────────────────────────
function similarity(a, b) {
  const mapA = new Map(a);
  const mapB = new Map(b);
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (const [word, weight] of a) {
    normA += weight * weight;
    if (mapB.has(word)) {
      dotProduct += weight * mapB.get(word);
    }
  }
  
  for (const [, weight] of b) {
    normB += weight * weight;
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ─── Chunking (sentence-aware) ───────────────────────────────────────────
function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const sentences = text
    .split(/(?<=[.!?;])\s+/)
    .filter(s => s.trim().length > 10);
  
  if (sentences.length === 0) {
    const words = text.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += chunkSize / 6) {
      chunks.push(words.slice(i, i + chunkSize / 6).join(' '));
    }
    return chunks;
  }
  
  const chunks = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).trim().length > chunkSize && currentChunk.length > 20) {
      chunks.push(currentChunk.trim());
      const words = currentChunk.split(' ');
      const keep = Math.min(Math.floor(overlap / 6), words.length);
      currentChunk = words.slice(-keep).join(' ') + ' ' + sentence;
    } else {
      currentChunk = currentChunk ? currentChunk + ' ' + sentence : sentence;
    }
  }
  
  if (currentChunk.trim().length > 20) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

// ─── Section-aware chunking ──────────────────────────────────────────────
function chunkSections(sections) {
  const allChunks = [];
  
  for (const [section, text] of Object.entries(sections)) {
    if (!text || text.length < 50) continue;
    const chunks = chunkText(text);
    for (const chunk of chunks) {
      allChunks.push({
        section,
        text: chunk,
        label: `[${section.toUpperCase()}] ${chunk}`
      });
    }
  }
  
  return allChunks;
}

// ─── Build embeddings for all chunks ─────────────────────────────────────
function buildEmbeddings(chunks) {
  for (let i = 0; i < chunks.length; i++) {
    chunks[i].embedding = getEmbedding(chunks[i].text);
  }
  return chunks;
}

// ─── Retrieval ───────────────────────────────────────────────────────────
function retrieve(query, chunks, topK = TOP_K) {
  const q = query.toLowerCase();
  
  const sectionBoosts = { experience: 0, skills: 0, projects: 0, education: 0, summary: 0, other: 0 };
  
  if (/experienc|trabajo|trabaj|empleo|prac|hpe|hp |laboral|historial/i.test(q)) sectionBoosts.experience = 0.15;
  if (/skill|tecnolog|stack|lenguaj|framework|herramient|competenc|sabe|conoc/i.test(q)) sectionBoosts.skills = 0.15;
  if (/proyect|tfc|tfm|swappy|yolo|trafico|traffic|app|web|plataform/i.test(q)) sectionBoosts.projects = 0.15;
  if (/formaci|educ|estudio|grado|curs|certif|ies|univers/i.test(q)) sectionBoosts.education = 0.15;
  if (/sobre|sobre mi|quien|quien eres|nombre|perfil|about/i.test(q)) sectionBoosts.summary = 0.15;
  
  const queryEmbedding = getEmbedding(query);
  
  const scored = chunks.map(chunk => {
    if (!chunk.embedding) return { ...chunk, score: 0 };
    const sim = similarity(queryEmbedding, chunk.embedding);
    const boost = sectionBoosts[chunk.section] || 0;
    return { ...chunk, score: sim + boost };
  });
  
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

// ─── Build context string ────────────────────────────────────────────────
function buildContext(retrievedChunks) {
  return retrievedChunks.map(c => c.text).join('\n\n---\n\n');
}

// ─── Initialize from sections JSON ───────────────────────────────────────
function initRAG(sections) {
  const chunks = chunkSections(sections);
  buildEmbeddings(chunks);
  return { chunks, sections };
}

// ─── Parse Portfolio.jsx for projects ────────────────────────────────────
function extractProjectsFromPortfolio(portfolioSource) {
  const projectsStart = portfolioSource.indexOf('id="projects"');
  if (projectsStart === -1) return [];
  
  const projectsEnd = portfolioSource.indexOf('id="skills"', projectsStart);
  if (projectsEnd === -1) return [];
  
  const projectsSection = portfolioSource.slice(projectsStart, projectsEnd);
  const projects = [];
  
  const cardRegex = /<div className="bg-slate-800\/50.*?grid md:grid-cols-2 gap-0">/gs;
  const cards = projectsSection.split(cardRegex);
  
  for (let i = 1; i < cards.length; i++) {
    const card = cards[i];
    
    const nameMatch = card.match(/<h3\s+className="text-3xl font-bold">\s*([^<]+?)\s*<\/h3>/);
    if (!nameMatch) continue;
    
    const name = nameMatch[1].trim();
    if (name.length > 60 || name.length < 2) continue;
    
    const nameIndex = card.indexOf(nameMatch[0]);
    const afterName = card.slice(nameIndex + nameMatch[0].length);
    
    const descMatch = afterName.match(/<p\s+className="text-slate-300[^"]*">\s*(.+?)\s*<\/p>/s);
    let description = '';
    if (descMatch) {
      description = descMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    }
    
    const stackHeading = afterName.indexOf('Stack Tecnol');
    if (stackHeading === -1) continue;
    
    const afterStack = afterName.slice(stackHeading);
    const arrayMatch = afterStack.match(/\[([\s\S]*?)\]\.map/);
    const techs = [];
    if (arrayMatch) {
      const items = arrayMatch[1]
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(s => s.length > 1 && s.length < 30);
      techs.push(...items);
    }
    
    const features = [];
    const featureRegex = /<span[^>]*>\s*<span[^>]*>([^<]+)<\/span>:\s*(.+?)<\/span>\s*<\/li>/gs;
    let featureMatch;
    while ((featureMatch = featureRegex.exec(card)) !== null) {
      const title = featureMatch[1].trim();
      const desc = featureMatch[2].replace(/<[^>]+>/g, '').trim();
      if (title.length > 5 && desc.length > 10) {
        features.push(`${title}: ${desc}`);
      }
    }
    
    const githubMatch = card.match(/href="(https:\/\/github\.com\/[^"]+)"/);
    const github = githubMatch ? githubMatch[1] : null;
    
    projects.push({ name, description, stack: [...new Set(techs)], features, github });
  }
  
  return projects;
}

function projectToChunks(projects) {
  const chunks = [];
  
  for (const project of projects) {
    let text = `Proyecto: ${project.name}. `;
    if (project.description) text += `${project.description} `;
    if (project.stack && project.stack.length > 0) text += `Tecnologías: ${project.stack.join(', ')}. `;
    if (project.features && project.features.length > 0) text += `Características: ${project.features.join('. ')}.`;
    if (project.github) text += ` Código: ${project.github}.`;
    
    chunks.push({ section: 'projects', text: text.replace(/\s+/g, ' ').trim(), label: `[PROJECTS] ${project.name}` });
    
    if (project.stack.length > 0) {
      chunks.push({ section: 'projects', text: `${project.name} utiliza: ${project.stack.join(', ')}.`, label: `[PROJECTS STACK] ${project.name}` });
    }
  }
  
  return chunks;
}

export { initRAG, retrieve, buildContext, extractProjectsFromPortfolio, projectToChunks };
