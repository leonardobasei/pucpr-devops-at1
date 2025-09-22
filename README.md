# API REST - Lista de Tarefas

Uma API REST simples para gerenciar uma lista de tarefas, desenvolvida em Node.js e containerizada com Docker.

## Funcionalidades

- Criar, listar, atualizar e deletar tarefas
- Validação de dados
- Middleware de segurança (Helmet)
- Logs de requisições (Morgan)
- CORS habilitado
- Health check endpoint

## Como executar

### Com Docker

1. Clone o repositório
2. Execute o comando:
```bash
docker-compose up --build
```

### Localmente

1. Instale as dependências:
```bash
npm install
```

2. Execute em modo desenvolvimento:
```bash
npm run dev
```

3. Execute em modo produção:
```bash
npm start
```

## Endpoints da API

- `GET /api/todos` - Lista todas as tarefas
- `GET /api/todos/:id` - Busca uma tarefa específica
- `POST /api/todos` - Cria uma nova tarefa
- `PUT /api/todos/:id` - Atualiza uma tarefa
- `DELETE /api/todos/:id` - Remove uma tarefa
- `GET /api/stats` - Estatísticas das tarefas
- `GET /health` - Health check

## Exemplo de uso

### Criar uma tarefa
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Nova tarefa", "description": "Descrição da tarefa"}'
```

### Listar tarefas
```bash
curl http://localhost:3000/api/todos
```

### Ver estatísticas
```bash
curl http://localhost:3000/api/stats
```

## Testes

Execute os testes com:
```bash
npm test
```

## GitHub Actions & CI/CD

Este projeto inclui workflows automatizados para:

- **CI/CD Pipeline** - Testes e build automático
- **Code Quality** - Análise de código e linting
- **Security** - Verificação de vulnerabilidades
- **Discord Notifications** - Alertas em tempo real no Discord

### Alertas do Discord

Configure alertas automáticos para:
- Commits no branch main
- Pull Requests abertas/fechadas/mergeadas
- Execução de workflows
- Issues e releases

📖 [Guia de configuração do Discord](DISCORD_SETUP.md)

## Tecnologias utilizadas

- Node.js
- Express.js
- Docker
- Jest (testes)
- Supertest (testes de API)
- GitHub Actions
- Discord Webhooks
