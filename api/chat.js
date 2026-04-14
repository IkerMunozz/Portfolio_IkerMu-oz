import { initRAG, retrieve, buildContext, extractProjectsFromPortfolio, projectToChunks } from './rag.js';
import fs from 'fs';
import path from 'path';

// ─── Initialize RAG data (cached across invocations) ─────────────────────
let ragData = null;

function getRAGData() {
  if (ragData) return ragData;
  
  // Load CV sections
  const sectionsPath = path.join(process.cwd(), 'api', 'cv-text.json');
  const sections = JSON.parse(fs.readFileSync(sectionsPath, 'utf-8'));
  
  // Load Portfolio.jsx for projects
  const portfolioPath = path.join(process.cwd(), 'src', 'components', 'Portfolio.jsx');
  let portfolioSource = '';
  try {
    portfolioSource = fs.readFileSync(portfolioPath, 'utf-8');
  } catch { /* not available in build */ }
  
  // Build chunks from CV
  const rag = initRAG(sections);
  
  // Merge portfolio projects
  if (portfolioSource) {
    const portfolioProjects = extractProjectsFromPortfolio(portfolioSource);
    const portfolioChunks = projectToChunks(portfolioProjects);
    rag.chunks = [...rag.chunks, ...portfolioChunks];
    rag.projects = portfolioProjects;
  }
  
  ragData = rag;
  return ragData;
}

// ─── Response generation ─────────────────────────────────────────────────
function generateResponse(query, context, retrieved, projects) {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  if (!context || context.length < 20) {
    return 'No tengo información específica sobre eso en el CV de Iker. Puedes contactarle en ikermunozherrero@gmail.com o por LinkedIn para más detalles.';
  }

  if (/contact|email|mail|linkedin|github|telefono|phone|ubicacion|donde|where/i.test(q)) {
    return 'Email: ikermunozherrero@gmail.com\nLinkedIn: linkedin.com/in/iker-muñoz-herrero\nGitHub: github.com/IkerMunozz\nUbicación: La Puebla de Montalbán, Toledo\nTeléfono: +34 663 799 362';
  }

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

  if (/skill|tecnolog|stack|lenguaj|framework|herramient|competenc|sabe|conoc/i.test(q)) {
    return 'Stack tecnológico:\n\n- Lenguajes: Java, JavaScript, Python, HTML, CSS\n- Frameworks: Spring Boot, React, Tailwind CSS\n- IA/ML: TensorFlow, PyTorch, YOLOv8, Keras, Scikit-learn\n- Big Data: Apache Spark, Hadoop, Streamlit\n- Bases de datos: MySQL, PostgreSQL, MongoDB\n- DevOps: Docker, Git, REST APIs';
  }

  if (/proyect|app|web|swappy|yolo|trafico|traffic|portfolio|portfolio|tfc/i.test(q)) {
    if (projects && projects.length > 0) {
      let resp = 'Proyectos destacados:\n\n';
      for (const p of projects) {
        resp += `- ${p.name}`;
        if (p.description) resp += `: ${p.description}`;
        if (p.stack && p.stack.length > 0) resp += ` [${p.stack.join(', ')}]`;
        resp += '\n';
        if (p.github) resp += `  GitHub: ${p.github}\n`;
      }
      return resp.trim();
    }
    
    return 'Proyectos destacados:\n\n- Swappy: Plataforma de compraventa con IA (YOLOv8) para validación de imágenes y geolocalización.\n- Custom Object Detection (YOLOv8): Fine-tuning para detección personalizada.\n- Traffic Flow Analysis: Análisis y predicción de tráfico urbano con Python y ML.';
  }

  if (/formaci|educ|estudio|grado|curs|certif|ies|univers|escuela/i.test(q)) {
    return 'Formación:\n\n- Especialización IA y Big Data (2025–2026) — IES Ribera del Tajo\n- Técnico Superior en Desarrollo Web (2023–2025) — IES Azarquiel, Toledo\n- Bachillerato Tecnológico (2021–2023) — IES Juan de Lucena';
  }

  if (/quien|sobre|perfil|about|presentaci|resume|cv|curriculum/i.test(q)) {
    return 'Iker Muñoz Herrero — Desarrollador Full Stack\n\nFormación en Java, Spring Boot, React, Python, Machine Learning y Big Data. Realizó prácticas en HPE implementando modelos de IA para detección de objetos y sistemas predictivos. Actualmente se especializa en Inteligencia Artificial y Big Data.\n\nUbicación: La Puebla de Montalbán, Toledo\nEmail: ikermunozherrero@gmail.com';
  }

  // Default
  const sections = [...new Set(retrieved.map(r => r.section))];
  const sectionLabel = sections.includes('experience') ? 'experiencia'
    : sections.includes('skills') ? 'competencias técnicas'
    : sections.includes('projects') ? 'proyectos'
    : sections.includes('education') ? 'formación'
    : 'información';

  let content = retrieved.map(r => r.text).join(' ')
    .replace(/^[o•·]\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (content.length > 400) {
    content = content.slice(0, 400);
    const lastPeriod = content.lastIndexOf('.');
    if (lastPeriod > 100) content = content.slice(0, lastPeriod + 1);
  }

  return `Según el CV de Iker Muñoz, sobre ${sectionLabel}:\n\n${content}`;
}

// ─── Serverless handler ──────────────────────────────────────────────────
export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { message } = req.body;
  
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  try {
    const ragData = getRAGData();
    const retrieved = retrieve(message, ragData.chunks);
    const context = buildContext(retrieved);
    const reply = generateResponse(message, context, retrieved, ragData.projects);
    
    return res.status(200).json({ reply, chunks: retrieved.map(r => ({ text: r.text, score: r.score, section: r.section })) });
  } catch (err) {
    console.error('RAG error:', err.message);
    return res.status(500).json({ error: 'Failed to process request', reply: 'Ha ocurrido un error. Inténtalo de nuevo.' });
  }
}
