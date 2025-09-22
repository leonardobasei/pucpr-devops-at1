# Configuração de Alertas do Discord

Este documento explica como configurar alertas do Discord para o GitHub Actions.

## 📋 Pré-requisitos

- Servidor Discord onde você tem permissões de administrador
- Acesso ao repositório GitHub com permissões para configurar secrets

## 🔧 Configuração do Discord

### 1. Criar um Webhook no Discord

1. Acesse seu servidor Discord
2. Vá para **Configurações do Servidor** (ícone de engrenagem)
3. Navegue até **Integrações** > **Webhooks**
4. Clique em **Criar Webhook**
5. Configure:
   - **Nome:** GitHub Actions (ou qualquer nome de sua preferência)
   - **Canal:** Escolha o canal onde deseja receber as notificações
6. Clique em **Copiar URL do Webhook**
7. **IMPORTANTE:** Mantenha esta URL segura e não a compartilhe publicamente

### 2. Configurar Secret no GitHub

1. Acesse seu repositório no GitHub
2. Vá para **Settings** (Configurações)
3. No menu lateral, clique em **Secrets and variables** > **Actions**
4. Clique em **New repository secret**
5. Configure:
   - **Name:** `DISCORD_WEBHOOK_URL`
   - **Secret:** Cole a URL do webhook copiada do Discord
6. Clique em **Add secret**

## 📁 Workflows Configurados

### 1. `discord-notifications.yml`
- **Funcionalidade:** Notificações avançadas com embeds formatados
- **Eventos:** Push no main, PRs, execução de workflows
- **Características:** 
  - Mensagens ricas com cores baseadas no status
  - Informações detalhadas do commit/PR
  - Timestamps e links diretos

### 2. `simple-discord-alert.yml`
- **Funcionalidade:** Notificações simples e diretas
- **Eventos:** Push no main, PRs
- **Características:**
  - Mensagem de texto simples
  - Usa action externa `Ilshidur/action-discord`
  - Mais fácil de debugar

## 🧪 Testando a Configuração

### Método 1: Commit no Main
```bash
git add .
git commit -m "test: configurar alertas do Discord"
git push origin main
```

### Método 2: Criar Pull Request
1. Crie uma nova branch
2. Faça algumas alterações
3. Abra uma Pull Request para main
4. Merge a PR

### Método 3: Executar Workflow Manualmente
1. Vá para a aba **Actions** no GitHub
2. Selecione o workflow **Discord Notifications**
3. Clique em **Run workflow**

## 🔍 Verificando se Funcionou

1. **No Discord:** Verifique se as mensagens aparecem no canal configurado
2. **No GitHub Actions:** Vá para a aba Actions e verifique se os jobs executaram com sucesso
3. **Logs:** Se não funcionar, verifique os logs do job para identificar erros

## 🛠️ Troubleshooting

### Problema: "DISCORD_WEBHOOK_URL não configurado"
**Solução:** Verifique se a secret foi criada corretamente no GitHub

### Problema: Webhook não envia mensagens
**Soluções:**
1. Verifique se a URL do webhook está correta
2. Confirme se o webhook ainda está ativo no Discord
3. Verifique se o bot tem permissões para enviar mensagens no canal

### Problema: Mensagens não formatadas
**Solução:** Use o workflow `discord-notifications.yml` que tem formatação avançada

## 📸 Screenshots Necessários

Para a entrega, você precisará de:

1. **Screenshot do arquivo de workflow** mostrando as configurações
2. **Screenshot das notificações no Discord** após commits/merges
3. **Screenshot da aba Actions do GitHub** mostrando os jobs executados

## 🎯 Próximos Passos

- Configure notificações para outros eventos (releases, issues, etc.)
- Personalize as mensagens conforme sua necessidade
- Configure diferentes canais para diferentes tipos de eventos
- Adicione integração com Slack, Teams ou Telegram se preferir
