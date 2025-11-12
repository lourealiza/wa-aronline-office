import fs from 'fs';
import path from 'path';

const baseUrl = 'https://lourealiza.github.io/wa-aronline-office/';

console.log('↩️  REVERTENDO URLs ABSOLUTAS PARA CAMINHOS RELATIVOS\n');

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

console.log('📋 Convertendo URLs absolutas de volta para caminhos relativos...\n');

let totalReverts = 0;
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
        
        // Se for URL absoluta com nosso baseUrl, reverter
        if (oldPath.startsWith(baseUrl)) {
          const relativePath = oldPath.replace(baseUrl, '');
          
          console.log(`   🔄 Tileset ${index + 1}: ${tileset.name}`);
          console.log(`      De: ${oldPath}`);
          console.log(`      Para: ${relativePath}`);
          
          tileset.image = relativePath;
          fileUpdated = true;
          totalReverts++;
        }
      });
    }
    
    // Salvar arquivo se foi modificado
    if (fileUpdated) {
      fs.writeFileSync(mapFile, JSON.stringify(mapData, null, 2));
      console.log(`   ✅ Revertido e salvo\n`);
    } else {
      console.log(`   ℹ️  Nenhuma reversão necessária\n`);
    }
    
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}\n`);
    errorCount++;
  }
});

console.log('═══════════════════════════════════════');
console.log('🎉 RESUMO:');
console.log(`   URLs revertidas: ${totalReverts}`);
console.log(`   Erros encontrados: ${errorCount}`);

if (errorCount === 0) {
  console.log('   ✅ Todos os mapas foram revertidos com sucesso!');
} else {
  console.log('   ⚠️  Alguns arquivos tiveram erros');
}

console.log('═══════════════════════════════════════');
console.log('\n✅ Agora você pode continuar desenvolvendo localmente\n');

