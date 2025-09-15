const request = require('supertest');
const app = require('../src/server');

describe('API de Tarefas', () => {
  test('GET /api/todos deve retornar lista de tarefas', async () => {
    const response = await request(app)
      .get('/api/todos')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/todos deve criar nova tarefa', async () => {
    const newTodo = {
      title: 'Nova tarefa',
      description: 'Descrição da nova tarefa'
    };

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);

    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.description).toBe(newTodo.description);
    expect(response.body.completed).toBe(false);
    expect(response.body.id).toBeDefined();
  });

  test('POST /api/todos sem título deve retornar erro 400', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ description: 'Sem título' })
      .expect(400);

    expect(response.body.error).toBe('Título é obrigatório');
  });

  test('GET /api/todos/:id deve retornar tarefa específica', async () => {
    // Primeiro, criar uma tarefa
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa para teste' })
      .expect(201);

    const todoId = createResponse.body.id;

    // Depois, buscar a tarefa
    const response = await request(app)
      .get(`/api/todos/${todoId}`)
      .expect(200);

    expect(response.body.id).toBe(todoId);
    expect(response.body.title).toBe('Tarefa para teste');
  });

  test('GET /api/todos/:id com ID inexistente deve retornar 404', async () => {
    const response = await request(app)
      .get('/api/todos/inexistente')
      .expect(404);

    expect(response.body.error).toBe('Tarefa não encontrada');
  });

  test('PUT /api/todos/:id deve atualizar tarefa', async () => {
    // Primeiro, criar uma tarefa
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa original' })
      .expect(201);

    const todoId = createResponse.body.id;

    // Depois, atualizar a tarefa
    const updateData = {
      title: 'Tarefa atualizada',
      completed: true
    };

    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.title).toBe(updateData.title);
    expect(response.body.completed).toBe(updateData.completed);
  });

  test('DELETE /api/todos/:id deve remover tarefa', async () => {
    // Primeiro, criar uma tarefa
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa para deletar' })
      .expect(201);

    const todoId = createResponse.body.id;

    // Depois, deletar a tarefa
    await request(app)
      .delete(`/api/todos/${todoId}`)
      .expect(204);

    // Verificar se a tarefa foi removida
    await request(app)
      .get(`/api/todos/${todoId}`)
      .expect(404);
  });

  test('GET /health deve retornar status OK', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });
});
