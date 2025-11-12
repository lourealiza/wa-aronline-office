WA.onInit().then(()=>{WA.chat.sendChatMessage("Bem-vindo ao AR Online Virtual Office! Digite /menu para ver as opções disponíveis.","AR Online Virtual Office Bot"),WA.chat.onChatMessage(a=>{const e=a.text.toLowerCase();if(e==="/menu"||e==="/help")A();else if(e==="/status")o();else if(e==="/team")t();else if(e==="/projects")r();else if(e==="/meeting")i();else if(e.startsWith("/call ")){const s=e.split(" ")[1];c(s)}else e==="/weather"?d():e==="/news"?m():e==="/info"?p():e==="/integrations"&&h()});function A(){WA.chat.sendChatMessage(`🏢 MENU PRINCIPAL - AR Online Virtual Office
📊 COMANDOS DE INFORMAÇÃO:
/status - Status da empresa
/team - Informações da equipe
/projects - Projetos ativos
/meeting - Salas de reunião
/news - Notícias da empresa
/weather - Clima atual
/info - Informações da AR Online
/integrations - Status das integrações

📞 COMANDOS DE COMUNICAÇÃO:
/call [pessoa] - Chamar alguém
Pessoas: lou, milena, caroline, dev, marketing

🔨 CONSTRUÇÃO:
Use o menu "Mapa" → "Editor de mapa" para construir
Navegue pelas salas para ver informações específicas`,"Sistema")}function p(){WA.chat.sendChatMessage(`🏢 AR ONLINE - Informações da Empresa
📍 Localização: São Paulo, SP
🎯 Missão: Transformar comunicação empresarial
💼 Serviços: AR-Email, AR-SMS, AR-WhatsApp, AR-Voz
🤖 Produto principal: ARIA (Chatbot inteligente)
📈 Fundada em: 2020
👥 Equipe: 25+ profissionais
🌐 Site: www.ar-online.com.br

🔗 INTEGRAÇÕES DISPONÍVEIS:
📄 Google Docs - Documentos colaborativos
💾 Google Drive - Compartilhamento de arquivos
🎨 Excalidraw - Desenho colaborativo
💡 Para habilitar: Configure OAuth2 no servidor`,"Sistema Info")}function h(){WA.chat.sendChatMessage(`🔗 INTEGRAÇÕES WORKADVENTURE - AR Online

📄 GOOGLE DOCS:
• Status: Desabilitada (requer configuração OAuth2)
• Uso: Documentos colaborativos em tempo real
• Configuração: Servidor + credenciais Google

💾 GOOGLE DRIVE:
• Status: Desabilitada (requer configuração OAuth2)
• Uso: Compartilhamento de arquivos
• Configuração: Servidor + credenciais Google

🎨 EXCALIDRAW:
• Status: Desabilitada (requer servidor)
• Uso: Desenho colaborativo e brainstorming
• Configuração: Backend + banco de dados

🧹 BORRACHA (ERASER):
• Status: Desabilitada (requer servidor)
• Uso: Desenho colaborativo
• Configuração: Servidor de desenho

📋 CARDS:
• Status: Desabilitada (requer banco de dados)
• Uso: Sistema Kanban colaborativo
• Configuração: Banco de dados + servidor

💡 Para habilitar integrações, configure um servidor WorkAdventure completo.`,"Sistema Integrações")}WA.chat.onChatMessage(a=>{const e=a.text.toLowerCase();if(e==="/status")o();else if(e==="/team")t();else if(e==="/projects")r();else if(e==="/meeting")i();else if(e.startsWith("/call ")){const s=e.split(" ")[1];c(s)}else e==="/weather"?d():e==="/news"&&m()});function o(){WA.chat.sendChatMessage(`📊 STATUS DA EMPRESA - AR Online
🟢 Sistema: Online
👥 Funcionários: 25 conectados
💼 Projetos ativos: 8
🎯 Metas do mês: 85% atingidas
📈 Crescimento: +15% este trimestre`,"Sistema Status")}function t(){WA.chat.sendChatMessage(`👥 EQUIPE AR ONLINE
💻 Desenvolvimento: 8 pessoas
🎨 Design: 3 pessoas
📈 Marketing: 4 pessoas
💼 Vendas: 5 pessoas
🎧 Suporte: 3 pessoas
👥 RH: 2 pessoas`,"Sistema Equipe")}function r(){WA.chat.sendChatMessage(`📋 PROJETOS ATIVOS
🤖 ARIA: Chatbot inteligente - 90%
🔗 Integrações: APIs externas - 75%
📱 App Mobile: Nova versão - 60%
☁️ Migração Cloud: Infraestrutura - 40%
🎯 CRM: Atualização sistema - 85%`,"Sistema Projetos")}function i(){WA.chat.sendChatMessage(`🏢 SALAS DE REUNIÃO
📅 Sala A: Disponível (8 pessoas)
📅 Sala B: Disponível (6 pessoas)
🎭 Auditório: Disponível (50 pessoas)
🎓 Treinamento: Disponível (20 pessoas)
💡 Dica: Use /meeting [sala] para reservar`,"Sistema Reuniões")}function c(a){const s={lou:"Lou - Desenvolvedor Principal",milena:"Milena - Gestão de Projetos",caroline:"Caroline - RH",dev:"Equipe de Desenvolvimento",marketing:"Equipe de Marketing"}[a.toLowerCase()];s?WA.chat.sendChatMessage(`📞 Chamando ${s}...
🔔 Notificação enviada!
⏰ Aguardando resposta...`,"Sistema Chamadas"):WA.chat.sendChatMessage("Pessoa não encontrada. Use: lou, milena, caroline, dev, marketing","Sistema Chamadas")}function d(){WA.chat.sendChatMessage(`🌤️ CLIMA ATUAL
📍 São Paulo, SP
🌡️ Temperatura: 24°C
☁️ Condição: Parcialmente nublado
💨 Vento: 12 km/h
🌧️ Chuva: 20% de chance`,"Sistema Clima")}function m(){WA.chat.sendChatMessage(`📰 NOTÍCIAS DA EMPRESA
🎉 Nova contratação na área de Marketing
📈 Crescimento de 15% nas vendas
🏆 Prêmio de melhor atendimento
🚀 Lançamento do ARIA 2.0
💼 Parceria com nova empresa`,"Sistema Notícias")}let n={explorer:!1,social:!1,builder:!1,meeting:!1},u=new Set;WA.room.onEnterLayer("*").subscribe(a=>{u.add(a),u.size>=5&&!n.explorer&&(n.explorer=!0,WA.chat.sendChatMessage(`🏆 CONQUISTA DESBLOQUEADA!
🌟 Explorador: Visitei 5 salas diferentes
🎁 Recompensa: Acesso a área VIP`,"Sistema Conquistas"))});let l=0;WA.chat.onChatMessage(a=>{a.text.toLowerCase().startsWith("/tool ")&&(l++,l>=3&&!n.builder&&(n.builder=!0,WA.chat.sendChatMessage(`🏆 CONQUISTA DESBLOQUEADA!
🔨 Construtor: Usei 3 ferramentas diferentes
🎁 Recompensa: Ferramentas premium`,"Sistema Conquistas")))}),WA.room.onEnterLayer("Lobby Central").subscribe(()=>{WA.chat.sendChatMessage(`🏢 Bem-vindo ao Lobby Central da AR Online!
📍 Área Central - Circulação principal
🎯 Acesso a todos os setores da empresa
💡 Digite /menu para ver comandos disponíveis
🚶 Navegue pelos corredores para acessar outras áreas
🎪 Eventos e reuniões acontecem aqui!`,"Recepção AR Online")}),WA.room.onEnterLayer("Gestão & CEO").subscribe(()=>{WA.chat.sendChatMessage(`👔 Área de Gestão & CEO
🏢 CEO, Projetos, RH, Processos/Inovação
📊 Gestão estratégica e administrativa
💼 Decisões executivas e planejamento
🎯 Subdivisões serão implementadas em breve`,"Sistema Gestão")}),WA.room.onEnterLayer("Operações").subscribe(()=>{WA.chat.sendChatMessage(`⚙️ Área de Operações
💼 Comercial (4 salas), Marketing, Devs, Suporte
🚀 Execução de projetos e atendimento
📈 Operações comerciais e técnicas
🎯 Subdivisões serão implementadas em breve`,"Sistema Operações")}),WA.room.onEnterLayer("Convivência & Eventos").subscribe(()=>{WA.chat.sendChatMessage(`🌿 Área de Convivência & Eventos
🎭 Auditório, Jardim Virtual, Lounge/Copa
☕ Espaço para relaxamento e eventos
🎉 Celebrações e treinamentos
🎯 Subdivisões serão implementadas em breve`,"Sistema Convivência")}),WA.room.onEnterLayer("Espinha Central").subscribe(()=>{WA.chat.sendChatMessage(`🚶 Corredor Principal - Espinha Central
↕️ Conecta Convivência ↔ Lobby ↔ Alas
📍 Navegação principal do escritório`,"Sistema Navegação")}),WA.room.onEnterLayer("Conector Superior").subscribe(()=>{WA.chat.sendChatMessage(`🔗 Conector Superior
↕️ Liga Convivência ↔ Lobby
📍 Acesso à área de eventos`,"Sistema Navegação")}),WA.room.onEnterLayer("Conector Esquerdo").subscribe(()=>{WA.chat.sendChatMessage(`🔗 Conector Esquerdo
↔️ Liga Lobby ↔ Gestão & CEO
📍 Acesso à área administrativa`,"Sistema Navegação")}),WA.room.onEnterLayer("Conector Direito").subscribe(()=>{WA.chat.sendChatMessage(`🔗 Conector Direito
↔️ Liga Lobby ↔ Operações
📍 Acesso à área operacional`,"Sistema Navegação")}),WA.room.onEnterLayer("Desenvolvimento").subscribe(()=>{WA.chat.sendChatMessage(`💻 Área de Desenvolvimento - Equipe de Programação
🔧 Ferramentas: GitHub, Bitbucket, VS Code
📋 Projetos ativos: ARIA, Integrações, Automações
👥 Equipe: Desenvolvedores Full-Stack`,"Sistema Dev");try{WA.ui.openCoWebSite("https://github.com/lourealiza")}catch{console.log("GitHub link não disponível")}}),WA.room.onEnterLayer("QA").subscribe(()=>{WA.chat.sendChatMessage(`🧪 Área de QA - Testes e Garantia de Qualidade
🔍 Testes automatizados e manuais
📊 Relatórios de bugs e performance
✅ Validação de funcionalidades`,"Sistema QA")}),WA.room.onEnterLayer("DevOps").subscribe(()=>{WA.chat.sendChatMessage(`⚙️ Área de DevOps - Infraestrutura e Deploy
🚀 CI/CD automatizado
☁️ Gerenciamento de servidores
📈 Monitoramento e logs`,"Sistema DevOps")}),WA.room.onEnterLayer("Marketing").subscribe(()=>{WA.chat.sendChatMessage(`📈 Área de Marketing - Campanhas Digitais
🎯 Google Ads, Facebook Ads
📱 Redes sociais e conteúdo
📊 Analytics e métricas`,"Sistema Marketing");try{WA.ui.openCoWebSite("https://ads.google.com")}catch{console.log("Google Ads link não disponível")}}),WA.room.onEnterLayer("Design").subscribe(()=>{WA.chat.sendChatMessage(`🎨 Área de Design - Criação Visual
🖼️ Identidade visual da AR Online
📐 Protótipos e wireframes
🎭 Materiais de marketing`,"Sistema Design")}),WA.room.onEnterLayer("RH").subscribe(()=>{WA.chat.sendChatMessage(`👥 Área de RH - Recursos Humanos
📋 Recrutamento e seleção
🎓 Treinamentos e desenvolvimento
💼 Políticas e benefícios`,"Sistema RH")}),WA.room.onEnterLayer("Financeiro").subscribe(()=>{WA.chat.sendChatMessage(`💰 Área Financeira - Controle Financeiro
📊 Relatórios e análises
💳 Contas a pagar e receber
📈 Planejamento orçamentário`,"Sistema Financeiro")}),WA.room.onEnterLayer("Vendas").subscribe(()=>{WA.chat.sendChatMessage(`💼 Área de Vendas - Estratégias Comerciais
🎯 CRM Vtiger
📞 Prospecção e follow-up
📈 Metas e resultados`,"Sistema Vendas");try{WA.ui.openCoWebSite("https://vtiger.com")}catch{console.log("Vtiger link não disponível")}}),WA.room.onEnterLayer("Suporte").subscribe(()=>{WA.chat.sendChatMessage(`🎧 Área de Suporte - Atendimento ao Cliente
🎫 Sistema de tickets
📞 Suporte técnico
⏱️ SLAs e métricas`,"Sistema Suporte");try{WA.ui.openCoWebSite("https://zendesk.com")}catch{console.log("Zendesk link não disponível")}}),WA.room.onEnterLayer("Sala de Reunião A").subscribe(()=>{WA.chat.sendChatMessage(`🏢 Sala de Reunião A - Disponível para reuniões
📅 Capacidade: 8 pessoas
🖥️ Equipamentos: Projetor, TV
☕ Serviços: Café e água`,"Sistema Reuniões")}),WA.room.onEnterLayer("Sala de Reunião B").subscribe(()=>{WA.chat.sendChatMessage(`🏢 Sala de Reunião B - Disponível para reuniões
📅 Capacidade: 6 pessoas
🖥️ Equipamentos: TV, quadro branco
☕ Serviços: Café e água`,"Sistema Reuniões")}),WA.room.onEnterLayer("Auditório").subscribe(()=>{WA.chat.sendChatMessage(`🎭 Auditório - Eventos e Apresentações
👥 Capacidade: 50 pessoas
🎤 Equipamentos: Microfone, projetor
📺 Streaming disponível`,"Sistema Eventos")}),WA.room.onEnterLayer("Treinamento").subscribe(()=>{WA.chat.sendChatMessage(`🎓 Sala de Treinamento - Capacitação da Equipe
👥 Capacidade: 20 pessoas
💻 Computadores disponíveis
📚 Material didático`,"Sistema Treinamento")}),WA.room.onEnterLayer("Café").subscribe(()=>{WA.chat.sendChatMessage(`☕ Área de Café - Pausa para relaxar
🍰 Lanches e bebidas disponíveis
💬 Espaço para conversas informais
🎮 Jogos e entretenimento`,"Sistema Café")}),WA.room.onEnterLayer("Impressão").subscribe(()=>{WA.chat.sendChatMessage(`🖨️ Área de Impressão - Documentos e cópias
📄 Impressoras disponíveis
📋 Papel e suprimentos
🔧 Suporte técnico`,"Sistema Impressão")}),WA.room.onEnterLayer("Arquivo").subscribe(()=>{WA.chat.sendChatMessage(`📁 Área de Arquivo - Documentos e armazenamento
🗂️ Organização de documentos
🔒 Acesso controlado
📋 Inventário atualizado`,"Sistema Arquivo")}),WA.room.onEnterLayer("Telão Tecnológico").subscribe(()=>{WA.chat.sendChatMessage("Assista aos nossos vídeos institucionais ou confira os dashboards!","AR Online Bot")}),WA.room.onEnterLayer("Balcão Atendimento").subscribe(()=>{WA.chat.sendChatMessage("Bem-vindo ao balcão de atendimento! Como posso ajudá-lo hoje?","AR Online Bot")}),WA.room.onEnterLayer("Desenvolvimento").subscribe(()=>{WA.chat.sendChatMessage("Área de Desenvolvimento - Equipe de programação e desenvolvimento de software.","Sistema")}),WA.room.onEnterLayer("QA").subscribe(()=>{WA.chat.sendChatMessage("Área de QA - Testes e garantia de qualidade dos produtos.","Sistema")}),WA.room.onEnterLayer("DevOps").subscribe(()=>{WA.chat.sendChatMessage("Área de DevOps - Infraestrutura e deploy automatizado.","Sistema")}),WA.room.onEnterLayer("Marketing").subscribe(()=>{WA.chat.sendChatMessage("Área de Marketing - Campanhas e estratégias de marketing digital.","Sistema")}),WA.room.onEnterLayer("Design").subscribe(()=>{WA.chat.sendChatMessage("Área de Design - Criação visual e experiência do usuário.","Sistema")}),WA.room.onEnterLayer("RH").subscribe(()=>{WA.chat.sendChatMessage("Recursos Humanos - Gestão de pessoas e processos internos.","Sistema")}),WA.room.onEnterLayer("Financeiro").subscribe(()=>{WA.chat.sendChatMessage("Área Financeira - Controle financeiro e planejamento orçamentário.","Sistema")}),WA.room.onEnterLayer("Vendas").subscribe(()=>{WA.chat.sendChatMessage("Área de Vendas - Estratégias comerciais e relacionamento com clientes.","Sistema")}),WA.room.onEnterLayer("Suporte").subscribe(()=>{WA.chat.sendChatMessage("Área de Suporte - Atendimento ao cliente e suporte técnico.","Sistema")}),WA.room.onEnterLayer("Sala de Reunião A").subscribe(()=>{WA.chat.sendChatMessage("Sala de Reunião A - Disponível para reuniões da equipe.","Sistema")}),WA.room.onEnterLayer("Sala de Reunião B").subscribe(()=>{WA.chat.sendChatMessage("Sala de Reunião B - Disponível para reuniões da equipe.","Sistema")}),WA.room.onEnterLayer("Auditório").subscribe(()=>{WA.chat.sendChatMessage("Auditório - Espaço para apresentações e eventos corporativos.","Sistema")}),WA.room.onEnterLayer("Treinamento").subscribe(()=>{WA.chat.sendChatMessage("Sala de Treinamento - Capacitação e desenvolvimento da equipe.","Sistema")}),WA.room.onEnterLayer("Diretoria_Private_Zone").subscribe(()=>{WA.chat.sendChatMessage("Zona Privada - Acesso restrito à diretoria.","Sistema")}),WA.room.onEnterLayer("CEO").subscribe(()=>{WA.chat.sendChatMessage(`👑 Gabinete do CEO - Louisa Realiza
🎯 Decisões estratégicas e visão da empresa
📈 Crescimento e expansão da AR Online
🤝 Reuniões executivas e planejamento
💼 Agendamentos: contato@ar-online.com.br`,"Sistema CEO")}),WA.room.onEnterLayer("RH").subscribe(()=>{WA.chat.sendChatMessage(`👥 Recursos Humanos - Caroline
📋 Gestão de pessoas e cultura organizacional
🎓 Treinamentos e desenvolvimento
📊 Avaliações e feedback
💼 Vagas abertas: rh@ar-online.com.br`,"Sistema RH")}),WA.room.onEnterLayer("Marketing").subscribe(()=>{WA.chat.sendChatMessage(`📢 Área de Marketing - Milena
🎯 Estratégias de mercado e branding
📱 Redes sociais e conteúdo digital
📊 Campanhas e métricas de performance
🚀 Lançamentos e eventos da empresa`,"Sistema Marketing")}),WA.room.onEnterLayer("QA").subscribe(()=>{WA.chat.sendChatMessage(`🔍 Área de QA - Qualidade e Testes
✅ Garantia de qualidade dos produtos
🧪 Testes automatizados e manuais
🐛 Relatórios de bugs e correções
📋 Documentação técnica e processos`,"Sistema QA")}),WA.room.onEnterLayer("Auditório").subscribe(()=>{WA.chat.sendChatMessage(`🎭 Auditório - Eventos e Apresentações
📺 Capacidade: 50 pessoas
🎤 Apresentações e treinamentos
📅 Próximo evento: Reunião Geral (Sexta 15h)
💡 Equipamentos: Projetor, Som, Wi-Fi`,"Sistema Auditório")}),WA.room.onEnterLayer("Café").subscribe(()=>{WA.chat.sendChatMessage(`☕ Café - Área de Convivência
🍵 Café, chá e lanches disponíveis
💬 Espaço para conversas informais
🎮 Jogos e entretenimento
🌱 Plantas e ambiente relaxante`,"Sistema Café")}),WA.room.onEnterLayer("Impressão").subscribe(()=>{WA.chat.sendChatMessage(`🖨️ Centro de Impressão
📄 Impressoras coloridas e P&B
📋 Documentos corporativos
📊 Relatórios e apresentações
💡 Suporte técnico disponível`,"Sistema Impressão")}),WA.room.onEnterLayer("Arquivo").subscribe(()=>{WA.chat.sendChatMessage(`📁 Arquivo - Documentação
📚 Documentos históricos da empresa
📋 Contratos e acordos
📊 Relatórios e análises
🔍 Sistema de busca digital`,"Sistema Arquivo")})});
//# sourceMappingURL=mapScript-bcab175d.js.map
