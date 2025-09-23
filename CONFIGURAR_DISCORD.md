# 🚨 Como Configurar Alertas do Discord - PASSO A PASSO

## ⚠️ IMPORTANTE: Siga EXATAMENTE estes passos

### 1️⃣ Criar Webhook no Discord

1. **Abra o Discord** no seu navegador ou aplicativo
2. **Acesse seu servidor** (ou crie um se não tiver)
3. **Clique no nome do servidor** (canto superior esquerdo)
4. **Selecione "Configurações do Servidor"**
5. **No menu lateral, clique em "Integrações"**
6. **Clique em "Webhooks"**
7. **Clique em "Criar Webhook"**
8. **Configure:**
   - **Nome**: `GitHub Actions`
   - **Canal**: Escolha um canal (ex: #geral, #notificações)
9. **Clique em "Copiar URL do Webhook"**
10. **GUARDE esta URL** - você vai precisar dela!

### 2️⃣ Configurar Secret no GitHub

1. **Acesse seu repositório** no GitHub: `https://github.com/leonardobasei/pucpr-devops-at1`
2. **Clique na aba "Settings"** (no menu superior do repositório)
3. **No menu lateral esquerdo, clique em "Secrets and variables"**
4. **Clique em "Actions"**
5. **Clique em "New repository secret"**
6. **Configure:**
   - **Name**: `DISCORD_WEBHOOK_URL` (EXATAMENTE assim)
   - **Secret**: Cole a URL do webhook que você copiou
7. **Clique em "Add secret"**

### 3️⃣ Testar os Alertas

#### Opção A: Teste Automático
```bash
# Execute o script de teste
./test-discord.sh
```

#### Opção B: Teste Manual
1. **Vá para a aba "Actions"** no GitHub
2. **Clique em "Discord Alerts"**
3. **Clique em "Run workflow"**
4. **Selecione a branch "master"**
5. **Clique em "Run workflow"**

#### Opção C: Teste com Commit
```bash
# Commit na master (produção)
git checkout master
echo "teste master" > teste.txt
git add teste.txt
git commit -m "test: alerta master"
git push origin master

# Commit na develop (desenvolvimento)
git checkout develop
echo "teste develop" > teste.txt
git add teste.txt
git commit -m "test: alerta develop"
git push origin develop
```

### 4️⃣ Verificar se Funcionou

#### ✅ No Discord:
- Verifique o canal que você configurou
- Deve aparecer uma mensagem formatada com:
  - 🔥 Para commits na master
  - 🛠️ Para commits na develop
  - ✅ Para merges

#### ✅ No GitHub:
- Vá em Actions > Discord Alerts
- Deve aparecer um job executado
- Clique no job para ver os logs

### 5️⃣ Troubleshooting

#### ❌ "DISCORD_WEBHOOK_URL não configurado"
- Verifique se a secret foi criada com o nome EXATO: `DISCORD_WEBHOOK_URL`
- Confirme se está no repositório correto

#### ❌ Webhook não envia mensagens
- Verifique se a URL do webhook está correta
- Teste enviando uma mensagem manual:
```bash
curl -X POST "SUA_URL_DO_WEBHOOK_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"content": "Teste de webhook"}'
```

#### ❌ Mensagens não aparecem no Discord
- Verifique se o webhook não foi deletado
- Confirme se o canal está correto
- Verifique se o bot tem permissões no canal

### 6️⃣ Screenshots para Entrega

Você precisa de 3 screenshots:

1. **Screenshot do arquivo de workflow**
   - Vá em `.github/workflows/discord-alerts.yml`
   - Tire print da tela

2. **Screenshot das notificações no Discord**
   - Mostre as mensagens que apareceram no canal
   - Deve mostrar commits e/ou merges

3. **Screenshot da aba Actions do GitHub**
   - Vá em Actions > Discord Alerts
   - Mostre os jobs executados

### 7️⃣ Exemplo de Notificação

Quando funcionar, você verá no Discord:

```
🚀 COMMIT NA MASTER (PRODUÇÃO)
🔥 Commit realizado na branch de produção

📁 Repositório: leonardobasei/pucpr-devops-at1
🌿 Branch: master
👤 Autor: leonardobasei
🔗 Commit: [abc123...](link)
💬 Mensagem: test: verificar alertas do Discord funcionando
```

### 🆘 Ainda não funciona?

1. **Verifique os logs** do job no GitHub Actions
2. **Teste o webhook manualmente** com curl
3. **Confirme se a secret está configurada** corretamente
4. **Verifique se o webhook ainda está ativo** no Discord

---

## 📞 Resumo Rápido

1. **Discord**: Criar webhook → Copiar URL
2. **GitHub**: Settings → Secrets → Adicionar `DISCORD_WEBHOOK_URL`
3. **Testar**: Fazer commit ou executar workflow manualmente
4. **Verificar**: Discord deve receber notificação
