# 🔧 Guia de Correção de Tilesets - WorkAdventure

## 📋 O QUE FAZER

Este guia apresenta **4 scripts** criados para resolver os problemas de tilesets no seu projeto WorkAdventure.

---

## 🎯 CENÁRIOS E SOLUÇÕES

### **Cenário 1: Desenvolvimento Local** (Recomendado) ⭐

#### 🎯 Objetivo: Padronizar tudo na pasta `tilesets/`

```bash
# Passo 1: Mover arquivos duplicados para tilesets/
node move-tilesets-to-folder.js

# Passo 2: Atualizar todos os mapas para usar tilesets/
node fix-all-tilesets.js

# Passo 3: Testar localmente
npm run dev

# Passo 4: Abrir http://localhost:PORTA e verificar
```

#### ✅ Vantagens:
- Estrutura organizada
- Sem duplicatas
- Pronto para desenvolvimento e deploy

---

### **Cenário 2: Deploy Urgente (GitHub Pages)**

#### 🎯 Objetivo: Fazer deploy funcionar AGORA

```bash
# Passo 1: Converter para URLs absolutas
node fix-for-deploy.js

# Passo 2: Build e deploy
npm run build
# (ou fazer push para GitHub Pages)

# Passo 3: Testar no navegador
# Abra: https://lourealiza.github.io/wa-aronline-office/

# Passo 4: Depois do deploy, reverter para continuar desenvolvendo
node revert-from-deploy.js
```

#### ⚠️ Aviso:
- Isso é uma solução temporária
- Depois, implemente o Cenário 1 para organização permanente

---

### **Cenário 3: Verificação e Diagnóstico**

```bash
# Ver status atual dos mapas
node check-maps.js

# Abrir relatório completo
# (Abrir arquivo: DIAGNOSTICO-TILESETS.md)
```

---

## 📚 DETALHES DOS SCRIPTS

### 1️⃣ **move-tilesets-to-folder.js**

**O que faz:**
- Move `WA_Room_Builder.png` e `tileset_colors_walls.png` da raiz para `tilesets/`
- Verifica se há duplicatas
- Remove duplicatas se forem idênticas

**Quando usar:**
- Antes de padronizar os mapas
- Para organizar estrutura do projeto

**Exemplo de saída:**
```
📦 ORGANIZANDO TILESETS

📦 WA_Room_Builder.png
   De: WA_Room_Builder.png
   Para: tilesets/WA_Room_Builder.png
   ✅ Movido com sucesso (44.1 KB)

🎉 RESUMO:
   Arquivos movidos/limpos: 2
   ✅ Organização concluída!
```

---

### 2️⃣ **fix-all-tilesets.js**

**O que faz:**
- Atualiza TODOS os 7 mapas (`.tmj`)
- Padroniza caminhos para `tilesets/...`
- Mantém JSON formatado corretamente

**Quando usar:**
- Depois de mover os tilesets
- Para desenvolvimento local
- Antes de fazer commit

**Exemplo de saída:**
```
📝 Processando: office.tmj
   🔄 Tileset 1: WA_Special_Zones
      De: tilesets/WA_Special_Zones.png
      Para: tilesets/WA_Special_Zones.png
   ✅ Atualizado e salvo

🎉 RESUMO:
   Atualizações realizadas: 15
   ✅ Todos os mapas foram processados com sucesso!
```

---

### 3️⃣ **fix-for-deploy.js**

**O que faz:**
- Converte caminhos relativos para URLs absolutas
- Adiciona base URL: `https://lourealiza.github.io/wa-aronline-office/`
- Prepara para GitHub Pages

**Quando usar:**
- **ANTES** de fazer build para deploy
- Quando fazer push para GitHub Pages

**Exemplo de saída:**
```
📝 Processando: office.tmj
   🔄 Tileset 1: WA_Room_Builder
      De: tilesets/WA_Room_Builder.png
      Para: https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
   ✅ Atualizado e salvo

🎉 RESUMO:
   URLs convertidas: 70
   ✅ Todos os mapas foram preparados para deploy!
```

---

### 4️⃣ **revert-from-deploy.js**

**O que faz:**
- Reverte URLs absolutas de volta para caminhos relativos
- Remove base URL
- Restaura estado para desenvolvimento local

**Quando usar:**
- **DEPOIS** de fazer deploy
- Para continuar desenvolvendo localmente

**Exemplo de saída:**
```
📝 Processando: office.tmj
   🔄 Tileset 1: WA_Room_Builder
      De: https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
      Para: tilesets/WA_Room_Builder.png
   ✅ Revertido e salvo

🎉 RESUMO:
   URLs revertidas: 70
   ✅ Todos os mapas foram revertidos com sucesso!
```

---

## 🚀 WORKFLOW RECOMENDADO

