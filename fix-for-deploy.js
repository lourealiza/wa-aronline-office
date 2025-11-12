import fs from 'fs';
import path from 'path';

const baseUrl = 'https://lourealiza.github.io/wa-aronline-office/';

console.log('🚀 PREPARANDO MAPAS PARA DEPLOY\n');
console.log(`Base URL: ${baseUrl}\n`);

// Todos os mapas do projeto
const allMaps = [
  'wa_map-ar-online-professional.tmj',
  'wa_map-interativo.tmj', 
  'wa_map-complexo.tmj',
  'wa_map-working.tmj',
  'wa_map-complexo-v2.tmj',
  'office.tmj',
  'conference.tmj'
];

console.log('📋 Convertendo caminhos relativos para URLs absolutas...\n');

let totalUpdates = 0;
let errorCount = 0;

allMaps.forEach(mapFile => {
  if (!fs.existsSync(mapFile)) {
    console.log(`⚠️  ${mapFile} - Arquivo não encontrado, pulando...`);
    return;
  }

  try {
    console.log(`📝 Processando: ${mapFile}`);
    
    const content = fs.readFileSync(mapFile, 'utf8');
    const mapData = JSON.parse(content);
    
    let fileUpdated = false;
    
    // Processar cada tileset no mapa
    if (mapData.tilesets && Array.isArray(mapData.tilesets)) {
      mapData.tilesets.forEach((tileset, index) => {
        const oldPath = tileset.image;
        
        // Se já for URL absoluta, pular
        if (oldPath.startsWith('http://') || oldPath.startsWith('https://')) {
          console.log(`   ℹ️  Tileset ${index + 1}: ${tileset.name} - Já é URL absoluta`);
          return;
        }
        
        // Converter para URL absoluta
        const newPath = baseUrl + oldPath;
        
        console.log(`   🔄 Tileset ${index + 1}: ${tileset.name}`);
        console.log(`      De: ${oldPath}`);
        console.log(`      Para: ${newPath}`);
        
        tileset.image = newPath;
        fileUpdated = true;
        totalUpdates++;
      });
    }
    
    // Salvar arquivo se foi modificado
    if (fileUpdated) {
      fs.writeFileSync(mapFile, JSON.stringify(mapData, null, 2));
      console.log(`   ✅ Atualizado e salvo\n`);
    } else {
      console.log(`   ℹ️  Nenhuma alteração necessária\n`);
    }
    
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}\n`);
    errorCount++;
  }
});

console.log('═══════════════════════════════════════');
console.log('🎉 RESUMO:');
console.log(`   URLs convertidas: ${totalUpdates}`);
console.log(`   Erros encontrados: ${errorCount}`);

if (errorCount === 0) {
  console.log('   ✅ Todos os mapas foram preparados para deploy!');
} else {
  console.log('   ⚠️  Alguns arquivos tiveram erros');
}

console.log('═══════════════════════════════════════');
console.log('\n💡 PRÓXIMOS PASSOS:');
console.log('1. Faça o build: npm run build');
console.log('2. Faça o deploy para GitHub Pages');
console.log('3. Teste a URL: ' + baseUrl);
console.log('4. Depois do deploy, reverta URLs para caminhos relativos\n');

