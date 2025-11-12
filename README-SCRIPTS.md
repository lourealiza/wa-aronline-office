# 🚀 Scripts Disponíveis - WorkAdventure Office

## 📋 Scripts NPM

Você pode executar os scripts de duas formas:

### **Opção 1: Via NPM (Recomendado)**
```bash
npm run <nome-do-script>
```

### **Opção 2: Via Node Direto**
```bash
node <nome-do-arquivo>.js
```

---

## 🎯 SCRIPTS PRINCIPAIS

### **Desenvolvimento**

#### `npm run dev`
Inicia o servidor de desenvolvimento local.

```bash
npm run dev
```

**Equivalente a:** `vite`

**Quando usar:**
- Desenvolvimento diário
- Testar mapas localmente
- Verificar mudanças em tempo real

---

#### `npm run check-maps`
Verifica integridade de todos os mapas.

```bash
npm run check-maps
```

**Equivalente a:** `node check-maps.js`

**O que mostra:**
- ✅ Tilesets encontrados
- 📏 Dimensões dos mapas
- 🖼️ Lista de tilesets usados
- 🔍 Verificação de arquivos

**Exemplo de saída:**
```
🔍 Verificando integridade dos mapas...

✅ WA_Room_Builder.png - 44.1 KB
✅ tileset_colors_walls.png - 1153.0 KB

📋 office.tmj: 31x21, 10 tilesets
✅ Todos os arquivos encontrados
```

---

### **Correção e Organização**

#### `npm run organize-tilesets`
Move tilesets da raiz para pasta `tilesets/`.

```bash
npm run organize-tilesets
```

**Equivalente a:** `node move-tilesets-to-folder.js`

**O que faz:**
- Move `WA_Room_Builder.png` → `tilesets/`
- Move `tileset_colors_walls.png` → `tilesets/`
- Remove duplicatas se forem idênticas

**⚠️ IMPORTANTE:** Execute apenas **UMA VEZ** no início do projeto!

---

#### `npm run fix-tilesets`
Atualiza todos os mapas para usar caminhos padronizados.

```bash
npm run fix-tilesets
```

**Equivalente a:** `node fix-all-tilesets.js`

**O que faz:**
- Corrige caminhos em **TODOS** os 7 mapas
- Padroniza para `tilesets/...`
- Mantém JSON bem formatado

**Quando usar:**
- Depois de `organize-tilesets`
- Após editar mapas no Tiled
- Antes de fazer commit

---

### **Deploy**

#### `npm run prepare-deploy`
Prepara mapas para deploy (URLs absolutas).

```bash
npm run prepare-deploy
```

**Equivalente a:** `node fix-for-deploy.js`

**O que faz:**
- Converte caminhos relativos → URLs absolutas
- Adiciona base URL do GitHub Pages
- Prepara para build

**⚠️ NÃO FAÇA COMMIT** depois deste comando!

---

#### `npm run build`
Compila o projeto para produção.

```bash
npm run build
```

**Equivalente a:** `tsc && vite build && node build-gh-pages.js`

**O que faz:**
1. Compila TypeScript
2. Build com Vite
3. Processa para GitHub Pages

---

#### `npm run revert-deploy`
Reverte URLs absolutas para caminhos relativos.

```bash
npm run revert-deploy
```

**Equivalente a:** `node revert-from-deploy.js`

**O que faz:**
- Remove URLs absolutas
- Restaura caminhos relativos
- Permite continuar desenvolvimento

**SEMPRE EXECUTE** depois de `npm run build` para deploy!

---

#### `npm run deploy` 🌟
**Script Automático Completo**

```bash
npm run deploy
```

**Equivalente a:**
```bash
npm run prepare-deploy && npm run build && npm run revert-deploy
```

**O que faz:**
1. ✅ Prepara mapas (URLs absolutas)
2. ✅ Build para produção
3. ✅ Reverte mapas (caminhos relativos)

**Este é o melhor script para usar!** Faz tudo automaticamente.

---

## 🔄 WORKFLOWS COMPLETOS

### **Setup Inicial (Primeira Vez)**

