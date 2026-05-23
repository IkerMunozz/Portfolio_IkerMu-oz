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

  // Find the projects section
  const projectsStart = source.indexOf('id="projects"');
  if (projectsStart === -1) return [];
  
  const projectsEnd = source.indexOf('id="skills"', projectsStart);
  if (projectsEnd === -1) return [];
  
  const projectsSection = source.slice(projectsStart, projectsEnd);

  const projects = [];
  
  // Find each project card - they have grid md:grid-cols-2 structure with an h3 title
  // Split by the card pattern
  const cardRegex = /<div className="bg-slate-800\/50.*?grid md:grid-cols-2 gap-0">/gs;
  const cards = projectsSection.split(cardRegex);
  
  for (let i = 1; i < cards.length; i++) { // skip first (before first card)
    const card = cards[i];
    
    // Find closing </div> for the card - find the matching structure
    // Project name is in <h3 className="text-3xl font-bold">Name</h3>
    const nameMatch = card.match(/<h3\s+className="text-3xl font-bold">\s*([^<]+?)\s*<\/h3>/);
    if (!nameMatch) continue;
    
    const name = nameMatch[1].trim();
    if (name.length > 60 || name.length < 2) continue;

    // Description - find the first <p> after the name that has meaningful text
    const nameIndex = card.indexOf(nameMatch[0]);
    const afterName = card.slice(nameIndex + nameMatch[0].length);
    
    // Description paragraph
    const descMatch = afterName.match(/<p\s+className="text-slate-300[^"]*">\s*(.+?)\s*<\/p>/s);
    let description = '';
    if (descMatch) {
      description = descMatch[1]
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Tech stack - find the array after "Stack Tecnológico"
    const stackHeading = afterName.indexOf('Stack Tecnol');
    if (stackHeading === -1) continue;
    
    const afterStack = afterName.slice(stackHeading);
    const techRegex = />\s*([^<>]+?)\s*<\/span>\s*\)\.map/g;
    const techs = [];
    let techMatch;
    while ((techMatch = techRegex.exec(afterStack)) !== null) {
      // The actual tech name is before the .map
      // Look for the pattern 'Java', 'Spring Boot', etc inside the array
    }
    
    // Better approach: find the array literal
    const arrayMatch = afterStack.match(/\[([\s\S]*?)\]\.map/);
    if (arrayMatch) {
      const items = arrayMatch[1]
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(s => s.length > 1 && s.length < 30);
      techs.push(...items);
    }

    // Features
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

    // GitHub link
    const githubMatch = card.match(/href="(https:\/\/github\.com\/[^"]+)"/);
    const github = githubMatch ? githubMatch[1] : null;

    projects.push({
      name,
      description,
      stack: [...new Set(techs)],
      features,
      github
    });
  }

  console.log(`✅ Extracted ${projects.length} projects from Portfolio.jsx`);
  for (const p of projects) {
    console.log(`   • ${p.name}`);
  }

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
