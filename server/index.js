// Express server with RAG chatbot endpoint
import express from 'express';
import cors from 'cors';
import { initRAG, retrieve, buildContext } from './rag.js';
import { extractProjectsFromPortfolio, projectToChunks } from './parse-portfolio.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Initialize RAG on startup ───────────────────────────────────────────
let ragData = null;

try {
  ragData = initRAG();
  console.log('✅ RAG system initialized with', ragData.chunks.length, 'chunks from CV');
  
  // Also parse Portfolio.jsx for projects
  const portfolioProjects = extractProjectsFromPortfolio();
  const portfolioChunks = projectToChunks(portfolioProjects);
  
  // Merge portfolio project chunks into RAG data
  ragData.chunks = [...ragData.chunks, ...portfolioChunks];
  ragData.projects = portfolioProjects;
  
  console.log(`✅ Added ${portfolioChunks.length} chunks from Portfolio.jsx`);
  console.log(`📊 Total chunks: ${ragData.chunks.length}`);
} catch (err) {
  console.error('❌ Failed to initialize RAG:', err.message);
  console.error('   Run "npm run preprocess" first to extract CV text.');
}

// ─── Chat endpoint ───────────────────────────────────────────────────────
app.post('/chat', (req, res) => {
  const { message } = req.body;
  
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  if (!ragData) {
    return res.status(503).json({
      reply: 'El sistema RAG no está inicializado. Ejecuta "npm run preprocess" primero.'
    });
  }
  
  // Step 1: Retrieve relevant chunks
  const retrieved = retrieve(message, ragData.chunks);
  
  // Step 2: Build context
  const context = buildContext(retrieved);
  
  console.log(`💬 Query: "${message}"`);
  console.log(`   Retrieved ${retrieved.length} chunks (scores: ${retrieved.map(r => r.score.toFixed(3)).join(', ')})`);
  
  // Step 3: Generate response
  // OPTION A: Simple template-based response (no LLM, works offline)
  const reply = generateResponse(message, context, retrieved);
  
  // OPTION B: Uncomment below to use OpenAI/Qwen API
  // const reply = await generateWithLLM(message, context);
  
  res.json({ reply, chunks: retrieved.map(r => ({ text: r.text, score: r.score, section: r.section })) });
});

// ─── Health check ────────────────────────────────────────────────────────
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    chunks: ragData ? ragData.chunks.length : 0,
    sections: ragData ? Object.keys(ragData.sections) : []
  });
});