```bash
# 1. Clonar/baixar projeto
cd "D:\001 - WA Office\wa-aronline-office"

# 2. Instalar dependências
npm install

# 3. Organizar tilesets (APENAS UMA VEZ!)
npm run organize-tilesets

# 4. Atualizar mapas
npm run fix-tilesets

# 5. Verificar
npm run check-maps

# 6. Testar
npm run dev
```

---

### **Desenvolvimento Diário**

```bash
# Iniciar servidor
npm run dev

# (Editar mapas no Tiled)
# (Salvar)

# Verificar se está tudo OK
npm run check-maps

# Se necessário, corrigir caminhos
npm run fix-tilesets

# Fazer commit
git add .
git commit -m "feat: Atualizar mapa X"
```

---

### **Deploy para GitHub Pages**

#### **Opção A: Automático (Recomendado)** ⭐

```bash
# Um único comando faz tudo
npm run deploy

# Fazer push
git push origin main

# Aguardar GitHub Pages processar
# Testar: https://lourealiza.github.io/wa-aronline-office/
```

---

#### **Opção B: Manual (Controle Total)**

```bash
# 1. Preparar para deploy
npm run prepare-deploy

# 2. Build
npm run build

# 3. Verificar pasta dist/

# 4. Reverter mudanças nos mapas
npm run revert-deploy

# 5. Fazer push
git push origin main
```

---

## 🐛 TROUBLESHOOTING

### ❌ "Cannot find module 'fs'"

**Causa:** Node.js não instalado ou versão antiga

**Solução:**
```bash
node --version  # Deve ser v18 ou superior
```

Se não tiver Node.js: [Baixe aqui](https://nodejs.org/)

---

### ❌ Script não encontrado

**Erro:**
```
npm ERR! Missing script: "fix-tilesets"
```

**Solução:**
```bash
# Verificar se package.json foi atualizado
cat package.json | grep fix-tilesets

# Se não aparecer, o package.json não foi atualizado
# Abra o arquivo e adicione os scripts manualmente
```

---

### ❌ PowerShell não reconhece `&&`

**Erro:**
```
O token '&&' não é um separador de instruções válido
```

**Solução:** Use `;` ao invés de `&&`

```bash
# ❌ Errado (Bash)
cd pasta && npm run dev

# ✅ Correto (PowerShell)
cd pasta; npm run dev
```

---

### ❌ Erro ao executar scripts

**Se você ver:**
```
Execution of scripts is disabled on this system
```

**Solução:**
```powershell
# Execute como Administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📊 RESUMO RÁPIDO

| Comando | O que faz | Quando usar |
|---------|-----------|-------------|
| `npm run dev` | Servidor local | Desenvolvimento |
| `npm run check-maps` | Diagnóstico | Verificação |
| `npm run organize-tilesets` | Mover arquivos | Setup inicial (1x) |
| `npm run fix-tilesets` | Padronizar caminhos | Após editar mapas |
| `npm run prepare-deploy` | URLs absolutas | Antes de build |
| `npm run build` | Compilar produção | Deploy |
| `npm run revert-deploy` | Reverter URLs | Após build |
| `npm run deploy` | Tudo automático | Deploy completo ⭐ |

---

## 🎯 RECOMENDAÇÕES

### ✅ Use sempre:
- `npm run deploy` para fazer deploy
- `npm run check-maps` para verificar
- `npm run dev` para desenvolver

### ⚠️ Use com cuidado:
- `npm run organize-tilesets` - Apenas uma vez!
- `npm run prepare-deploy` - Sempre reverta depois!

### ❌ Nunca faça:
- Commit depois de `prepare-deploy` sem reverter
- Execute `organize-tilesets` múltiplas vezes
- Delete tilesets sem verificar dependências

---

## 📚 DOCUMENTAÇÃO COMPLETA

Para mais detalhes, consulte:

- 📄 `DIAGNOSTICO-TILESETS.md` - Diagnóstico completo
- 📄 `GUIA-CORRECAO-TILESETS.md` - Guia detalhado
- 📄 `README.md` - Documentação geral do projeto

---

**Atualizado:** 2025-11-12  
**Versão:** 1.0

