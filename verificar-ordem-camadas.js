import fs from 'fs';

console.log('🔍 VERIFICAÇÃO DA ORDEM DAS CAMADAS\n');

const mapFile = 'wa_map-ar-online-professional.tmj';
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

console.log('📑 ORDEM DAS CAMADAS (de cima para baixo):\n');
map.layers.forEach((layer, index) => {
  const visibility = layer.visible !== false ? '✅ Visível' : '❌ Oculto';
  const opacity = layer.opacity !== undefined ? `opacidade: ${layer.opacity}` : '';
  
  console.log(`${index + 1}. ${layer.name} (${layer.type})`);
  console.log(`   ${visibility} ${opacity}`);
  
  if (layer.type === 'tilelayer') {
    const nonZeroTiles = layer.data.filter(t => t !== 0).length;
    const totalTiles = layer.data.length;
    console.log(`   Tiles: ${nonZeroTiles}/${totalTiles} não-zero`);
  } else if (layer.type === 'objectgroup') {
    const objectCount = layer.objects ? layer.objects.length : 0;
    console.log(`   Objetos: ${objectCount}`);
  }
  console.log('');
});

// Verificar ordem recomendada
console.log('\n📋 ORDEM RECOMENDADA DO WORKADVENTURE:');
console.log('1. floor (tilelayer) - Fundo/chão');
console.log('2. walls (tilelayer) - Paredes');
console.log('3. rooms (tilelayer) - Decoração/salas');
console.log('4. start (objectgroup) - Ponto de spawn');
console.log('5. zones (objectgroup) - Zonas especiais');
console.log('6. floorLayer (objectgroup) - Objetos no chão');

// Verificar se a ordem está correta
const expectedOrder = ['floor', 'walls', 'rooms', 'start', 'floorLayer', 'zones'];
const actualOrder = map.layers.map(l => l.name);

console.log('\n🔍 COMPARAÇÃO:');
expectedOrder.forEach((expected, index) => {
  const actual = actualOrder[index];
  if (expected === actual) {
    console.log(`✅ ${index + 1}. ${expected} - CORRETO`);
  } else {
    console.log(`❌ ${index + 1}. Esperado: ${expected}, Encontrado: ${actual || 'N/A'}`);
  }
});

// Verificar se há camadas ocultas que deveriam estar visíveis
console.log('\n👁️  VISIBILIDADE:');
map.layers.forEach(layer => {
  if (layer.type === 'tilelayer' && layer.visible === false) {
    console.log(`⚠️  Camada "${layer.name}" está OCULTA! Isso pode causar mapa vazio.`);
  }
});

// Verificar opacidade
map.layers.forEach(layer => {
  if (layer.type === 'tilelayer' && layer.opacity !== undefined && layer.opacity < 1) {
    console.log(`⚠️  Camada "${layer.name}" tem opacidade ${layer.opacity} (pode estar muito transparente)`);
  }
});

console.log('\n✅ Verificação concluída!\n');

