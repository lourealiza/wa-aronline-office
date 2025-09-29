import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Arquivos essenciais para GitHub Pages
const essentialFiles = [
  'index.html',
  'editor.html',
  'admin-auth.html',
  'wa_map-complexo.tmj',
  'wa_map-ar-online-professional.tmj', 
  'wa_map-interativo.tmj',
  'wa_map-working.tmj',
  'WA_Room_Builder.png',
  'tileset_colors_walls.png',
  'office.png',
  'conference.png'
];

// Copiar arquivos essenciais
console.log('📁 Copiando arquivos essenciais...');
essentialFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  const destPath = path.join(__dirname, 'dist', file);
  
  if (fs.existsSync(sourcePath)) {
    // Criar diretório de destino se não existir
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copiado: ${file}`);
  } else {
    console.log(`⚠️  Arquivo não encontrado: ${file}`);
  }
});

// Copiar pasta public
console.log('📁 Copiando pasta public/...');
if (fs.existsSync('public')) {
  copyDirectory('public', 'dist/public');
}

// Copiar pasta tilesets
console.log('📁 Copiando pasta tilesets/...');
if (fs.existsSync('tilesets')) {
  copyDirectory('tilesets', 'dist/tilesets');
}

// Copiar pasta images
console.log('📁 Copiando pasta images/...');
if (fs.existsSync('public/images')) {
  copyDirectory('public/images', 'dist/images');
}

function copyDirectory(source, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

console.log('✅ Build para GitHub Pages concluído!');
