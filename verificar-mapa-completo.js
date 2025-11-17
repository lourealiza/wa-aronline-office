import fs from 'fs';

console.log('🔍 VERIFICAÇÃO COMPLETA DO MAPA\n');

const mapFile = 'wa_map-ar-online-professional.tmj';
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

console.log('📋 INFORMAÇÕES DO MAPA:');
console.log(`   Dimensões: ${map.width}x${map.height} tiles`);
console.log(`   Tile size: ${map.tilewidth}x${map.tileheight} pixels`);
console.log(`   Total de camadas: ${map.layers.length}`);

// Verificar spawn
const startLayer = map.layers.find(l => l.name === 'start');
if (startLayer && startLayer.objects) {
  const spawn = startLayer.objects.find(o => o.type === 'spawn');
  if (spawn) {
    const tileX = Math.floor(spawn.x / map.tilewidth);
    const tileY = Math.floor(spawn.y / map.tileheight);
    const floorLayer = map.layers.find(l => l.name === 'floor');
    const tileIndex = tileY * map.width + tileX;
    const tileValue = floorLayer.data[tileIndex];
    
    console.log('\n✅ PONTO DE SPAWN:');
    console.log(`   Posição (pixels): ${spawn.x}, ${spawn.y}`);
    console.log(`   Posição (tiles): ${tileX}, ${tileY}`);
    console.log(`   Dentro dos limites: ${tileX >= 0 && tileX < map.width && tileY >= 0 && tileY < map.height}`);
    console.log(`   Tile na posição: ${tileValue}`);
    console.log(`   Tile válido: ${tileValue !== 0}`);
  } else {
    console.log('\n❌ ERRO: Nenhum objeto spawn encontrado na camada start!');
  }
} else {
  console.log('\n❌ ERRO: Camada "start" não encontrada ou sem objetos!');
}

// Verificar tilesets
console.log('\n🖼️  TILESETS:');
map.tilesets.forEach((tileset, index) => {
  console.log(`   ${index + 1}. ${tileset.name}`);
  console.log(`      Imagem: ${tileset.image}`);
  console.log(`      Tamanho: ${tileset.imagewidth}x${tileset.imageheight}`);
  
  // Verificar se arquivo existe
  const imagePath = tileset.image.replace(/^https?:\/\/[^\/]+/, ''); // Remove URL absoluta se houver
  const localPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  if (fs.existsSync(localPath)) {
    const stats = fs.statSync(localPath);
    console.log(`      ✅ Arquivo existe: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`      ❌ Arquivo NÃO encontrado: ${localPath}`);
  }
  
  // Verificar se URL é absoluta ou relativa
  if (tileset.image.startsWith('http://') || tileset.image.startsWith('https://')) {
    console.log(`      ⚠️  URL absoluta (será usado no deploy)`);
  } else {
    console.log(`      ✅ URL relativa (será convertida no build)`);
  }
});

// Verificar camadas
console.log('\n📑 CAMADAS:');
map.layers.forEach(layer => {
  if (layer.type === 'tilelayer') {
    const nonZeroTiles = layer.data.filter(t => t !== 0).length;
    const totalTiles = layer.data.length;
    console.log(`   ${layer.name}: ${nonZeroTiles}/${totalTiles} tiles não-zero`);
  } else if (layer.type === 'objectgroup') {
    const objectCount = layer.objects ? layer.objects.length : 0;
    console.log(`   ${layer.name}: ${objectCount} objetos`);
  }
});

// Verificar propriedades do mapa
console.log('\n⚙️  PROPRIEDADES DO MAPA:');
const requiredProps = ['mapName', 'mapImage', 'mapDescription', 'mapCopyright', 'script'];
requiredProps.forEach(prop => {
  const found = map.properties.find(p => p.name === prop);
  if (found) {
    console.log(`   ✅ ${prop}: ${found.value.substring(0, 50)}...`);
  } else {
    console.log(`   ❌ ${prop}: FALTANDO!`);
  }
});

console.log('\n✅ Verificação concluída!\n');

