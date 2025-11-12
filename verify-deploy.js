import fs from 'fs';
import path from 'path';

console.log('🔍 VERIFICAÇÃO DE DEPLOY\n');
console.log('Verificando se todos os arquivos necessários estão em dist/\n');

const requiredFiles = {
  'Mapas': [
    'wa_map-ar-online-professional.tmj',
    'wa_map-interativo.tmj',
    'wa_map-complexo.tmj',
    'wa_map-working.tmj',
    'wa_map-complexo-v2.tmj',
    'office.tmj',
    'conference.tmj'
  ],
  'Tilesets Principais': [
    'tilesets/WA_Room_Builder.png',
    'tilesets/tileset_colors_walls.png'
  ],
  'Arquivos HTML': [
    'index.html',
    'editor.html',
    'admin-auth.html'
  ]
};

let allOk = true;
let totalFiles = 0;
let foundFiles = 0;

Object.entries(requiredFiles).forEach(([category, files]) => {
  console.log(`📁 ${category}:`);
  
  files.forEach(file => {
    totalFiles++;
    const filePath = path.join('dist', file);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ✅ ${file} (${sizeKB} KB)`);
      foundFiles++;
    } else {
      console.log(`   ❌ ${file} - NÃO ENCONTRADO`);
      allOk = false;
    }
  });
  
  console.log('');
});

// Verificar tilesets adicionais
console.log('📁 Tilesets Adicionais:');
const tilesetsDir = path.join('dist', 'tilesets');
if (fs.existsSync(tilesetsDir)) {
  const tilesetFiles = fs.readdirSync(tilesetsDir).filter(f => f.endsWith('.png'));
  console.log(`   ✅ ${tilesetFiles.length} arquivos PNG encontrados`);
  foundFiles += tilesetFiles.length;
  totalFiles += tilesetFiles.length;
  
  // Listar alguns
  tilesetFiles.slice(0, 5).forEach(file => {
    const filePath = path.join(tilesetsDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`      - ${file} (${sizeKB} KB)`);
  });
  
  if (tilesetFiles.length > 5) {
    console.log(`      ... e mais ${tilesetFiles.length - 5} arquivos`);
  }
} else {
  console.log('   ❌ Pasta tilesets/ não encontrada');
  allOk = false;
}

console.log('\n═══════════════════════════════════════');
console.log('📊 RESUMO:');
console.log(`   Arquivos verificados: ${totalFiles}`);
console.log(`   Arquivos encontrados: ${foundFiles}`);
console.log(`   Arquivos faltando: ${totalFiles - foundFiles}`);

if (allOk && foundFiles === totalFiles) {
  console.log('\n   ✅ TUDO OK! Pronto para deploy.');
  console.log('\n💡 URLs que devem funcionar após deploy:');
  console.log('   https://lourealiza.github.io/wa-aronline-office/wa_map-interativo.tmj');
  console.log('   https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png');
  console.log('   https://lourealiza.github.io/wa-aronline-office/tilesets/tileset_colors_walls.png');
} else {
  console.log('\n   ⚠️  ALGUNS ARQUIVOS ESTÃO FALTANDO!');
  console.log('   Execute: npm run build');
  process.exit(1);
}

console.log('═══════════════════════════════════════\n');

