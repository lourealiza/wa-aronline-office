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
  'wa_map-complexo-v2.tmj',
  'office.tmj',
  'conference.tmj',
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

// Copiar pasta public (inclui tilesets dentro de public/)
console.log('📁 Copiando pasta public/...');
if (fs.existsSync('public')) {
  copyDirectory('public', 'dist/public');
}

// Copiar pasta tilesets da raiz também (para garantir)
console.log('📁 Copiando pasta tilesets/ da raiz...');
if (fs.existsSync('tilesets')) {
  copyDirectory('tilesets', 'dist/tilesets');
}

// IMPORTANTE: Copiar tilesets também na raiz do dist para caminhos relativos funcionarem
console.log('📁 Copiando tilesets para raiz do dist/...');
if (fs.existsSync('public/tilesets')) {
  copyDirectory('public/tilesets', 'dist/tilesets');
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

// Converter URLs relativas para absolutas nos arquivos .tmj do dist/
console.log('🔄 Convertendo caminhos relativos para URLs absolutas no dist/...');
const baseUrl = 'https://lourealiza.github.io/wa-aronline-office/';

essentialFiles.forEach(file => {
  if (file.endsWith('.tmj')) {
    const distPath = path.join(__dirname, 'dist', file);
    if (fs.existsSync(distPath)) {
      try {
        const content = fs.readFileSync(distPath, 'utf8');
        const mapData = JSON.parse(content);
        let updated = false;
        
        if (mapData.tilesets && Array.isArray(mapData.tilesets)) {
          mapData.tilesets.forEach(tileset => {
            if (tileset.image && !tileset.image.startsWith('http://') && !tileset.image.startsWith('https://')) {
              tileset.image = baseUrl + tileset.image;
              updated = true;
            }
          });
        }
        
        if (updated) {
          fs.writeFileSync(distPath, JSON.stringify(mapData, null, 2));
          console.log(`✅ URLs convertidas em: ${file}`);
        }
      } catch (error) {
        console.log(`⚠️  Erro ao processar ${file}: ${error.message}`);
      }
    }
  }
});

console.log('✅ Build para GitHub Pages concluído!');
