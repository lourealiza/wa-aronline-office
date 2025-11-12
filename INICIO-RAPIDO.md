# 🚀 INÍCIO RÁPIDO - Correção de Tilesets

## ⚡ SOLUÇÃO EM 3 COMANDOS

Você está com problemas de tilesets no WorkAdventure? **Execute estes 3 comandos:**

```bash
cd "D:\001 - WA Office\wa-aronline-office"
npm run organize-tilesets
npm run fix-tilesets
npm run dev
```

✅ **Pronto!** Abra o navegador e teste.

---

## 🎯 SE VOCÊ TEM 2 MINUTOS

### **Problema:**
- ❌ Mapas não carregam
- ❌ Tilesets não aparecem
- ❌ Erros 404 no console
- ❌ Imagens faltando

### **Solução:**

```bash
# Passo 1: Verificar o que está errado
npm run check-maps

# Passo 2: Organizar arquivos (apenas 1x)
npm run organize-tilesets

# Passo 3: Corrigir todos os mapas
npm run fix-tilesets

# Passo 4: Testar
npm run dev
```

🎉 **Feito!**

---

## 🎯 SE VOCÊ TEM 5 MINUTOS

### **Setup Completo (Primeira Vez):**

```bash
# 1. Navegar para o projeto
cd "D:\001 - WA Office\wa-aronline-office"

# 2. Instalar dependências (se ainda não fez)
npm install

# 3. Verificar situação atual
npm run check-maps

# 4. Organizar tilesets
npm run organize-tilesets

# 5. Padronizar mapas
npm run fix-tilesets

# 6. Verificar novamente
npm run check-maps

# 7. Testar localmente
npm run dev
```

**Agora abra:** `http://localhost:PORTA` (veja a porta no terminal)

---

## 🚀 FAZER DEPLOY

### **Opção Fácil (Um Comando):**

```bash
npm run deploy
git push origin main
```

✅ **Pronto!** Aguarde o GitHub Pages processar.

---

### **Opção Detalhada (Controle Total):**

```bash
# 1. Preparar
npm run prepare-deploy

# 2. Build
npm run build

# 3. Reverter (IMPORTANTE!)
npm run revert-deploy

# 4. Push
git push origin main
```

---

## 📋 CHECKLIST RÁPIDO

### **Antes de Iniciar:**

- [ ] Node.js instalado (v18+)
- [ ] NPM instalado
- [ ] Projeto baixado/clonado
- [ ] Terminal aberto na pasta do projeto

---

### **Após Correção:**

- [ ] `npm run check-maps` sem erros
- [ ] `npm run dev` funciona
- [ ] Navegador mostra o mapa
- [ ] Console (F12) sem erros 404
- [ ] Personagem aparece

---

### **Antes de Deploy:**

- [ ] Teste local funcionando
- [ ] Mapas salvos
- [ ] Git commit feito
- [ ] Backup criado (opcional)

---

## 🐛 ERROS COMUNS

### **"Cannot find module"**

```bash
# Instalar dependências
npm install
```

---

### **"404 Not Found" no navegador**

```bash
# Corrigir caminhos
npm run fix-tilesets

# Testar novamente
npm run dev
```

---

### **PowerShell não executa scripts**

```powershell
# Executar como Administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### **Mapa aparece preto/vazio**

```bash
# Verificar integridade
npm run check-maps

# Se houver problemas, corrigir
npm run fix-tilesets
```

---

## 📞 PRECISA DE MAIS AJUDA?

### **Consulte os guias completos:**

1. 📄 **DIAGNOSTICO-TILESETS.md** → Entender o problema
2. 📄 **GUIA-CORRECAO-TILESETS.md** → Soluções detalhadas
3. 📄 **README-SCRIPTS.md** → Todos os comandos explicados

### **No navegador (F12):**

1. Abra **Console**
2. Procure mensagens de erro em vermelho
3. Anote URLs que falharam (404)
4. Tire print

---

## 🎯 COMANDOS ESSENCIAIS

| Comando | Para quê? |
|---------|-----------|
| `npm run check-maps` | Ver status |
| `npm run organize-tilesets` | Organizar arquivos (1x) |
| `npm run fix-tilesets` | Corrigir caminhos |
| `npm run dev` | Testar localmente |
| `npm run deploy` | Fazer deploy |

---

## ✨ DICAS IMPORTANTES

### ✅ Faça:
- Execute `organize-tilesets` **apenas uma vez**
- Execute `check-maps` para diagnóstico
- Sempre teste com `npm run dev` antes de deploy
- Use `npm run deploy` para automatizar

### ⚠️ Atenção:
- **Não faça commit** após `prepare-deploy` sem reverter
- Sempre reverta após build de deploy
- Faça backup antes de grandes mudanças

### ❌ Não faça:
- Execute `organize-tilesets` múltiplas vezes
- Delete tilesets sem verificar
- Faça deploy sem testar localmente

---

## 📊 FLUXO VISUAL

```
┌─────────────────────┐
│  Problema detectado │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ npm run check-maps  │ ← Diagnóstico
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────┐
│ npm run organize-tilesets │ ← Organizar (1x)
└──────────┬────────────────┘
           │
           ▼
┌─────────────────────┐
│ npm run fix-tilesets │ ← Corrigir
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   npm run dev       │ ← Testar
└──────────┬──────────┘
           │
           ▼
     ┌────┴────┐
     │  OK?    │
     └─┬────┬──┘
       │    │
    Não│    │Sim
       │    │
       ▼    ▼
   Revisar Deploy
```

---

## 🎬 EXEMPLO COMPLETO

```bash
# Terminal
PS D:\> cd "001 - WA Office\wa-aronline-office"
PS D:\001 - WA Office\wa-aronline-office> npm run check-maps

🔍 Verificando integridade dos mapas...
✅ WA_Room_Builder.png - 44.1 KB
✅ tileset_colors_walls.png - 1153.0 KB
...

PS D:\001 - WA Office\wa-aronline-office> npm run organize-tilesets

📦 ORGANIZANDO TILESETS
✅ WA_Room_Builder.png movido
...

PS D:\001 - WA Office\wa-aronline-office> npm run fix-tilesets

🔧 CORREÇÃO COMPLETA DE TILESETS
✅ office.tmj atualizado
✅ conference.tmj atualizado
...

PS D:\001 - WA Office\wa-aronline-office> npm run dev

  VITE v4.5.3  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Agora abra:** http://localhost:5173/

---

## ✅ SUCESSO!

Se você vê o mapa carregando no navegador, está tudo certo! 🎉

**Próximos passos:**
1. Continue desenvolvendo normalmente
2. Edite mapas no Tiled
3. Quando pronto, faça deploy com `npm run deploy`

---

**Criado:** 2025-11-12  
**Versão:** 1.0  
**Tempo estimado:** 2-5 minutos

