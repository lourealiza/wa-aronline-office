import fs from 'fs';

console.log('🔍 Verificando integridade dos mapas...\n');

const mapFiles = [
  'wa_map-ar-online-professional.tmj',
  'wa_map-interativo.tmj',
  'wa_map-complexo.tmj',
  'wa_map-working.tmj',
  'wa_map-complexo-v2.tmj'
];

const tilesets = [
  'tilesets/WA_Room_Builder.png',
  'tilesets/tileset_colors_walls.png'
];

// Verificar se os tilesets existem
console.log('📁 Verificando tilesets:');
tilesets.forEach(tileset => {
  if (fs.existsSync(tileset)) {
    const stats = fs.statSync(tileset);
    console.log(`✅ ${tileset} - ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`❌ ${tileset} - NÃO ENCONTRADO`);
  }
});

console.log('\n🗺️ Verificando mapas:');
mapFiles.forEach(mapFile => {
  if (fs.existsSync(mapFile)) {
    try {
      const mapData = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
      const stats = fs.statSync(mapFile);
      
      console.log(`\n📋 ${mapFile}:`);
      console.log(`   Tamanho: ${(stats.size / 1024).toFixed(1)} KB`);
      console.log(`   Dimensões: ${mapData.width}x${mapData.height}`);
      console.log(`   Tilesets: ${mapData.tilesets.length}`);
      
      // Verificar tilesets referenciados
      mapData.tilesets.forEach((tileset, index) => {
        console.log(`   Tileset ${index + 1}: ${tileset.name}`);
        console.log(`   Imagem: ${tileset.image}`);
        
        if (fs.existsSync(tileset.image)) {
          console.log(`   ✅ Arquivo existe`);
        } else {
          console.log(`   ❌ Arquivo NÃO ENCONTRADO: ${tileset.image}`);
        }
      });
      
      // Verificar camadas
      console.log(`   Camadas: ${mapData.layers.length}`);
      mapData.layers.forEach((layer, index) => {
        if (layer.type === 'tilelayer') {
          const nonZeroTiles = layer.data.filter(tile => tile > 0).length;
          const totalTiles = layer.data.length;
          console.log(`   Camada ${index + 1} (${layer.name}): ${nonZeroTiles}/${totalTiles} tiles não-zero`);
        }
      });
      
    } catch (error) {
      console.log(`❌ ${mapFile} - ERRO: ${error.message}`);
    }
  } else {
    console.log(`❌ ${mapFile} - NÃO ENCONTRADO`);
  }
});

console.log('\n🎯 Resumo:');
console.log('- Todos os arquivos devem estar presentes');
console.log('- Tilesets devem ter tamanho > 0');
console.log('- Camadas de chão devem ter tiles não-zero');
console.log('- Use o Tiled para visualizar e corrigir problemas');
