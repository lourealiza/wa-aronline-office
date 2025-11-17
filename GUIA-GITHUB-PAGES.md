# 🌐 Guia Completo: GitHub Pages para WorkAdventure

Este guia é baseado no tutorial oficial do WorkAdventure sobre como hospedar mapas no GitHub Pages.

## 📋 Pré-requisitos

1. ✅ **Conta no GitHub** (crie em [github.com](https://github.com))
2. ✅ **Repositório público** (GitHub Pages requer repositório público)
3. ✅ **Git instalado** ou GitHub Desktop
4. ✅ **Node.js** (versão >= 18)

## 🚀 Passo a Passo

### 1. Criar Repositório a partir do Template

1. Acesse o [Map Starter Kit no GitHub](https://github.com/thecodingmachine/workadventure-map-starter-kit)
2. Clique em **"Use this template"** → **"Create a new repository"**
3. **IMPORTANTE**: Marque como **PÚBLICO** (GitHub Pages não funciona com repositórios privados)
4. Escolha um nome para seu repositório (ex: `wa-aronline-office`)
5. Clique em **"Create repository from template"**

### 2. Clonar o Repositório

**Opção A: GitHub Desktop**
1. Baixe o [GitHub Desktop](https://desktop.github.com)
2. Abra o GitHub Desktop
3. Clique em **"Clone repository"**
4. Selecione seu repositório
5. Escolha onde salvar localmente
6. Clique em **"Clone"**

**Opção B: Git Command Line**
```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Editar o Mapa

1. Baixe o [Tiled Map Editor](https://www.mapeditor.org/)
2. Abra o arquivo `.tmj` (ex: `wa_map-ar-online-professional.tmj`)
3. Edite seu mapa conforme necessário
4. Salve o arquivo

### 5. Testar Localmente

```bash
npm run dev
```

Acesse `http://localhost:5173` para ver seu mapa.

### 6. Build e Deploy

O projeto já está configurado com GitHub Actions para fazer deploy automaticamente.

**Opção A: Deploy Automático (Recomendado)**
1. Faça commit e push das alterações:
   ```bash
   git add .
   git commit -m "Atualizar mapa"
   git push origin master
   ```
2. O GitHub Actions fará o build e deploy automaticamente
3. Aguarde alguns minutos
4. Acesse: `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

**Opção B: Deploy Manual**
```bash
npm run build
# Depois, faça upload manual da pasta dist/ para o GitHub Pages
```

## ⚙️ Configuração do GitHub Pages

### Verificar Configuração

1. Vá em **Settings** → **Pages** no seu repositório GitHub
2. Verifique se está configurado para:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` ou `master` (dependendo da configuração)
   - **Folder**: `/ (root)` ou `/dist`

### Configuração Atual do Projeto

Este projeto usa:
- **Workflow**: `.github/workflows/static.yml`
- **Branch**: `master` (faz deploy da pasta `dist/`)
- **Ação**: Build automático via GitHub Actions

## 🔍 Verificação

Após o deploy, verifique:

1. **Acesse a URL do GitHub Pages**:
   ```
   https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
   ```

2. **Teste o mapa no WorkAdventure**:
   ```
   https://play.workadventu.re/_/global/SEU-USUARIO.github.io/SEU-REPOSITORIO/wa_map-ar-online-professional.tmj
   ```

3. **Verifique se os tilesets carregam**:
   - Abra o DevTools (F12)
   - Vá em Network
   - Recarregue a página
   - Verifique se os arquivos `.png` dos tilesets estão sendo carregados

## ⚠️ Problemas Comuns

### 1. Repositório Privado
**Problema**: GitHub Pages não funciona com repositórios privados
**Solução**: Torne o repositório público em Settings → General → Danger Zone

### 2. Tilesets Não Carregam
**Problema**: URLs incorretas ou arquivos não encontrados
**Solução**: 
- Verifique se os tilesets estão na pasta `tilesets/`
- Verifique se as URLs estão corretas no arquivo `.tmj`
- Use URLs relativas no código fonte, o build converterá para absolutas

### 3. Mapa Vazio
**Problema**: Mapa carrega mas aparece vazio
**Solução**:
- Verifique se o ponto de spawn está configurado
- Verifique se há tiles na camada "floor"
- Verifique o console do navegador para erros

### 4. Build Falha
**Problema**: GitHub Actions falha no build
**Solução**:
- Verifique os logs do GitHub Actions
- Certifique-se de que `package.json` está correto
- Verifique se todas as dependências estão instaladas

## 📁 Estrutura de Arquivos

```
wa-aronline-office/
├── .github/
│   └── workflows/
│       └── static.yml          # Workflow de deploy
├── tilesets/                   # Tilesets do mapa
│   ├── WA_Room_Builder.png
│   └── ...
├── src/                        # Scripts TypeScript
├── public/                     # Arquivos estáticos
├── wa_map-ar-online-professional.tmj  # Arquivo do mapa
├── package.json
├── vite.config.ts
└── build-gh-pages.js          # Script de build para GitHub Pages
```

## 🔄 Processo de Build

Quando você faz push para `master`, o GitHub Actions:

1. **Checkout** do código
2. **Instala** dependências (`npm ci`)
3. **Build** do projeto (`npm run build`):
   - Compila TypeScript
   - Otimiza mapas com `wa-map-optimizer-vite`
   - Executa `build-gh-pages.js`:
     - Copia tilesets para `dist/tilesets/`
     - Converte URLs relativas para absolutas nos `.tmj`
4. **Deploy** da pasta `dist/` para GitHub Pages

## 📚 Recursos Adicionais

- [Documentação WorkAdventure - GitHub Pages](https://docs.workadventu.re/map-building/tiled-editor/publish/github-pages)
- [Tiled Map Editor](https://www.mapeditor.org/)
- [GitHub Pages Documentation](https://docs.github.com/pages)

## 💡 Dicas

1. **Sempre teste localmente** antes de fazer push
2. **Use `npm run dev`** para desenvolvimento rápido
3. **Use `npm run build`** para testar o build localmente
4. **Verifique os logs do GitHub Actions** se algo der errado
5. **Mantenha o repositório público** para GitHub Pages funcionar

---

**Nota**: Se você está tendo problemas persistentes com GitHub Pages, considere usar o **WorkAdventure Map Storage** (veja `GUIA-UPLOAD-MAP-STORAGE.md`), que é mais fácil de configurar e recomendado pelo WorkAdventure.

