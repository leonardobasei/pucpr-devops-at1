const request = require('supertest');
const app = require('../src/server');

describe('Testes Unitários Adicionais - Casos Edge e Validações', () => {
  
  // Teste 1: Validação de descrição vazia e com espaços
  test('POST /api/todos deve tratar descrição vazia e espaços em branco', async () => {
    const newTodo = {
      title: 'Tarefa com descrição vazia',
      description: '   ' // Apenas espaços
    };

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);

    expect(response.body.description).toBe(''); // Deve ser string vazia após trim
    expect(response.body.title).toBe('Tarefa com descrição vazia');
  });

  // Teste 2: Validação de título com espaços em branco
  test('POST /api/todos deve fazer trim do título', async () => {
    const newTodo = {
      title: '   Tarefa com espaços   ',
      description: 'Descrição com espaços   '
    };

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);

    expect(response.body.title).toBe('Tarefa com espaços'); // Deve remover espaços
    expect(response.body.description).toBe('Descrição com espaços'); // Deve remover espaços
  });

  // Teste 3: Atualização parcial de tarefa (apenas alguns campos)
  test('PUT /api/todos/:id deve permitir atualização parcial', async () => {
    // Criar tarefa inicial
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ 
        title: 'Tarefa original',
        description: 'Descrição original',
        completed: false
      })
      .expect(201);

    const todoId = createResponse.body.id;

    // Atualizar apenas o campo completed
    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ completed: true })
      .expect(200);

    expect(response.body.completed).toBe(true);
    expect(response.body.title).toBe('Tarefa original'); // Deve manter o valor original
    expect(response.body.description).toBe('Descrição original'); // Deve manter o valor original
  });

  // Teste 4: Validação de estatísticas com lista vazia
  test('GET /api/stats deve retornar estatísticas corretas com lista vazia', async () => {
    // Limpar todas as tarefas (simulando lista vazia)
    const todosResponse = await request(app).get('/api/todos');
    const todos = todosResponse.body;
    
    // Deletar todas as tarefas existentes
    for (const todo of todos) {
      await request(app).delete(`/api/todos/${todo.id}`);
    }

    const response = await request(app)
      .get('/api/stats')
      .expect(200);

    expect(response.body.total).toBe(0);
    expect(response.body.completed).toBe(0);
    expect(response.body.pending).toBe(0);
    expect(response.body.completionRate).toBe(0);
  });

  // Teste 5: Validação de UUID único para cada tarefa
  test('POST /api/todos deve gerar UUIDs únicos para cada tarefa', async () => {
    const todo1 = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa 1' })
      .expect(201);

    const todo2 = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa 2' })
      .expect(201);

    expect(todo1.body.id).toBeDefined();
    expect(todo2.body.id).toBeDefined();
    expect(todo1.body.id).not.toBe(todo2.body.id);
    expect(todo1.body.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    expect(todo2.body.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  // Teste 6: Validação de timestamp de criação
  test('POST /api/todos deve incluir timestamp de criação válido', async () => {
    const beforeCreate = new Date();
    
    const response = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa com timestamp' })
      .expect(201);

    const afterCreate = new Date();
    const createdAt = new Date(response.body.createdAt);

    expect(response.body.createdAt).toBeDefined();
    expect(createdAt).toBeInstanceOf(Date);
    expect(createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
    expect(createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
  });

  // Teste 7: Validação de campos obrigatórios em PUT
  test('PUT /api/todos/:id deve funcionar mesmo com campos undefined', async () => {
    // Criar tarefa inicial
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ 
        title: 'Tarefa para teste',
        description: 'Descrição original',
        completed: false
      })
      .expect(201);

    const todoId = createResponse.body.id;

    // Atualizar com campos undefined (deve manter valores originais)
    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ 
        title: undefined,
        description: undefined,
        completed: true
      })
      .expect(200);

    expect(response.body.title).toBe('Tarefa para teste'); // Deve manter original
    expect(response.body.description).toBe('Descrição original'); // Deve manter original
    expect(response.body.completed).toBe(true); // Deve atualizar apenas este campo
  });

  // Teste 8: Validação de estatísticas com diferentes estados de tarefas
  test('GET /api/stats deve calcular corretamente com tarefas completas e pendentes', async () => {
    // Criar tarefas com diferentes estados
    const todo1 = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa 1' })
      .expect(201);

    const todo2 = await request(app)
      .post('/api/todos')
      .send({ title: 'Tarefa 2' })
      .expect(201);

    // Marcar uma tarefa como completa
    await request(app)
      .put(`/api/todos/${todo1.body.id}`)
      .send({ completed: true })
      .expect(200);

    const response = await request(app)
      .get('/api/stats')
      .expect(200);

    // Verificar se as propriedades existem e são números
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('completed');
    expect(response.body).toHaveProperty('pending');
    expect(response.body).toHaveProperty('completionRate');
    expect(typeof response.body.total).toBe('number');
    expect(typeof response.body.completed).toBe('number');
    expect(typeof response.body.pending).toBe('number');
    expect(typeof response.body.completionRate).toBe('number');
    
    // Verificar se os valores são consistentes
    expect(response.body.pending).toBe(response.body.total - response.body.completed);
    expect(response.body.completionRate).toBe(Math.round((response.body.completed / response.body.total) * 100));
  });
});
