# 🔧 Troubleshooting - Deploy GitHub Pages

## 🎯 PROBLEMA: Tilesets Não Aparecem (Malha Rosa)

### **Sintomas:**
- ✅ Mapa carrega (`wa_map-interativo.tmj` encontrado)
- ❌ Tilesets não aparecem (fundo azul escuro ou malha rosa)
- ❌ Console mostra avisos sobre textures não encontradas

---

## 🔍 DIAGNÓSTICO PASSO A PASSO

### **1. Verificar Build Local**

```powershell
npm run build
npm run verify-deploy
```

**Esperado:** Todos os arquivos devem estar em `dist/`

**Se falhar:** Execute `npm install` e tente novamente

---

### **2. Verificar GitHub Actions**

Acesse: `https://github.com/lourealiza/wa-aronline-office/actions`

**Verifique:**
- ✅ Último workflow passou sem erros
- ✅ Build completou com sucesso
- ✅ Deploy para `gh-pages` completou

**Se falhou:**
- Veja os logs do erro
- Verifique se `.env` tem `UPLOAD_MODE=GH_PAGES`

---

### **3. Verificar GitHub Pages**

Acesse: `https://github.com/lourealiza/wa-aronline-office/settings/pages`

**Configuração correta:**
- ✅ Source: `Deploy from a branch`
- ✅ Branch: `gh-pages`
- ✅ Folder: `/ (root)` ou deixar vazio

---

### **4. Testar URLs Publicamente**

Abra estas URLs no navegador (substitua `lourealiza` pelo seu usuário):

```
✅ https://lourealiza.github.io/wa-aronline-office/wa_map-interativo.tmj
✅ https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
✅ https://lourealiza.github.io/wa-aronline-office/tilesets/tileset_colors_walls.png
```

**Se retornar 404:**
- GitHub Pages ainda não atualizou (aguarde 1-2 minutos)
- Ou deploy não foi feito corretamente

**Se retornar 200:**
- Arquivos estão acessíveis
- Problema pode ser cache do navegador

---

### **5. Limpar Cache do Navegador**

**Chrome/Edge:**
1. Pressione `Ctrl + Shift + Delete`
2. Selecione "Imagens e arquivos em cache"
3. Clique em "Limpar dados"

**Ou use modo anônimo:**
- `Ctrl + Shift + N` (Chrome)
- Teste a URL novamente

---

### **6. Verificar Console do Navegador**

1. Abra o mapa no WorkAdventure
2. Pressione `F12` → Aba **Console**
3. Procure por erros como:

```
❌ GET https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png 404
❌ Failed to load resource
❌ CORS policy error
```

**Se ver 404:**
- Arquivo não está no GitHub Pages
- Execute deploy novamente

**Se ver CORS:**
- Problema de configuração do GitHub Pages
- Verifique configurações de segurança

---

## 🚀 SOLUÇÕES

### **Solução 1: Forçar Novo Deploy**

```powershell
# Fazer commit vazio para disparar workflow
git commit --allow-empty -m "chore: Forçar novo deploy"
git push origin master
```

Aguarde o GitHub Actions completar (2-5 minutos)

---

### **Solução 2: Verificar Estrutura no GitHub**

1. Acesse: `https://github.com/lourealiza/wa-aronline-office/tree/gh-pages`
2. Verifique se existe pasta `tilesets/`
3. Verifique se `WA_Room_Builder.png` está dentro

**Se não existir:**
- O deploy não funcionou
- Verifique logs do GitHub Actions

---

### **Solução 3: Deploy Manual**

Se o GitHub Actions não funcionar:

```powershell
# Build local
npm run build

# Verificar
npm run verify-deploy

# Deploy manual para gh-pages
cd dist
git init
git add .
git commit -m "Deploy tilesets"
git branch -M gh-pages
git remote add origin https://github.com/lourealiza/wa-aronline-office.git
git push -f origin gh-pages
```

---

### **Solução 4: Verificar Caminhos nos Mapas**

Os mapas devem ter caminhos relativos:

```json
{
  "tilesets": [
    {
      "image": "tilesets/WA_Room_Builder.png"  ← Correto ✅
    }
  ]
}
```

**NÃO deve ser:**
```json
{
  "image": "/tilesets/WA_Room_Builder.png"  ← Errado ❌
  "image": "https://..."  ← Errado ❌ (a menos que seja deploy)
}
```

---

## 📊 CHECKLIST DE VERIFICAÇÃO

### **Antes de Reportar Problema:**

- [ ] Executei `npm run build` localmente
- [ ] Executei `npm run verify-deploy` e passou
- [ ] GitHub Actions completou com sucesso
- [ ] Aguardei 2-5 minutos após deploy
- [ ] Limpei cache do navegador
- [ ] Testei URLs diretamente no navegador
- [ ] Verifiquei console do navegador (F12)
- [ ] Verifiquei branch `gh-pages` no GitHub

---

## 🆘 SE NADA FUNCIONAR

### **Informações para Suporte:**

1. **URL do mapa que não funciona:**
   ```
   https://play.workadventu.re/_/global/lourealiza.github.io/wa-aronline-office/wa_map-interativo.tmj
   ```

2. **URLs que devem funcionar (teste no navegador):**
   ```
   https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
   ```

3. **Print do Console (F12):**
   - Todos os erros em vermelho
   - Mensagens de 404

4. **Status do GitHub Actions:**
   - Link do último workflow
   - Se passou ou falhou

5. **Estrutura da branch gh-pages:**
   - Screenshot de `https://github.com/lourealiza/wa-aronline-office/tree/gh-pages`

---

## 💡 DICAS IMPORTANTES

### **GitHub Pages pode levar tempo:**
- ⏱️ Primeiro deploy: 5-10 minutos
- ⏱️ Deploys subsequentes: 1-3 minutos
- ⏱️ Cache do navegador: Pode persistir por horas

### **Sempre verifique:**
1. ✅ Build local funciona (`npm run verify-deploy`)
2. ✅ GitHub Actions passou
3. ✅ URLs acessíveis publicamente
4. ✅ Cache limpo

---

## 🎯 COMANDOS RÁPIDOS

```powershell
# Verificar build local
npm run build && npm run verify-deploy

# Forçar novo deploy
git commit --allow-empty -m "chore: Deploy" && git push

# Verificar estrutura dist/
ls dist/tilesets/

# Testar URLs (substitua lourealiza)
curl -I https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
```

---

**Última atualização:** 2025-11-12  
**Versão:** 1.0

