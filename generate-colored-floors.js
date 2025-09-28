import fs from 'fs';

// Ler o arquivo do mapa
const mapFile = 'wa_map-ar-online-professional.tmj';
const mapData = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

// Definir cores para cada divisão (usando tiles de chão do WA_Room_Builder)
const floorColors = {
  // Lobby Central (centro do mapa)
  lobby: 1, // Chão padrão
  
  // Desenvolvimento (canto superior esquerdo)
  dev: 2, // Chão verde
  
  // QA & DevOps (canto superior direito)
  qa: 3, // Chão amarelo
  
  // Marketing & Design (canto inferior esquerdo)
  marketing: 4, // Chão rosa
  
  // RH & Financeiro (canto inferior direito)
  hr: 5, // Chão roxo
  
  // Vendas & Suporte (lateral esquerda)
  sales: 6, // Chão laranja
  
  // Salas de Reunião (lateral direita)
  meeting: 7, // Chão cinza
  
  // Auditório & Treinamento (centro inferior)
  auditorium: 8, // Chão azul
};

// Função para definir cores baseadas na posição
function getFloorColor(x, y, width, height) {
  // Lobby Central (centro: 8-16 x, 6-14 y)
  if (x >= 8 && x < 16 && y >= 6 && y < 14) {
    return floorColors.lobby;
  }
  
  // Desenvolvimento (canto superior esquerdo: 0-8 x, 0-6 y)
  if (x < 8 && y < 6) {
    return floorColors.dev;
  }
  
  // QA & DevOps (canto superior direito: 16-24 x, 0-6 y)
  if (x >= 16 && y < 6) {
    return floorColors.qa;
  }
  
  // Marketing & Design (canto inferior esquerdo: 0-8 x, 14-20 y)
  if (x < 8 && y >= 14) {
    return floorColors.marketing;
  }
  
  // RH & Financeiro (canto inferior direito: 16-24 x, 14-20 y)
  if (x >= 16 && y >= 14) {
    return floorColors.hr;
  }
  
  // Vendas & Suporte (lateral esquerda: 0-8 x, 6-14 y)
  if (x < 8 && y >= 6 && y < 14) {
    return floorColors.sales;
  }
  
  // Salas de Reunião (lateral direita: 16-24 x, 6-14 y)
  if (x >= 16 && y >= 6 && y < 14) {
    return floorColors.meeting;
  }
  
  // Auditório & Treinamento (centro inferior: 8-16 x, 14-20 y)
  if (x >= 8 && x < 16 && y >= 14) {
    return floorColors.auditorium;
  }
  
  // Padrão: cor do lobby
  return floorColors.lobby;
}

// Aplicar cores ao chão
const width = mapData.width;
const height = mapData.height;
const floorLayer = mapData.layers.find(layer => layer.name === 'floor');

if (floorLayer) {
  console.log('🎨 Aplicando cores de chão para cada divisão...');
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const color = getFloorColor(x, y, width, height);
      floorLayer.data[index] = color;
    }
  }
  
  // Salvar arquivo modificado
  fs.writeFileSync(mapFile, JSON.stringify(mapData, null, 2));
  console.log('✅ Pisos coloridos aplicados com sucesso!');
  console.log('\n📋 Divisões criadas:');
  console.log('🔵 Lobby Central (centro)');
  console.log('🟢 Desenvolvimento (superior esquerdo)');
  console.log('🟡 QA & DevOps (superior direito)');
  console.log('🟣 Marketing & Design (inferior esquerdo)');
  console.log('🟣 RH & Financeiro (inferior direito)');
  console.log('🟠 Vendas & Suporte (lateral esquerda)');
  console.log('⚫ Salas de Reunião (lateral direita)');
  console.log('🔵 Auditório & Treinamento (centro inferior)');
} else {
  console.log('❌ Camada de chão não encontrada!');
}
