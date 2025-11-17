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

// Copiar arquivos essenciais (mapas serão processados depois)
console.log('📁 Copiando arquivos essenciais...');
essentialFiles.forEach(file => {
  // Pular arquivos .tmj aqui - eles serão processados depois com conversão de URLs
  if (file.endsWith('.tmj')) {
    return;
  }
  
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

// Copiar pasta tilesets da raiz (PRIORITÁRIO - caminho usado pelos mapas)
console.log('📁 Copiando pasta tilesets/ da raiz...');
if (fs.existsSync('tilesets')) {
  copyDirectory('tilesets', 'dist/tilesets');
  console.log('✅ Tilesets copiados da raiz para dist/tilesets/');
} else {
  console.log('⚠️  Pasta tilesets/ não encontrada na raiz!');
}

// Copiar tilesets de public/tilesets/ também (se existir - backup)
if (fs.existsSync('public/tilesets')) {
  console.log('📁 Copiando tilesets de public/tilesets/ (backup)...');
  copyDirectory('public/tilesets', 'dist/tilesets');
  console.log('✅ Tilesets copiados de public/tilesets/ para dist/tilesets/');
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

// Processar arquivos .tmj: copiar e garantir URLs relativas (WorkAdventure resolve automaticamente)
console.log('🔄 Processando arquivos .tmj (manter URLs relativas)...');
const baseUrl = 'https://lourealiza.github.io/wa-aronline-office/';

essentialFiles.forEach(file => {
  if (file.endsWith('.tmj')) {
    const sourcePath = path.join(__dirname, file);
    const distPath = path.join(__dirname, 'dist', file);
    
    if (fs.existsSync(sourcePath)) {
      try {
        // Ler arquivo fonte
        const content = fs.readFileSync(sourcePath, 'utf8');
        const mapData = JSON.parse(content);
        let updated = false;
        
        if (mapData.tilesets && Array.isArray(mapData.tilesets)) {
          mapData.tilesets.forEach(tileset => {
            if (tileset.image) {
              // Se já é URL absoluta, converter para relativa
              if (tileset.image.startsWith('http://') || tileset.image.startsWith('https://')) {
                // Verificar se há duplicação da baseUrl
                const doubleBaseUrl = baseUrl + baseUrl;
                if (tileset.image.startsWith(doubleBaseUrl)) {
                  // Remover duplicação e converter para relativa
                  tileset.image = tileset.image.replace(doubleBaseUrl, '');
                  updated = true;
                  console.log(`   🔧 Corrigida URL duplicada e convertida para relativa em ${tileset.name}`);
                } else if (tileset.image.startsWith(baseUrl)) {
                  // Converter URL absoluta para relativa (WorkAdventure resolve automaticamente)
                  tileset.image = tileset.image.replace(baseUrl, '');
                  updated = true;
                  console.log(`   🔄 Convertida URL absoluta para relativa em ${tileset.name}: ${tileset.image}`);
                } else {
                  // URL absoluta de outro domínio - manter como está (não é nosso domínio)
                  console.log(`   ℹ️  Mantida URL absoluta externa em ${tileset.name}`);
                }
              } else {
                // URL já é relativa - manter como está
                console.log(`   ✅ URL já é relativa em ${tileset.name}: ${tileset.image}`);
              }
            }
          });
        }
        
        // Criar diretório de destino se não existir
        const destDir = path.dirname(distPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Salvar arquivo processado
        fs.writeFileSync(distPath, JSON.stringify(mapData, null, 2));
        if (updated) {
          console.log(`✅ Processado e URLs corrigidas: ${file}`);
        } else {
          console.log(`✅ Copiado (sem alterações necessárias): ${file}`);
        }
      } catch (error) {
        console.log(`❌ Erro ao processar ${file}: ${error.message}`);
      }
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${file}`);
    }
  }
});

console.log('✅ Build para GitHub Pages concluído!');
