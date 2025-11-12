import fs from 'fs';
import path from 'path';

console.log('🔧 CORREÇÃO COMPLETA DE TILESETS\n');
console.log('Este script corrige todos os caminhos de tilesets para o padrão tilesets/\n');

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

// Todos os tilesets que devem estar em tilesets/
const tilesetMappings = {
  // Mapear caminhos relativos para caminhos corretos
  'WA_Room_Builder.png': 'tilesets/WA_Room_Builder.png',
  'tileset_colors_walls.png': 'tilesets/tileset_colors_walls.png',
  'tilesets/WA_Room_Builder.png': 'tilesets/WA_Room_Builder.png',
  'tilesets/tileset_colors_walls.png': 'tilesets/tileset_colors_walls.png',
  'tilesets/WA_Special_Zones.png': 'tilesets/WA_Special_Zones.png',
  'tilesets/WA_Decoration.png': 'tilesets/WA_Decoration.png',
  'tilesets/WA_Miscellaneous.png': 'tilesets/WA_Miscellaneous.png',
  'tilesets/WA_Other_Furniture.png': 'tilesets/WA_Other_Furniture.png',
  'tilesets/WA_Seats.png': 'tilesets/WA_Seats.png',
  'tilesets/WA_Tables.png': 'tilesets/WA_Tables.png',
  'tilesets/WA_Logo_Long.png': 'tilesets/WA_Logo_Long.png',
  'tilesets/WA_Exterior.png': 'tilesets/WA_Exterior.png',
  'tilesets/WA_User_Interface.png': 'tilesets/WA_User_Interface.png'
};

console.log('📋 Mapas a processar:', allMaps.length);
console.log('🖼️  Tilesets mapeados:', Object.keys(tilesetMappings).length);
console.log('');

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
        
        // Verificar se precisa atualizar
        if (tilesetMappings[oldPath]) {
          const newPath = tilesetMappings[oldPath];
          
          if (oldPath !== newPath) {
            console.log(`   🔄 Tileset ${index + 1}: ${tileset.name}`);
            console.log(`      De: ${oldPath}`);
            console.log(`      Para: ${newPath}`);
            
            tileset.image = newPath;
            fileUpdated = true;
            totalUpdates++;
          }
        }
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
console.log(`   Atualizações realizadas: ${totalUpdates}`);
console.log(`   Erros encontrados: ${errorCount}`);

if (errorCount === 0) {
  console.log('   ✅ Todos os mapas foram processados com sucesso!');
} else {
  console.log('   ⚠️  Alguns arquivos tiveram erros');
}

console.log('═══════════════════════════════════════');
console.log('\n💡 PRÓXIMOS PASSOS:');
console.log('1. Verifique se os arquivos na raiz estão duplicados em tilesets/');
console.log('2. Se sim, delete da raiz: WA_Room_Builder.png e tileset_colors_walls.png');
console.log('3. Teste localmente: npm run dev');
console.log('4. Se tudo estiver OK, faça commit das mudanças\n');

