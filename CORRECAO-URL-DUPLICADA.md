# 🔧 Correção: URL Duplicada nos Tilesets

## ❌ Problema Identificado

O erro mostrava URLs duplicadas:
```
Cannot load "https://lourealiza.github.io/wa-aronline-office/https://lourealiza.github.io/wa-aronline-office/tilesets/tileset_colors_walls.png"
```

## 🔍 Causa Raiz

O WorkAdventure **resolve URLs relativas automaticamente** baseado no baseUrl do mapa. Quando o arquivo `.tmj` tinha URLs absolutas, o WorkAdventure adicionava o baseUrl novamente, causando duplicação.

## ✅ Solução Aplicada

Modificado o script `build-gh-pages.js` para:
1. **Manter URLs relativas** nos arquivos `.tmj` do `dist/`
2. **Converter URLs absolutas para relativas** se encontradas
3. **Corrigir URLs duplicadas** automaticamente

### Antes (ERRADO):
```json
{
  "image": "https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png"
}
```

### Depois (CORRETO):
```json
{
  "image": "tilesets/WA_Room_Builder.png"
}
```

## 🔄 Como Funciona Agora

1. **Arquivo fonte** (raiz): URLs relativas ✅
   ```json
   "image": "tilesets/WA_Room_Builder.png"
   ```

2. **Build processa**: Mantém URLs relativas ✅
   ```json
   "image": "tilesets/WA_Room_Builder.png"
   ```

3. **WorkAdventure resolve**: Adiciona baseUrl automaticamente ✅
   ```
   https://lourealiza.github.io/wa-aronline-office/tilesets/WA_Room_Builder.png
   ```

## 📋 Verificação

Após o deploy, verifique:

1. **Arquivo no GitHub Pages**:
   ```
   https://lourealiza.github.io/wa-aronline-office/wa_map-ar-online-professional.tmj
   ```
   - Deve ter URLs relativas: `tilesets/WA_Room_Builder.png`

2. **No WorkAdventure**:
   ```
   https://play.workadventu.re/_/global/lourealiza.github.io/wa-aronline-office/wa_map-ar-online-professional.tmj
   ```
   - Não deve mais mostrar erro de URL duplicada
   - Tilesets devem carregar corretamente

## 🎯 Resultado Esperado

- ✅ URLs relativas no arquivo `.tmj`
- ✅ WorkAdventure resolve URLs automaticamente
- ✅ Sem duplicação de baseUrl
- ✅ Tilesets carregam corretamente

---

**Status**: ✅ Correção aplicada e commitada
**Próximo passo**: Aguardar deploy do GitHub Actions e testar

