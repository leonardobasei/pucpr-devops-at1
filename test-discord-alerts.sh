#!/bin/bash

# Script para testar os alertas do Discord
# Execute este script para fazer commits de teste e verificar se os alertas funcionam

echo "🚀 Testando Alertas do Discord para GitHub Actions"
echo "=================================================="

# Verificar se estamos no repositório correto
if [ ! -f ".github/workflows/discord-notifications.yml" ]; then
    echo "❌ Erro: Execute este script no diretório raiz do repositório"
    exit 1
fi

echo "📋 Workflows de Discord encontrados:"
echo "  - discord-notifications.yml (avançado)"
echo "  - simple-discord-alert.yml (simples)"
echo "  - realtime-alerts.yml (tempo real)"
echo ""

# Verificar se a secret está configurada
echo "🔍 Verificando configuração..."
if [ -z "$DISCORD_WEBHOOK_URL" ]; then
    echo "⚠️  DISCORD_WEBHOOK_URL não está configurado como variável de ambiente"
    echo "   Configure a secret no GitHub: Settings > Secrets and variables > Actions"
    echo "   Nome da secret: DISCORD_WEBHOOK_URL"
    echo ""
fi

echo "📝 Escolha o tipo de teste:"
echo "1) Commit simples no main"
echo "2) Criar Pull Request de teste"
echo "3) Fazer merge de PR de teste"
echo "4) Apenas mostrar informações"
echo ""

read -p "Digite sua escolha (1-4): " choice

case $choice in
    1)
        echo "🔄 Fazendo commit de teste no main..."
        echo "Teste de alerta do Discord - $(date)" > test-alert.txt
        git add test-alert.txt
        git commit -m "test: adicionar arquivo de teste para alertas do Discord"
        git push origin main
        echo "✅ Commit enviado! Verifique o Discord e a aba Actions do GitHub"
        ;;
    2)
        echo "🔄 Criando branch e PR de teste..."
        git checkout -b test-discord-alerts-$(date +%s)
        echo "Teste de PR para alertas do Discord - $(date)" > test-pr.txt
        git add test-pr.txt
        git commit -m "test: criar PR de teste para alertas do Discord"
        git push origin HEAD
        echo "✅ Branch criada! Agora crie uma Pull Request no GitHub:"
        echo "   https://github.com/$GITHUB_REPOSITORY/compare/$(git branch --show-current)"
        ;;
    3)
        echo "🔄 Fazendo merge de PR de teste..."
        # Assumindo que existe uma branch de teste para merge
        if git show-ref --verify --quiet refs/remotes/origin/test-discord-alerts; then
            git checkout main
            git merge origin/test-discord-alerts
            git push origin main
            echo "✅ Merge realizado! Verifique o Discord"
        else
            echo "❌ Nenhuma branch de teste encontrada. Execute a opção 2 primeiro."
        fi
        ;;
    4)
        echo "📊 Informações dos workflows:"
        echo ""
        echo "🔧 Para configurar o Discord:"
        echo "1. Acesse seu servidor Discord"
        echo "2. Vá em Configurações do Servidor > Integrações > Webhooks"
        echo "3. Crie um novo webhook e copie a URL"
        echo "4. No GitHub: Settings > Secrets and variables > Actions"
        echo "5. Adicione secret 'DISCORD_WEBHOOK_URL' com a URL do webhook"
        echo ""
        echo "📁 Workflows disponíveis:"
        echo "  - .github/workflows/discord-notifications.yml"
        echo "  - .github/workflows/simple-discord-alert.yml"
        echo "  - .github/workflows/realtime-alerts.yml"
        echo ""
        echo "🧪 Para testar manualmente:"
        echo "  - Vá para Actions no GitHub"
        echo "  - Selecione um dos workflows de Discord"
        echo "  - Clique em 'Run workflow'"
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo ""
echo "📸 Lembre-se de tirar screenshots para a entrega:"
echo "  1. Screenshot do arquivo de workflow"
echo "  2. Screenshot das notificações no Discord"
echo "  3. Screenshot da aba Actions do GitHub"
