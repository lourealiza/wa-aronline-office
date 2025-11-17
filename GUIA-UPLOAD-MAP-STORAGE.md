# 🚀 Guia de Upload para WorkAdventure Map Storage

Este guia explica como fazer upload do seu mapa para o **WorkAdventure Map Storage**, que é a **opção recomendada** pelo WorkAdventure.

## 📋 Por que usar Map Storage?

- ✅ **Mais fácil de configurar** (recomendado pelo WorkAdventure)
- ✅ **Otimização automática** de tilesets
- ✅ **Compilação automática** de scripts TypeScript
- ✅ **Suporte a repositórios privados**
- ✅ **Hospedado nos servidores do WorkAdventure**

## 🔧 Configuração Inicial

### Passo 1: Obter Credenciais do Painel Admin

1. Acesse o **Painel de Administração** do seu WorkAdventure
2. Vá em **Menu de Desenvolvedor** → **Chave de API**
3. Selecione seu **mundo** (world)
4. Copie as seguintes informações:
   - **URL do Map Storage** (endpoint da API de armazenamento de mapas)
   - **Token de API** (API Key)

### Passo 2: Executar Upload pela Primeira Vez

Execute o comando no terminal:

```bash
npm run upload
```

O script irá fazer as seguintes perguntas:

1. **URL do Map Storage**: Cole a URL que você copiou do painel admin
2. **Chave de API**: Cole o token de API que você copiou
3. **Nome do Diretório**: Escolha um nome para onde seus arquivos serão armazenados (ex: "Mapas de teste", "wa-aronline-office")

### Passo 3: Verificar Arquivos Criados

Após executar o upload pela primeira vez, serão criados dois arquivos:

- **`.env`**: Contém `MAP_STORAGE_URL` e `UPLOAD_DIRECTORY` (pode ser commitado)
- **`.env.secret`**: Contém `MAP_STORAGE_API_KEY` (NÃO deve ser commitado - já está no `.gitignore`)

## 📝 Como Funciona o Processo

Quando você executa `npm run upload`, o script:

1. **Fase de Build**:
   - Constrói seus arquivos de mapa
   - **Otimiza os tilesets**: Remove tiles não utilizados e reduz o tamanho
   - **Compila scripts**: Traduz TypeScript para JavaScript e agrupa em um único arquivo
   - Resultado: Tempo de carregamento mais rápido e mapa menor

2. **Fase de Upload**:
   - O conteúdo do diretório `dist/` é enviado para o Map Storage
   - Os arquivos são armazenados no diretório que você especificou

## 🔄 Uploads Subsequentes

Após a primeira execução, as credenciais já estarão salvas. Você pode simplesmente executar:

```bash
npm run upload
```

O script não pedirá as credenciais novamente, apenas fará o build e upload das alterações.

## 🎯 Comandos Disponíveis

- **`npm run upload`**: Faz build completo + upload
- **`npm run upload-only`**: Apenas upload (assume que o build já foi feito)
- **`npm run build`**: Apenas build (sem upload)

## ⚙️ Configuração para CI/CD (GitHub Actions)

Se você quiser fazer upload automático via GitHub Actions:

1. Vá em **Settings** → **Secrets and variables** → **Actions** no seu repositório GitHub
2. Adicione os seguintes secrets:
   - `MAP_STORAGE_API_KEY`: Sua chave de API
   - `MAP_STORAGE_URL`: URL do Map Storage (opcional, pode estar no `.env`)
   - `UPLOAD_DIRECTORY`: Nome do diretório (opcional, pode estar no `.env`)

3. O workflow `.github/workflows/build-and-deploy.yml` já está configurado para usar Map Storage quando `UPLOAD_MODE=MAP_STORAGE` no `.env`

## 🔍 Verificação

Após o upload bem-sucedido:

1. Acesse seu mundo no WorkAdventure
2. Verifique se os novos mapas aparecem na lista
3. Teste abrindo um mapa para confirmar que está funcionando

## 📚 Documentação Oficial

- [Documentação do WorkAdventure - Upload para Map Storage](https://docs.workadventu.re/map-building/tiled-editor/publish/wa-hosted)
- [Vídeo Tutorial](https://www.youtube.com/watch?v=WNcbEHm2Hlg)

## ⚠️ Troubleshooting

### Erro: "MAP_STORAGE_URL is not set"
- Verifique se o arquivo `.env` existe e contém `MAP_STORAGE_URL=...`
- Ou configure via GitHub Secrets se estiver usando CI/CD

### Erro: "MAP_STORAGE_API_KEY is not set"
- Verifique se o arquivo `.env.secret` existe e contém `MAP_STORAGE_API_KEY=...`
- Ou configure via GitHub Secrets se estiver usando CI/CD

### Mapa não aparece após upload
- Verifique se o nome do diretório está correto
- Confirme que o build foi concluído sem erros
- Verifique os logs do upload para erros específicos

## 🆚 Comparação: Map Storage vs GitHub Pages

| Recurso | Map Storage | GitHub Pages |
|---------|-------------|--------------|
| Facilidade | ⭐⭐⭐⭐⭐ Muito fácil | ⭐⭐⭐ Moderada |
| Otimização | ✅ Automática | ⚠️ Manual |
| Privacidade | ✅ Suporta privado | ❌ Público apenas |
| Configuração | ✅ Simples | ⚠️ Requer workflow |
| Recomendação | ✅ **Recomendado** | ⚠️ Alternativa |

---

**💡 Dica**: Se você está tendo problemas com GitHub Pages, considere migrar para Map Storage - é mais fácil e recomendado pelo WorkAdventure!

