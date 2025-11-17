# 🔄 Comparação: Map Storage vs GitHub Pages

Com base no vídeo tutorial do WorkAdventure, aqui está uma comparação das duas opções de hospedagem:

## 🏆 WorkAdventure Map Storage (RECOMENDADO)

### ✅ Vantagens:
- **Mais fácil de configurar** - Recomendado pelo WorkAdventure
- **Otimização automática** - Tilesets são otimizados automaticamente
- **Compilação automática** - Scripts TypeScript são compilados automaticamente
- **Suporte a repositórios privados** - Você pode ter mapas privados
- **Hospedado nos servidores do WorkAdventure** - Infraestrutura gerenciada
- **Processo simplificado** - Apenas `npm run upload` e pronto!

### 📋 Como funciona:
1. Execute `npm run upload`
2. Informe as credenciais (apenas na primeira vez):
   - URL do Map Storage (do painel admin)
   - API Key (do painel admin)
   - Nome do diretório
3. O script faz tudo automaticamente:
   - Build do projeto
   - Otimização de tilesets
   - Compilação de scripts
   - Upload para o servidor

### 🔧 Configuração:
- Credenciais salvas em `.env` e `.env.secret`
- `.env.secret` já está no `.gitignore` (seguro)

---

## 🌐 GitHub Pages (Alternativa)

### ⚠️ Desvantagens:
- **Mais complexo** - Requer configuração de workflows
- **Otimização manual** - Você precisa gerenciar tilesets manualmente
- **Apenas repositórios públicos** - Não suporta privacidade
- **Problemas de CORS** - Pode ter problemas de acesso
- **URLs absolutas necessárias** - Requer conversão de caminhos

### 📋 Como funciona:
1. Configure o workflow `.github/workflows/static.yml`
2. Faça push para o branch `master`
3. O GitHub Actions faz build e deploy
4. Os arquivos são servidos via GitHub Pages

### 🔧 Problemas comuns:
- Tilesets não carregam (problema atual)
- URLs duplicadas
- Cache do navegador
- Problemas de CORS

---

## 💡 Recomendação

**Use WorkAdventure Map Storage!** 

É a opção recomendada pelo WorkAdventure e resolve todos os problemas que você está enfrentando com GitHub Pages:

1. ✅ Não precisa se preocupar com URLs absolutas/relativas
2. ✅ Otimização automática de tilesets
3. ✅ Processo mais simples e confiável
4. ✅ Suporte oficial do WorkAdventure

---

## 🚀 Como Migrar para Map Storage

1. **Obter credenciais**:
   - Acesse o Painel Admin do WorkAdventure
   - Menu Desenvolvedor → Chave de API
   - Copie URL do Map Storage e API Key

2. **Executar upload**:
   ```bash
   npm run upload
   ```

3. **Informar credenciais** (apenas primeira vez):
   - Cole a URL do Map Storage
   - Cole a API Key
   - Escolha um nome para o diretório

4. **Pronto!** Seu mapa estará disponível no WorkAdventure

---

## 📚 Referências

- [Vídeo Tutorial Oficial](https://www.youtube.com/watch?v=WNcbEHm2Hlg)
- [Documentação - Upload para Map Storage](https://docs.workadventu.re/map-building/tiled-editor/publish/wa-hosted)
- [Documentação - GitHub Pages](https://docs.workadventu.re/map-building/tiled-editor/publish/github-pages)

