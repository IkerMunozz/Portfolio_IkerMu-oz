// Parses Portfolio.jsx to extract project data (name, description, stack, features)
import fs from 'fs';
import path from 'path';

const PORTFOLIO_PATH = path.join('..', 'src', 'components', 'Portfolio.jsx');

export function extractProjectsFromPortfolio() {
  let source;
  try {
    source = fs.readFileSync(PORTFOLIO_PATH, 'utf-8');
  } catch {
    console.log('⚠️  Portfolio.jsx not found, skipping');
    return [];
  }

  const projectsMatch = source.match(/const allProjects = \[(.*?)\];/s);
  if (!projectsMatch) return [];
  
  const projectsText = projectsMatch[1];
  const projectBlocks = projectsText.split(/id:\s*'[^']+',/g).slice(1);
  const ids = Array.from(projectsText.matchAll(/id:\s*'([^']+)',/g)).map(m => m[1]);
  
  const projects = [];
  for (let i = 0; i < projectBlocks.length; i++) {
    const block = projectBlocks[i];
    
    const titleMatch = block.match(/title:\s*'([^']+)',/);
    const shortDescMatch = block.match(/shortDescription:\s*'([^']+)',/);
    const githubMatch = block.match(/githubUrl:\s*'([^']+)',/);
    
    const stackMatch = block.match(/stack:\s*\[(.*?)\]/s);
    const stack = stackMatch ? stackMatch[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')) : [];
    
    const featuresMatch = block.match(/features:\s*\[(.*?)\]/s);
    const features = [];
    if (featuresMatch) {
      const featureTexts = Array.from(featuresMatch[1].matchAll(/text:\s*'([^']+)'/g)).map(m => m[1]);
      features.push(...featureTexts);
    }

    if (titleMatch) {
      projects.push({
        name: titleMatch[1],
        description: shortDescMatch ? shortDescMatch[1] : '',
        stack: [...new Set(stack)],
        features,
        github: githubMatch ? githubMatch[1] : null
      });
    }
  }

  console.log(`✅ Extracted ${projects.length} projects from Portfolio.jsx`);
  return projects;
}

// Convert projects to text chunks for RAG
export function projectToChunks(projects) {
  const chunks = [];

  for (const project of projects) {
    let text = `Proyecto: ${project.name}. `;
    if (project.description) {
      text += `${project.description} `;
    }
    if (project.stack && project.stack.length > 0) {
      text += `Tecnologías: ${project.stack.join(', ')}. `;
    }
    if (project.features && project.features.length > 0) {
      text += `Características: ${project.features.join('. ')}.`;
    }
    if (project.github) {
      text += ` Código: ${project.github}.`;
    }

    chunks.push({
      section: 'projects',
      text: text.replace(/\s+/g, ' ').trim(),
      label: `[PROJECTS] ${project.name}`
    });

    // Stack-specific chunk
    if (project.stack.length > 0) {
      chunks.push({
        section: 'projects',
        text: `${project.name} utiliza las tecnologías: ${project.stack.join(', ')}.`,
        label: `[PROJECTS STACK] ${project.name}`
      });
    }
  }

  return chunks;
}
