#!/bin/bash

echo "🚀 Testando Alertas do Discord"
echo "=============================="

# Verificar se estamos no repositório correto
if [ ! -f ".github/workflows/discord-alerts.yml" ]; then
    echo "❌ Erro: Execute este script no diretório raiz do repositório"
    exit 1
fi

echo "📋 Workflow encontrado: discord-alerts.yml"
echo ""

# Verificar configuração
echo "🔍 Verificando configuração..."
if [ -z "$DISCORD_WEBHOOK_URL" ]; then
    echo "⚠️  DISCORD_WEBHOOK_URL não está configurado como variável de ambiente"
    echo "   Configure a secret no GitHub: Settings > Secrets and variables > Actions"
    echo "   Nome da secret: DISCORD_WEBHOOK_URL"
    echo ""
fi

echo "📝 Escolha o tipo de teste:"
echo "1) Commit na develop"
echo "2) Commit na master"
echo "3) Criar Pull Request de teste"
echo "4) Mostrar informações de configuração"
echo ""

read -p "Digite sua escolha (1-4): " choice

case $choice in
    1)
        echo "🔄 Fazendo commit de teste na develop..."
        git checkout develop
        echo "Teste de alerta develop - $(date)" > test-develop.txt
        git add test-develop.txt
        git commit -m "test: alerta para develop - $(date)"
        git push origin develop
        echo "✅ Commit enviado! Verifique o Discord e a aba Actions do GitHub"
        ;;
    2)
        echo "🔄 Fazendo commit de teste na master..."
        git checkout master
        echo "Teste de alerta master - $(date)" > test-master.txt
        git add test-master.txt
        git commit -m "test: alerta para master - $(date)"
        git push origin master
        echo "✅ Commit enviado! Verifique o Discord e a aba Actions do GitHub"
        ;;
    3)
        echo "🔄 Criando branch e PR de teste..."
        git checkout -b test-discord-$(date +%s)
        echo "Teste de PR para alertas do Discord - $(date)" > test-pr.txt
        git add test-pr.txt
        git commit -m "test: criar PR de teste para alertas do Discord"
        git push origin HEAD
        echo "✅ Branch criada! Agora crie uma Pull Request no GitHub:"
        echo "   https://github.com/$GITHUB_REPOSITORY/compare/$(git branch --show-current)"
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
        echo "📁 Workflow disponível:"
        echo "  - .github/workflows/discord-alerts.yml"
        echo ""
        echo "🧪 Para testar manualmente:"
        echo "  - Vá para Actions no GitHub"
        echo "  - Selecione 'Discord Alerts'"
        echo "  - Clique em 'Run workflow'"
        echo ""
        echo "📸 Screenshots necessários para entrega:"
        echo "  1. Screenshot do arquivo discord-alerts.yml"
        echo "  2. Screenshot das notificações no Discord"
        echo "  3. Screenshot da aba Actions do GitHub"
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo ""
echo "🔍 Verifique:"
echo "  - Discord: Canal configurado no webhook"
echo "  - GitHub: Aba Actions > Discord Alerts"
echo "  - Logs: Se não funcionar, verifique os logs do job"