### **Para Desenvolvimento:**

```bash
# Apenas uma vez (setup inicial)
node move-tilesets-to-folder.js
node fix-all-tilesets.js
git add .
git commit -m "feat: Padronizar tilesets na pasta tilesets/"

# Desenvolvimento normal
npm run dev
# Editar mapas no Tiled
# Testar no navegador
```

---

### **Para Deploy:**

```bash
# Preparar para deploy
node fix-for-deploy.js
npm run build

# Fazer deploy (exemplo GitHub Pages)
git add .
git commit -m "build: Deploy para GitHub Pages"
git push origin main

# Reverter para continuar desenvolvendo
node revert-from-deploy.js
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### ❌ Erro: "Cannot find module"

```bash
# Certifique-se de estar na pasta correta
cd "D:\001 - WA Office\wa-aronline-office"

# Instale dependências
npm install
```

---

### ❌ Erro: "404 Not Found" no navegador

**Abra DevTools (F12) → Console:**

```javascript
// Exemplo de erro
Failed to load: https://seu-site.com/tilesets/WA_Room_Builder.png
Status: 404 Not Found
```

**Soluções:**

1. **Arquivo não existe:**
   - Verifique: `ls tilesets/WA_Room_Builder.png`
   - Se não existir, copie de outra fonte

2. **Caminho errado no mapa:**
   - Execute: `node fix-all-tilesets.js`

3. **Problema no deploy:**
   - Execute: `node fix-for-deploy.js`
   - Faça rebuild: `npm run build`

---

### ❌ Mapa aparece preto/vazio

**Causas possíveis:**

1. **Tilesets não carregados:**
   - Abra Console (F12)
   - Procure erros de carregamento de imagem

2. **Camadas invisíveis:**
   - Abra o mapa no Tiled
   - Verifique se todas as camadas estão visíveis (ícone de olho)

3. **Dados de tiles corrompidos:**
   - Execute: `node check-maps.js`
   - Veja se as camadas têm tiles não-zero

---

### ❌ Tilesets duplicados após mover

**Se você já tinha tilesets em ambos os lugares:**

```bash
# O script detectará isso e mostrará:
❓ WA_Room_Builder.png - Já existe em tilesets/
   ℹ️  Arquivos são idênticos (44.1 KB)
   🗑️  Removendo duplicata da raiz...
   ✅ Duplicata removida
```

**Se os tamanhos forem diferentes:**

```bash
❓ WA_Room_Builder.png - Já existe em tilesets/
   ⚠️  Tamanhos diferentes!
   📏 Raiz: 44.1 KB
   📏 Pasta: 50.2 KB
   ❓ Faça backup e escolha qual versão manter
```

**Solução:**
1. Compare visualmente os arquivos
2. Faça backup de ambos
3. Delete o arquivo indesejado manualmente
4. Execute o script novamente

---

## 📊 CHECKLIST FINAL

Após executar os scripts:

### ✅ Verificação Local:

- [ ] `node check-maps.js` não mostra erros
- [ ] `npm run dev` inicia sem erros
- [ ] Abrir `http://localhost:PORT` mostra o mapa
- [ ] Console (F12) não mostra erros 404
- [ ] Tilesets carregam corretamente
- [ ] Personagem aparece e se move

### ✅ Verificação Deploy:

- [ ] `node fix-for-deploy.js` executado
- [ ] `npm run build` sem erros
- [ ] Deploy para GitHub Pages feito
- [ ] Abrir URL pública funciona
- [ ] Console não mostra erros
- [ ] Tilesets carregam da URL correta

---

## 📞 SUPORTE

Se precisar de ajuda, forneça:

1. **Comando executado:**
   ```bash
   node fix-all-tilesets.js
   ```

2. **Saída completa do comando**

3. **Print do Console (F12)**

4. **Conteúdo de um arquivo .tmj:**
   ```json
   {
     "tilesets": [
       {
         "name": "WA_Room_Builder",
         "image": "???"  ← Mostrar este valor
       }
     ]
   }
   ```

---

## 🎯 RESUMO RÁPIDO

| Script | Quando Usar | O que Faz |
|--------|------------|-----------|
| `move-tilesets-to-folder.js` | Uma vez (setup) | Move tilesets para pasta |
| `fix-all-tilesets.js` | Desenvolvimento | Padroniza caminhos |
| `fix-for-deploy.js` | Antes de deploy | Converte para URLs absolutas |
| `revert-from-deploy.js` | Depois de deploy | Reverte para caminhos relativos |
| `check-maps.js` | Diagnóstico | Verifica status dos mapas |

---

**Criado em:** 2025-11-12  
**Versão:** 1.0  
**Compatível com:** WorkAdventure Starter Kit v3.3.18

