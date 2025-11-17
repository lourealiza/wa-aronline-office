import fs from 'fs';

console.log('🔍 VERIFICAÇÃO DE TILES DO MAPA\n');

const mapFile = 'wa_map-ar-online-professional.tmj';
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

// Analisar tilesets
console.log('📦 TILESETS:');
map.tilesets.forEach((tileset, index) => {
  console.log(`\n${index + 1}. ${tileset.name}`);
  console.log(`   firstgid: ${tileset.firstgid}`);
  console.log(`   tilecount: ${tileset.tilecount}`);
  console.log(`   Range válido: ${tileset.firstgid} a ${tileset.firstgid + tileset.tilecount - 1}`);
  console.log(`   Imagem: ${tileset.image}`);
});

// Analisar camadas
console.log('\n\n📑 CAMADAS:');
map.layers.forEach(layer => {
  if (layer.type === 'tilelayer') {
    const nonZeroTiles = layer.data.filter(t => t !== 0);
    const uniqueTiles = [...new Set(nonZeroTiles)].sort((a, b) => a - b);
    
    console.log(`\n${layer.name}:`);
    console.log(`   Total de tiles: ${layer.data.length}`);
    console.log(`   Tiles não-zero: ${nonZeroTiles.length}`);
    console.log(`   Tiles únicos: ${uniqueTiles.length}`);
    console.log(`   Valores únicos: ${uniqueTiles.slice(0, 20).join(', ')}${uniqueTiles.length > 20 ? '...' : ''}`);
    
    // Verificar se os tiles estão dentro dos ranges válidos
    const invalidTiles = uniqueTiles.filter(tile => {
      return !map.tilesets.some(ts => 
        tile >= ts.firstgid && tile < ts.firstgid + ts.tilecount
      );
    });
    
    if (invalidTiles.length > 0) {
      console.log(`   ⚠️  TILES INVÁLIDOS: ${invalidTiles.join(', ')}`);
    } else {
      console.log(`   ✅ Todos os tiles estão dentro dos ranges válidos`);
    }
    
    // Verificar quais tilesets estão sendo usados
    const usedTilesets = new Set();
    uniqueTiles.forEach(tile => {
      map.tilesets.forEach(ts => {
        if (tile >= ts.firstgid && tile < ts.firstgid + ts.tilecount) {
          usedTilesets.add(ts.name);
        }
      });
    });
    
    console.log(`   Tilesets usados: ${Array.from(usedTilesets).join(', ') || 'Nenhum'}`);
  } else if (layer.type === 'objectgroup') {
    console.log(`\n${layer.name}:`);
    console.log(`   Tipo: objectgroup`);
    console.log(`   Objetos: ${layer.objects ? layer.objects.length : 0}`);
  }
});

// Verificar se há tiles personalizados (valores altos podem indicar tiles customizados)
console.log('\n\n🎨 ANÁLISE DE PERSONALIZAÇÃO:');
const floorLayer = map.layers.find(l => l.name === 'floor');
if (floorLayer) {
  const uniqueTiles = [...new Set(floorLayer.data.filter(t => t !== 0))].sort((a, b) => a - b);
  
  // Tiles baixos (1-100) geralmente são tiles padrão/genéricos
  const genericTiles = uniqueTiles.filter(t => t >= 1 && t <= 100);
  // Tiles médios (101-500) podem ser tiles customizados
  const customTiles = uniqueTiles.filter(t => t > 100 && t <= 500);
  // Tiles altos (500+) geralmente são tiles customizados avançados
  const advancedTiles = uniqueTiles.filter(t => t > 500);
  
  console.log(`Tiles genéricos (1-100): ${genericTiles.length} valores`);
  console.log(`Tiles customizados (101-500): ${customTiles.length} valores`);
  console.log(`Tiles avançados (500+): ${advancedTiles.length} valores`);
  
  if (genericTiles.length > 0 && customTiles.length === 0 && advancedTiles.length === 0) {
    console.log('\n⚠️  ATENÇÃO: O mapa parece estar usando apenas tiles genéricos!');
    console.log('   Isso pode explicar por que não aparecem personalizações.');
    console.log('   Verifique se você editou o mapa no Tiled e salvou as alterações.');
  }
  
  if (customTiles.length > 0 || advancedTiles.length > 0) {
    console.log('\n✅ O mapa contém tiles customizados!');
    console.log(`   Valores customizados: ${[...customTiles, ...advancedTiles].slice(0, 10).join(', ')}${customTiles.length + advancedTiles.length > 10 ? '...' : ''}`);
  }
}

console.log('\n✅ Verificação concluída!\n');

