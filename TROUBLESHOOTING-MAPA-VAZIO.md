# 🔧 Troubleshooting: Mapa Aparece Vazio

## ✅ O que está funcionando:

1. ✅ URLs relativas corretas no `dist/`
2. ✅ Tilesets existem em `dist/tilesets/`
3. ✅ Camadas configuradas corretamente
4. ✅ Ponto de spawn válido
5. ✅ Opacidade das camadas corrigida

## 🔍 Diagnóstico Passo a Passo:

### 1. Verificar se o Deploy foi Concluído

Acesse: `https://github.com/lourealiza/wa-aronline-office/actions`

**Verifique:**
- ✅ Último workflow tem status verde (✓)
- ✅ Build completou sem erros
- ✅ Deploy para GitHub Pages completou
- ⏱️ Aguarde 2-5 minutos após o commit

### 2. Verificar Arquivo no GitHub Pages

Acesse diretamente:
```
https://lourealiza.github.io/wa-aronline-office/wa_map-ar-online-professional.tmj
```

**Verifique:**
- ✅ Arquivo carrega (não 404)
- ✅ URLs dos tilesets são relativas: `tilesets/WA_Room_Builder.png`
- ❌ NÃO devem ser absolutas: `https://lourealiza.github.io/...`

**Como verificar:**
1. Abra o arquivo `.tmj` no navegador
2. Procure por `"image":`
3. Deve ver: `"image": "tilesets/WA_Room_Builder.png"`
4. NÃO deve ver: `"image": "https://lourealiza.github.io/..."`

### 3. Limpar Cache do Navegador

**Chrome/Edge:**
1. Pressione `Ctrl + Shift + Delete`
2. Selecione "Imagens e arquivos em cache"
3. Período: "Última hora" ou "Todo o período"
4. Clique em "Limpar dados"

**Ou use Modo Anônimo:**
- `Ctrl + Shift + N` (Chrome)
- `Ctrl + Shift + P` (Edge)
- Teste a URL novamente

### 4. Verificar Console do Navegador

1. Abra o mapa no WorkAdventure
2. Pressione `F12` → Aba **Console**
3. Procure por erros:

**Erros comuns:**
```
❌ Failed to load resource: tilesets/WA_Room_Builder.png
❌ 404 Not Found
❌ CORS policy error
❌ Cannot load "https://.../https://..." (URL duplicada)
```

### 5. Verificar Network Tab

1. Abra o DevTools (`F12`)
2. Vá em **Network**
3. Recarregue a página (`Ctrl + R`)
4. Filtre por `.png` ou `.tmj`

**Verifique:**
- ✅ Arquivo `.tmj` retorna `200 OK`
- ✅ Arquivos `.png` dos tilesets retornam `200 OK`
- ❌ Não deve haver `404 Not Found`
- ❌ Não deve haver URLs duplicadas

### 6. Verificar URLs dos Tilesets

No Network tab, clique em um arquivo `.png` e verifique a URL:

**CORRETO:**
```
https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
```

**ERRADO (duplicado):**
```
https://lourealiza.github.io/wa-aronline-office/https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
```

## 🔧 Soluções:

### Solução 1: Forçar Novo Deploy

Se o deploy não foi concluído:

```bash
git commit --allow-empty -m "chore: Forçar novo deploy"
git push origin master
```

Aguarde 2-5 minutos e teste novamente.

### Solução 2: Verificar Arquivo no GitHub

1. Acesse: `https://github.com/lourealiza/wa-aronline-office/tree/master/dist`
2. Verifique se o arquivo `wa_map-ar-online-professional.tmj` existe
3. Clique nele e verifique se as URLs são relativas

### Solução 3: Testar Localmente

```bash
npm run build
npm run prod
```

Acesse `http://localhost:4173` e verifique se o mapa aparece corretamente.

### Solução 4: Verificar Ordem das Camadas

O mapa deve ter as camadas nesta ordem:
1. `floor` (fundo)
2. `walls` (paredes)
3. `rooms` (decoração)
4. `start` (spawn)
5. `zones` (zonas especiais)

Execute:
```bash
node verificar-ordem-camadas.js
```

### Solução 5: Verificar Tiles Personalizados

Se você personalizou o mapa mas não aparece:

1. Abra o arquivo `.tmj` no Tiled
2. Verifique se as alterações foram salvas
3. Verifique se os tiles personalizados estão realmente no tileset PNG
4. Faça commit e push novamente

## 🎯 Checklist Final:

- [ ] Deploy do GitHub Actions completou com sucesso
- [ ] Arquivo `.tmj` no GitHub Pages tem URLs relativas
- [ ] Cache do navegador foi limpo
- [ ] Console do navegador não mostra erros
- [ ] Network tab mostra tilesets carregando (200 OK)
- [ ] URLs dos tilesets não estão duplicadas
- [ ] Testei em modo anônimo

## 💡 Dica Importante:

Se após todas essas verificações o mapa ainda estiver vazio, pode ser que:

1. **Os tiles personalizados não estão no arquivo PNG do tileset**
   - Abra `tilesets/WA_Room_Builder.png` em um editor de imagens
   - Verifique se os tiles que você criou estão realmente lá

2. **O mapa precisa ser re-editado no Tiled**
   - Abra o arquivo `.tmj` no Tiled
   - Verifique se as camadas estão visíveis
   - Salve novamente
   - Faça commit e push

3. **WorkAdventure precisa de tempo para atualizar**
   - Aguarde alguns minutos
   - Tente novamente

---

**Última atualização**: Após correção de URLs duplicadas

