import fs from 'fs';
import path from 'path';

console.log('📦 ORGANIZANDO TILESETS\n');
console.log('Movendo tilesets da raiz para pasta tilesets/\n');

const tilesetsToMove = [
  'WA_Room_Builder.png',
  'tileset_colors_walls.png'
];

const targetDir = 'tilesets';

// Verificar se a pasta tilesets existe
if (!fs.existsSync(targetDir)) {
  console.log(`📁 Criando pasta: ${targetDir}`);
  fs.mkdirSync(targetDir);
}

console.log('═══════════════════════════════════════\n');

let movedCount = 0;
let skippedCount = 0;
let errorCount = 0;

tilesetsToMove.forEach(filename => {
  const sourcePath = filename;
  const targetPath = path.join(targetDir, filename);
  
  try {
    // Verificar se o arquivo existe na raiz
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  ${filename} - Não encontrado na raiz, pulando...`);
      skippedCount++;
      return;
    }
    
    // Verificar se já existe no destino
    if (fs.existsSync(targetPath)) {
      console.log(`❓ ${filename} - Já existe em ${targetDir}/`);
      
      // Comparar tamanhos
      const sourceStats = fs.statSync(sourcePath);
      const targetStats = fs.statSync(targetPath);
      
      if (sourceStats.size === targetStats.size) {
        console.log(`   ℹ️  Arquivos são idênticos (${(sourceStats.size / 1024).toFixed(1)} KB)`);
        console.log(`   🗑️  Removendo duplicata da raiz...`);
        fs.unlinkSync(sourcePath);
        console.log(`   ✅ Duplicata removida\n`);
        movedCount++;
      } else {
        console.log(`   ⚠️  Tamanhos diferentes!`);
        console.log(`   📏 Raiz: ${(sourceStats.size / 1024).toFixed(1)} KB`);
        console.log(`   📏 Pasta: ${(targetStats.size / 1024).toFixed(1)} KB`);
        console.log(`   ❓ Faça backup e escolha qual versão manter`);
        console.log(`   ⏭️  Pulando por segurança...\n`);
        skippedCount++;
      }
    } else {
      // Mover arquivo
      console.log(`📦 ${filename}`);
      console.log(`   De: ${sourcePath}`);
      console.log(`   Para: ${targetPath}`);
      
      fs.renameSync(sourcePath, targetPath);
      
      const stats = fs.statSync(targetPath);
      console.log(`   ✅ Movido com sucesso (${(stats.size / 1024).toFixed(1)} KB)\n`);
      movedCount++;
    }
    
  } catch (error) {
    console.log(`   ❌ ERRO ao processar ${filename}: ${error.message}\n`);
    errorCount++;
  }
});

console.log('═══════════════════════════════════════');
console.log('🎉 RESUMO:');
console.log(`   Arquivos movidos/limpos: ${movedCount}`);
console.log(`   Arquivos pulados: ${skippedCount}`);
console.log(`   Erros encontrados: ${errorCount}`);

if (errorCount === 0 && movedCount > 0) {
  console.log('   ✅ Organização concluída!');
} else if (skippedCount > 0) {
  console.log('   ⚠️  Alguns arquivos foram pulados');
}

console.log('═══════════════════════════════════════');
console.log('\n💡 PRÓXIMOS PASSOS:');
console.log('1. Execute: node fix-all-tilesets.js');
console.log('2. Teste localmente: npm run dev');
console.log('3. Se tudo estiver OK, faça commit\n');

