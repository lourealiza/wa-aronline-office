import fs from 'fs';

console.log('🔍 VERIFICAÇÃO COMPLETA DO DEPLOY\n');

// Verificar se dist/ existe
if (!fs.existsSync('dist')) {
  console.log('❌ Pasta dist/ não existe! Execute npm run build primeiro.');
  process.exit(1);
}

// Verificar arquivo do mapa
const mapFile = 'dist/wa_map-ar-online-professional.tmj';
if (!fs.existsSync(mapFile)) {
  console.log(`❌ Arquivo ${mapFile} não encontrado!`);
  process.exit(1);
}

const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

console.log('✅ Arquivo do mapa encontrado\n');

// Verificar URLs dos tilesets
console.log('📦 TILESETS:');
let hasAbsoluteUrls = false;
let hasRelativeUrls = false;

map.tilesets.forEach((tileset, index) => {
  console.log(`\n${index + 1}. ${tileset.name}`);
  console.log(`   URL: ${tileset.image}`);
  
  if (tileset.image.startsWith('http://') || tileset.image.startsWith('https://')) {
    console.log(`   ⚠️  URL ABSOLUTA (pode causar problemas)`);
    hasAbsoluteUrls = true;
    
    // Verificar duplicação
    if (tileset.image.includes('https://lourealiza.github.io/wa-aronline-office/https://')) {
      console.log(`   ❌ URL DUPLICADA DETECTADA!`);
    }
  } else {
    console.log(`   ✅ URL RELATIVA (correto)`);
    hasRelativeUrls = true;
  }
  
  // Verificar se arquivo existe localmente
  const localPath = tileset.image.replace(/^https?:\/\/[^\/]+/, '');
  const cleanPath = localPath.startsWith('/') ? localPath.substring(1) : localPath;
  const distPath = `dist/${cleanPath}`;
  
  if (fs.existsSync(distPath)) {
    const stats = fs.statSync(distPath);
    console.log(`   ✅ Arquivo existe em dist/: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`   ⚠️  Arquivo NÃO encontrado em dist/${cleanPath}`);
  }
});

// Verificar camadas
console.log('\n📑 CAMADAS:');
map.layers.forEach(layer => {
  if (layer.type === 'tilelayer') {
    const nonZeroTiles = layer.data.filter(t => t !== 0).length;
    const totalTiles = layer.data.length;
    const uniqueTiles = [...new Set(layer.data.filter(t => t !== 0))].length;
    
    console.log(`   ${layer.name}:`);
    console.log(`      Tiles não-zero: ${nonZeroTiles}/${totalTiles}`);
    console.log(`      Tiles únicos: ${uniqueTiles}`);
    console.log(`      Visível: ${layer.visible !== false ? 'Sim' : 'Não'}`);
    console.log(`      Opacidade: ${layer.opacity !== undefined ? layer.opacity : 1}`);
  }
});

// Resumo
console.log('\n📊 RESUMO:');
if (hasAbsoluteUrls && !hasRelativeUrls) {
  console.log('❌ PROBLEMA: Todos os tilesets têm URLs absolutas!');
  console.log('   O WorkAdventure vai duplicar o baseUrl.');
  console.log('   Solução: URLs devem ser relativas.');
} else if (hasRelativeUrls && !hasAbsoluteUrls) {
  console.log('✅ CORRETO: Todos os tilesets têm URLs relativas!');
} else if (hasAbsoluteUrls && hasRelativeUrls) {
  console.log('⚠️  MISTO: Alguns tilesets têm URLs absolutas, outros relativas.');
  console.log('   Recomendado: Padronizar para URLs relativas.');
} else {
  console.log('✅ URLs relativas configuradas corretamente.');
}

// Verificar estrutura de arquivos
console.log('\n📁 ESTRUTURA DE ARQUIVOS:');
const tilesetsDir = 'dist/tilesets';
if (fs.existsSync(tilesetsDir)) {
  const files = fs.readdirSync(tilesetsDir);
  console.log(`✅ Pasta dist/tilesets/ existe com ${files.length} arquivos`);
  if (files.length > 0) {
    console.log(`   Primeiros arquivos: ${files.slice(0, 5).join(', ')}${files.length > 5 ? '...' : ''}`);
  }
} else {
  console.log('❌ Pasta dist/tilesets/ NÃO existe!');
}

console.log('\n✅ Verificação concluída!\n');

