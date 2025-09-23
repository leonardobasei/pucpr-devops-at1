# 🚨 Configuração de Alertas do Discord

Este guia explica como configurar alertas automáticos do Discord para commits e merges.

## 📋 Eventos Configurados

### ✅ Commits
- **Master (Produção)**: 🔥 Alertas vermelhos para commits na master
- **Develop (Desenvolvimento)**: 🛠️ Alertas amarelos para commits na develop

### ✅ Pull Requests
- **Abertura**: 🆕 Notificação quando PR é aberta para master
- **Merge**: ✅ Notificação quando PR é mergeada na master
- **Fechamento**: ❌ Notificação quando PR é fechada sem merge

## 🔧 Configuração Rápida

### 1. Criar Webhook no Discord

1. **Acesse seu servidor Discord**
2. **Clique no nome do servidor** → **Configurações do Servidor**
3. **Vá em Integrações** → **Webhooks**
4. **Clique em "Criar Webhook"**
5. **Configure:**
   - **Nome**: `GitHub Actions`
   - **Canal**: Escolha onde receber as notificações
6. **Copie a URL do Webhook** (mantenha segura!)

### 2. Configurar Secret no GitHub

1. **Acesse seu repositório no GitHub**
2. **Vá em Settings** (Configurações)
3. **No menu lateral: Secrets and variables** → **Actions**
4. **Clique em "New repository secret"**
5. **Configure:**
   - **Name**: `DISCORD_WEBHOOK_URL`
   - **Secret**: Cole a URL do webhook do Discord
6. **Clique em "Add secret"**

## 🧪 Testando os Alertas

### Teste 1: Commit na Develop
```bash
git checkout develop
echo "Teste de alerta develop" > test-develop.txt
git add test-develop.txt
git commit -m "test: alerta para develop"
git push origin develop
```

### Teste 2: Commit na Master
```bash
git checkout master
echo "Teste de alerta master" > test-master.txt
git add test-master.txt
git commit -m "test: alerta para master"
git push origin master
```

### Teste 3: Merge na Master
1. Crie uma branch de teste
2. Faça algumas alterações
3. Abra uma Pull Request para master
4. Faça o merge da PR

## 📱 Exemplo de Notificações

### 🔥 Commit na Master
```
🚀 Commit Realizado
🔥 Commit na branch MASTER (Produção)

📁 Repositório: seu-usuario/pucpr-devops-at1
🌿 Branch: master
👤 Autor: seu-usuario
🔗 Commit: [abc123...](link)
💬 Mensagem: feat: nova funcionalidade
```

### 🛠️ Commit na Develop
```
🚀 Commit Realizado
🛠️ Commit na branch DEVELOP (Desenvolvimento)

📁 Repositório: seu-usuario/pucpr-devops-at1
🌿 Branch: develop
👤 Autor: seu-usuario
🔗 Commit: [def456...](link)
💬 Mensagem: fix: correção de bug
```

### ✅ Merge na Master
```
🔀 MERGE REALIZADO
✅ PR foi MERGEADA na master!

📁 Repositório: seu-usuario/pucpr-devops-at1
🌿 Branch: master
👤 Autor: seu-usuario
🔗 Commit: [ghi789...](link)
🔗 Pull Request: [#123](link)
💬 Mensagem: feat: implementar nova feature
```

## 🎨 Cores das Notificações

- 🔥 **Master (Vermelho)**: Commits em produção
- 🛠️ **Develop (Amarelo)**: Commits em desenvolvimento
- 🆕 **PR Aberta (Azul)**: Nova pull request
- ✅ **Merge (Verde)**: PR mergeada com sucesso
- ❌ **PR Fechada (Cinza)**: PR fechada sem merge

## 🔍 Verificando se Funcionou

1. **No Discord**: Verifique se as mensagens aparecem no canal
2. **No GitHub**: Vá em Actions e veja se o workflow executou
3. **Logs**: Se não funcionar, verifique os logs do job

## 🛠️ Troubleshooting

### ❌ "DISCORD_WEBHOOK_URL não configurado"
- Verifique se a secret foi criada corretamente
- Confirme o nome exato: `DISCORD_WEBHOOK_URL`

### ❌ Webhook não envia mensagens
- Verifique se a URL do webhook está correta
- Confirme se o webhook ainda está ativo no Discord
- Verifique se o bot tem permissões no canal

### ❌ Mensagens não aparecem
- Verifique se o canal está correto
- Confirme se o webhook não foi deletado
- Teste enviando uma mensagem manual via curl

## 📸 Screenshots para Entrega

Para a entrega, você precisará de:

1. **Screenshot do arquivo de workflow** (discord-alerts.yml)
2. **Screenshot das notificações no Discord** após commits/merges
3. **Screenshot da aba Actions** mostrando os jobs executados

## 🚀 Próximos Passos

- Configure diferentes canais para diferentes tipos de eventos
- Adicione notificações para releases e issues
- Personalize as mensagens conforme sua necessidade
- Configure integração com Slack, Teams ou Telegram se preferir
