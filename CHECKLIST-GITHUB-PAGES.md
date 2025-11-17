# ✅ Checklist: GitHub Pages para WorkAdventure

Baseado no tutorial oficial do WorkAdventure sobre GitHub Pages.

## 🔍 Verificações Essenciais

### 1. ✅ Repositório Público
**CRÍTICO**: GitHub Pages **NÃO funciona** com repositórios privados!

**Como verificar:**
- Acesse: `https://github.com/lourealiza/wa-aronline-office/settings`
- Verifique se está marcado como **"Public"**
- Se estiver privado, vá em **"Danger Zone"** → **"Change repository visibility"** → **"Make public"**

### 2. ✅ Estrutura de Arquivos
Verifique se os arquivos estão no lugar correto:

```
wa-aronline-office/
├── tilesets/              ✅ Tilesets na raiz
│   ├── WA_Room_Builder.png
│   └── ...
├── wa_map-ar-online-professional.tmj  ✅ Arquivo do mapa
├── package.json           ✅ Configuração do projeto
├── vite.config.ts        ✅ Configuração do Vite
└── build-gh-pages.js     ✅ Script de build
```

### 3. ✅ GitHub Pages Configurado
Acesse: `https://github.com/lourealiza/wa-aronline-office/settings/pages`

**Configuração esperada:**
- **Source**: `Deploy from a branch`
- **Branch**: `gh-pages` (se usando workflow antigo) OU deixar vazio (se usando GitHub Actions)
- **Folder**: `/ (root)` ou deixar vazio

**Nota**: Com o workflow `static.yml` atual, o GitHub Pages é configurado automaticamente via GitHub Actions.

### 4. ✅ GitHub Actions Funcionando
Acesse: `https://github.com/lourealiza/wa-aronline-office/actions`

**Verifique:**
- ✅ Último workflow passou sem erros
- ✅ Build completou com sucesso
- ✅ Deploy para GitHub Pages completou
- ✅ Status verde (✓)

### 5. ✅ Workflow Configurado Corretamente
O arquivo `.github/workflows/static.yml` deve:
- ✅ Fazer build do projeto (`npm run build`)
- ✅ Copiar tilesets para `dist/tilesets/`
- ✅ Converter URLs relativas para absolutas
- ✅ Fazer deploy da pasta `dist/` para GitHub Pages

### 6. ✅ URLs dos Tilesets Corretas

**No código fonte** (arquivos `.tmj` na raiz):
- ✅ URLs relativas: `tilesets/WA_Room_Builder.png`

**Após build** (arquivos `.tmj` em `dist/`):
- ✅ URLs absolutas: `https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png`

### 7. ✅ Ponto de Spawn Configurado
- ✅ Camada chamada `start` existe
- ✅ Objeto do tipo `spawn` dentro da camada `start`
- ✅ Posição válida (dentro dos limites do mapa)
- ✅ Tile válido na posição do spawn (não-zero)

### 8. ✅ Propriedades do Mapa
Verifique se o arquivo `.tmj` tem todas as propriedades:
- ✅ `mapName`
- ✅ `mapImage`
- ✅ `mapDescription`
- ✅ `mapCopyright`
- ✅ `script`

## 🧪 Testes

### Teste 1: URLs Acessíveis
Abra estas URLs no navegador:

```
✅ https://lourealiza.github.io/wa-aronline-office/wa_map-ar-online-professional.tmj
✅ https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
```

**Esperado**: Arquivos devem carregar (não 404)

### Teste 2: Mapa no WorkAdventure
Acesse:
```
https://play.workadventu.re/_/global/lourealiza.github.io/wa-aronline-office/wa_map-ar-online-professional.tmj
```

**Esperado**: 
- ✅ Mapa carrega
- ✅ Tilesets aparecem (não fundo azul vazio)
- ✅ Personagem aparece no ponto de spawn

### Teste 3: Console do Navegador
1. Abra o DevTools (F12)
2. Vá em **Network**
3. Recarregue a página do mapa
4. Filtre por `.png`

**Esperado**:
- ✅ Tilesets retornam status `200 OK`
- ❌ Não deve haver `404 Not Found`

## 🔧 Problemas Comuns e Soluções

### ❌ Problema: Repositório Privado
**Sintoma**: GitHub Pages não funciona
**Solução**: Torne o repositório público

### ❌ Problema: Tilesets Não Carregam
**Sintoma**: Mapa vazio, fundo azul
**Solução**: 
1. Verifique se `tilesets/` está commitado
2. Verifique URLs no arquivo `.tmj` do `dist/`
3. Limpe cache do navegador

### ❌ Problema: Build Falha
**Sintoma**: GitHub Actions mostra erro
**Solução**:
1. Verifique logs do GitHub Actions
2. Execute `npm run build` localmente para ver erros
3. Verifique se todas as dependências estão instaladas

### ❌ Problema: Deploy Não Funciona
**Sintoma**: GitHub Pages não atualiza
**Solução**:
1. Verifique se GitHub Pages está habilitado
2. Verifique permissões do workflow (`pages: write`)
3. Aguarde alguns minutos (pode demorar)

## 📚 Recursos

- [Tutorial Oficial - GitHub Pages](https://docs.workadventu.re/map-building/tiled-editor/publish/github-pages)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [WorkAdventure Map Starter Kit](https://github.com/thecodingmachine/workadventure-map-starter-kit)

---

**💡 Dica**: Se continuar tendo problemas, considere usar **WorkAdventure Map Storage** (veja `GUIA-UPLOAD-MAP-STORAGE.md`), que é mais fácil e recomendado pelo WorkAdventure.

