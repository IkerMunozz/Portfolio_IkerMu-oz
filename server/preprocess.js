// Reads the PDF, extracts clean text, and saves it as structured sections
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CV_PATH = path.join(__dirname, '..', 'public', 'CV_Iker_Munoz.pdf');
const OUTPUT_PATH = path.join(__dirname, 'cv-text.json');

async function extractCVText() {
  console.log('📄 Reading CV PDF...');
  const dataBuffer = fs.readFileSync(CV_PATH);
  const data = await pdf(dataBuffer);
  
  let text = data.text;
  
  // Clean up text
  text = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  console.log('📝 Extracted text length:', text.length);
  console.log('📝 Preview:\n', text.slice(0, 500));
  
  // Organize into sections by keywords
  const sections = organizeSections(text);
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sections, null, 2));
  console.log(`✅ Saved to ${OUTPUT_PATH}`);
  console.log('📂 Sections found:', Object.keys(sections));
  
  return sections;
}

function organizeSections(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  const sections = {
    summary: '',
    experience: '',
    projects: '',
    education: '',
    skills: '',
    other: ''
  };
  
  let currentSection = 'summary';
  const sectionKeywords = {
    experience: /exp(er(i|ie)ncia|erienc)/i,
    projects: /proyectos?|pro(j|y)/i,
    education: /formaci|educaci|estudio|grado|especializaci|acad/i,
    skills: /habilidades?|skills?|competencias?|tecnolog/i,
  };
  
  for (const line of lines) {
    // Check if this line is a section header
    let matched = false;
    for (const [section, regex] of Object.entries(sectionKeywords)) {
      if (regex.test(line) && line.length < 60) {
        currentSection = section;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      // Also check for name/contact info at the very beginning
      if (sections.summary.length === 0 && sections.experience.length === 0 && 
          sections.projects.length === 0 && sections.education.length === 0 &&
          sections.skills.length === 0) {
        // Likely name/contact - keep in summary
        sections.summary += line + ' ';
      } else {
        sections[currentSection] += line + ' ';
      }
    }
  }
  
  // Clean each section
  for (const key of Object.keys(sections)) {
    sections[key] = sections[key]
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  // If any section is empty, merge it into summary
  const nonEmpty = Object.entries(sections).filter(([, v]) => v.length > 0);
  console.log('   Non-empty sections:', nonEmpty.map(([k]) => k).join(', '));
  
  return sections;
}

extractCVText().catch(console.error);
