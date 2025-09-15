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

## Testes

Execute os testes com:
```bash
npm test
```

## Tecnologias utilizadas

- Node.js
- Express.js
- Docker
- Jest (testes)
- Supertest (testes de API)
