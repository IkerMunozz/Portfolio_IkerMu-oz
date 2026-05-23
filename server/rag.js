// RAG Engine: chunking, embeddings, and retrieval
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHUNK_SIZE = 400;
const CHUNK_OVERLAP = 80;
const TOP_K = 3;

// ─── Embedding (fallback word-frequency, no external deps) ───────────────
/**
 * Generates a simple word-frequency based embedding.
 * For production, swap with OpenAI or @xenova/transformers.
 */
export function getEmbedding(text) {
  const stopWords = new Set([
    'the','and','for','are','but','not','you','all','can','had','her','was',
    'one','our','out','has','have','been','from','this','that','with','will',
    'each','made','also','into','like','just','more','some','them','than',
    'then','its','over','such','that','when','which','their','there','about',
    'what','where','would','could','should','after','before','between','during',
    'through','because','while','although','though','however','therefore',
    'de','del','la','el','en','es','un','una','los','las','se','por','con',
    'para','sus','como','fue','muy','son','sus','me','al','lo','le','si','no',
    'ha','he','te','mi','tu','nos','os','yo','tu','él','ella','esto','esa',
    'ese','esa','esa','eso','ese','esos','esas','aquel','aquella'
  ]);
  
  const words = text.toLowerCase()
    .replace(/[^a-záéíóúñü0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
  
  const freq = {};
  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }
  
  // Normalize frequencies
  const max = Math.max(...Object.values(freq), 1);
  const sorted = Object.entries(freq)
    .map(([word, count]) => [word, count / max])
    .sort((a, b) => b[1] - a[1]);
  
  // Return top 50 words as a sparse vector (word:weight pairs)
  return sorted.slice(0, 50);
}

// ─── Cosine similarity for sparse vectors ────────────────────────────────
function similarity(a, b) {
  // a and b are arrays of [word, weight] pairs
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
export function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  // Split into sentences
  const sentences = text
    .split(/(?<=[.!?;])\s+/)
    .filter(s => s.trim().length > 10);
  
  if (sentences.length === 0) {
    // Fallback: split by spaces
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
      // Overlap: keep last words
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
export function chunkSections(sections) {
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
  
  console.log(`✅ Created ${allChunks.length} chunks from sections:`, Object.keys(sections).filter(k => sections[k]?.length > 0).join(', '));
  return allChunks;
}

// ─── Build embeddings for all chunks ─────────────────────────────────────
export function buildEmbeddings(chunks) {
  console.log('🧠 Generating embeddings...');
  
  for (let i = 0; i < chunks.length; i++) {
    chunks[i].embedding = getEmbedding(chunks[i].text);
    if ((i + 1) % 5 === 0) {
      console.log(`   Processed ${i + 1}/${chunks.length} chunks`);
    }
  }
  
  return chunks;
}

// ─── Retrieval ───────────────────────────────────────────────────────────
export function retrieve(query, chunks, topK = TOP_K) {
  const queryLower = query.toLowerCase();
  
  // Section-based boosting
  const sectionBoosts = { experience: 0, skills: 0, projects: 0, education: 0, summary: 0, other: 0 };
  
  if (/experienc|trabajo|empleo|prac|hpe|hp /i.test(queryLower)) sectionBoosts.experience = 0.15;
  if (/skill|tecnolog|herramient|stack|lenguaj|framework|librer/i.test(queryLower)) sectionBoosts.skills = 0.15;
  if (/proyect|tfc|tfm|swappy|yolo|trafico|traffic|app|web|plataform/i.test(queryLower)) sectionBoosts.projects = 0.15;
  if (/formaci|educ|estudio|grado|curs|certif|ies|univers/i.test(queryLower)) sectionBoosts.education = 0.15;
  if (/sobre|sobre mi|quien|quien eres|nombre|perfil|about/i.test(queryLower)) sectionBoosts.summary = 0.15;
  
  // Compute query embedding
  const queryEmbedding = getEmbedding(query);
  
  // Score each chunk
  const scored = chunks.map(chunk => {
    if (!chunk.embedding) return { ...chunk, score: 0 };
    const sim = similarity(queryEmbedding, chunk.embedding);
    const boost = sectionBoosts[chunk.section] || 0;
    return { ...chunk, score: sim + boost };
  });
  
  // Sort and return top K
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

// ─── Build context string from retrieved chunks ──────────────────────────
export function buildContext(retrievedChunks) {
  return retrievedChunks
    .map(c => c.text)
    .join('\n\n---\n\n');
}

// ─── Load & initialize everything ────────────────────────────────────────
export function initRAG() {
  const sectionsPath = path.join(__dirname, 'cv-text.json');
  
  if (!fs.existsSync(sectionsPath)) {
    throw new Error('cv-text.json not found. Run "npm run preprocess" first.');
  }
  
  const sections = JSON.parse(fs.readFileSync(sectionsPath, 'utf-8'));
  const chunks = chunkSections(sections);
  buildEmbeddings(chunks);
  
  return { chunks, sections };
}