// ─── Response generation (smart template-based, no LLM needed) ───────────
function generateResponse(query, context, retrieved) {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (!context || context.length < 20) {
    return `No tengo información específica sobre eso en el CV de Iker. Puedes contactarle en ikermunozherrero@gmail.com o por LinkedIn para más detalles.`;
  }

  // ── Contact queries ──
  if (/contact|email|mail|linkedin|github|telefono|phone|ubicacion|donde|where/i.test(q)) {
    return `Email: ikermunozherrero@gmail.com\nLinkedIn: linkedin.com/in/iker-muñoz-herrero\nGitHub: github.com/IkerMunozz\nUbicación: La Puebla de Montalbán, Toledo\nTeléfono: +34 663 799 362`;
  }

  // ── Experience queries ──
  if (/experienc|trabajo|trabaj|empleo|prac|hpe|hp |laboral|historial/i.test(q)) {
    const expChunks = retrieved.filter(r => r.section === 'experience');
    if (expChunks.length === 0) return 'No encuentro información detallada sobre su experiencia laboral en el CV.';
    
    let resp = 'Experiencia laboral:\n\n';
    resp += 'HPE (Hewlett Packard Enterprise) — Web Developer (Mar 2025 – Jun 2025)\n';
    
    const text = expChunks.map(r => r.text).join(' ');
    const bullets = text.split(/[•·]/).map(s => s.trim()).filter(s => s.length > 15);
    for (const bullet of bullets) {
      resp += `- ${bullet}\n`;
    }
    
    return resp.trim();
  }

  // ── Skills queries ──
  if (/skill|tecnolog|stack|lenguaj|framework|herramient|competenc|sabe|conoc/i.test(q)) {
    const skillChunks = retrieved.filter(r => r.section === 'skills');
    if (skillChunks.length === 0) return 'No encuentro información detallada sobre sus skills.';
    
    let resp = 'Stack tecnológico:\n\n';
    resp += '- Lenguajes: Java, JavaScript, Python, HTML, CSS\n';
    resp += '- Frameworks: Spring Boot, React, Tailwind CSS\n';
    resp += '- IA/ML: TensorFlow, PyTorch, YOLOv8, Keras, Scikit-learn\n';
    resp += '- Big Data: Apache Spark, Hadoop, Streamlit\n';
    resp += '- Bases de datos: MySQL, PostgreSQL, MongoDB\n';
    resp += '- DevOps: Docker, Git, REST APIs';
    
    return resp.trim();
  }

  // ── Projects queries ──
  if (/proyect|app|web|swappy|yolo|trafico|traffic|portfolio|portfolio|tfc/i.test(q)) {
    // Use portfolio.jsx data if available
    if (ragData.projects && ragData.projects.length > 0) {
      let resp = 'Proyectos destacados:\n\n';
      for (const p of ragData.projects) {
        resp += `- ${p.name}`;
        if (p.description) resp += `: ${p.description}`;
        if (p.stack && p.stack.length > 0) resp += ` [${p.stack.join(', ')}]`;
        resp += '\n';
        if (p.github) resp += `  GitHub: ${p.github}\n`;
      }
      return resp.trim();
    }
    
    // Fallback to CV data
    const projChunks = retrieved.filter(r => r.section === 'projects');
    if (projChunks.length === 0) return 'No encuentro información detallada sobre sus proyectos.';
    
    let resp = 'Proyectos destacados:\n\n';
    resp += '- Swappy: Plataforma de compraventa con IA (YOLOv8) para validación de imágenes y geolocalización con Leaflet. Stack: Java, Spring Boot, Python, Docker.\n';
    resp += '- Custom Object Detection (YOLOv8): Fine-tuning de YOLOv8 para detección personalizada con arquitectura multi-modelo.\n';
    resp += '- Traffic Flow Analysis: Análisis y predicción de tráfico urbano con Python y Machine Learning.\n';
    resp += '- Generador de conversaciones sintéticas: Sistema NLP con Python para crear conversaciones simuladas.\n';
    resp += '- Portfolio: Este portfolio en React (portfolio-iker-mu-oz.vercel.app)';
    
    return resp.trim();
  }

  // ── Education queries ──
  if (/formaci|educ|estudio|grado|curs|certif|ies|univers|escuela/i.test(q)) {
    let resp = 'Formación:\n\n';
    resp += '- Especialización IA y Big Data (2025–2026) — IES Ribera del Tajo\n';
    resp += '- Técnico Superior en Desarrollo Web (2023–2025) — IES Azarquiel, Toledo\n';
    resp += '- Bachillerato Tecnológico (2021–2023) — IES Juan de Lucena';
    
    return resp.trim();
  }

  // ── About / who is ──
  if (/quien|sobre|perfil|about|presentaci|resume|cv|curriculum/i.test(q)) {
    let resp = 'Iker Muñoz Herrero — Desarrollador Full Stack\n\n';
    resp += 'Formación en Java, Spring Boot, React, Python, Machine Learning y Big Data. ';
    resp += 'Realizó prácticas en HPE implementando modelos de IA para detección de objetos y sistemas predictivos. ';
    resp += 'Actualmente se especializa en Inteligencia Artificial y Big Data.\n\n';
    resp += 'Ubicación: La Puebla de Montalbán, Toledo\n';
    resp += 'Email: ikermunozherrero@gmail.com';
    
    return resp.trim();
  }

  // ── Default: build a clean summary from retrieved chunks ──
  const sections = [...new Set(retrieved.map(r => r.section))];
  const sectionLabel = sections.includes('experience') ? 'experiencia'
    : sections.includes('skills') ? 'competencias técnicas'
    : sections.includes('projects') ? 'proyectos'
    : sections.includes('education') ? 'formación'
    : 'información';

  // Clean and deduplicate chunk text
  let content = retrieved
    .map(r => r.text)
    .join(' ')
    // Remove PDF noise
    .replace(/^[o•·]\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Limit length and clean
  if (content.length > 400) {
    content = content.slice(0, 400);
    const lastPeriod = content.lastIndexOf('.');
    if (lastPeriod > 100) content = content.slice(0, lastPeriod + 1);
  }

  return `Según el CV de Iker Muñoz, sobre ${sectionLabel}:\n\n${content}`;
}

// ─── OpenAI/Qwen integration (OPTIONAL - uncomment to use) ───────────────
/*
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  // For Qwen: set OPENAI_BASE_URL to your Qwen endpoint
});

async function generateWithLLM(query, context) {
  const prompt = `Eres un asistente que responde preguntas sobre el CV de Iker Muñoz Herrero.
Responde de forma profesional y concisa, como si hablaras con un reclutador.

Contexto del CV:
${context}

Pregunta: ${query}

Responde SOLO basándote en el contexto proporcionado. Si la información no está en el contexto, dilo honestamente.`;

  const completion = await openai.chat.completions.create({
    model: process.env.MODEL_NAME || 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
    temperature: 0.7,
  });
  
  return completion.choices[0].message.content;
}
*/

// ─── Start server ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 RAG CV Chatbot running on http://localhost:${PORT}`);
  console.log(`   POST /chat  -  { "message": "¿Cuál es su experiencia?" }`);
  console.log(`   GET  /health - Check system status\n`);
});
