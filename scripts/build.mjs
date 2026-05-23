import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  console.log('🚀 Starting custom build process...');

  // 1. Install server dependencies
  console.log('📦 Installing server dependencies...');
  execSync('npm install --prefix server', { stdio: 'inherit' });

  // 2. Run preprocessing
  console.log('⚙️ Running preprocess script...');
  execSync('node server/preprocess.js', { stdio: 'inherit' });

  // 3. Copy generated file to api directory
  console.log('📂 Copying cv-text.json to api folder...');
  const source = path.join(process.cwd(), 'server', 'cv-text.json');
  const dest = path.join(process.cwd(), 'api', 'cv-text.json');
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log('✅ File copied successfully.');
  } else {
    console.error('❌ Error: server/cv-text.json not found!');
    process.exit(1);
  }

  // 4. Build the React application
  console.log('🏗️ Building React app...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('🎉 Build completed successfully!');
} catch (error) {
  console.error('💥 Build failed:', error.message);
  process.exit(1);
}
