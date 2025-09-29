import fs from 'fs';
import path from 'path';

const baseUrl = 'https://lourealiza.github.io/wa-aronline-office/';
const mapFiles = [
  'wa_map-ar-online-professional.tmj',
  'wa_map-interativo.tmj', 
  'wa_map-complexo.tmj',
  'wa_map-working.tmj',
  'wa_map-complexo-v2.tmj'
];

console.log('🔧 Convertendo tilesets para URLs absolutas para deploy...');

mapFiles.forEach(mapFile => {
  if (fs.existsSync(mapFile)) {
    console.log(`📝 Processando: ${mapFile}`);
    
    let content = fs.readFileSync(mapFile, 'utf8');
    
    // Substituir caminhos relativos por URLs absolutas
    content = content.replace(
      /"image": "WA_Room_Builder\.png"/g,
      `"image": "${baseUrl}WA_Room_Builder.png"`
    );
    
    content = content.replace(
      /"image": "tileset_colors_walls\.png"/g,
      `"image": "${baseUrl}tileset_colors_walls.png"`
    );
    
    // Salvar arquivo modificado
    fs.writeFileSync(mapFile, content);
    console.log(`✅ Atualizado: ${mapFile}`);
  } else {
    console.log(`⚠️  Arquivo não encontrado: ${mapFile}`);
  }
});

console.log('🎉 URLs dos tilesets convertidas para deploy!');
