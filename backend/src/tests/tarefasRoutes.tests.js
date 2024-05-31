const request = require('supertest');
const express = require('express');
const tarefasRoutes = require('../routes/tarefasRoutes');
const pool = require('../db/db');

jest.mock('../db/db');

// Aqui são feitos os testes de integração para as rotas de tarefas com o Jest.

const app = express();
app.use(express.json());
app.use('/tarefas', tarefasRoutes);

describe('Testes de Integração para tarefasRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /tarefas', () => {
    it('deve criar uma nova tarefa', async () => {
      const newTarefa = { titulo: 'Teste', descricao: 'Descrição de teste', status: 'pendente', usuario_id: 1 };
      pool.query.mockResolvedValue({ rows: [{ id: 1, ...newTarefa }] });

      const res = await request(app).post('/tarefas').send(newTarefa);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, ...newTarefa });
    });

    it('deve retornar status 500 em caso de erro', async () => {
      const newTarefa = { titulo: 'Teste', descricao: 'Descrição de teste', status: 'pendente', usuario_id: 1 };
      pool.query.mockRejectedValue(new Error('Erro ao criar tarefa'));

      const res = await request(app).post('/tarefas').send(newTarefa);

      expect(res.status).toBe(500);
      expect(res.text).toBe('Erro ao criar uma nova tarefa');
    });
  });

  describe('GET /tarefas', () => {
    it('deve retornar todas as tarefas', async () => {
      const mockTarefas = [{ id: 1, titulo: 'Tarefa 1' }, { id: 2, titulo: 'Tarefa 2' }];
      pool.query.mockResolvedValue({ rows: mockTarefas });

      const res = await request(app).get('/tarefas');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTarefas);
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao buscar tarefas'));

      const res = await request(app).get('/tarefas');

      expect(res.status).toBe(500);
      expect(res.text).toBe('Erro ao buscar tarefas');
    });
  });

  describe('GET /tarefas/:id', () => {
    it('deve retornar uma tarefa específica pelo ID', async () => {
      const mockTarefa = { id: 1, titulo: 'Tarefa 1' };
      pool.query.mockResolvedValue({ rows: [mockTarefa] });

      const res = await request(app).get('/tarefas/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTarefa);
    });

    it('deve retornar status 404 se a tarefa não for encontrada', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const res = await request(app).get('/tarefas/1');

      expect(res.status).toBe(404);
      expect(res.text).toBe('Tarefa não encontrada');
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao buscar tarefa'));

      const res = await request(app).get('/tarefas/1');

      expect(res.status).toBe(500);
      expect(res.text).toBe('Erro ao buscar a tarefa');
    });
  });

  describe('PUT /tarefas/:id', () => {
    it('deve atualizar uma tarefa', async () => {
      const updatedTarefa = { titulo: 'Atualizado', descricao: 'Descrição atualizada', status: 'concluída', usuario_id: 1 };
      pool.query.mockResolvedValue({ rows: [{ id: 1, ...updatedTarefa }] });

      const res = await request(app).put('/tarefas/1').send(updatedTarefa);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, ...updatedTarefa });
    });

    it('deve retornar status 500 se a tarefa não for encontrada', async () => {
      const updatedTarefa = { titulo: 'Atualizado', descricao: 'Descrição atualizada', status: 'concluída', usuario_id: 1 };
      pool.query.mockResolvedValue({ rows: [] });

      const res = await request(app).put('/tarefas/1').send(updatedTarefa);

      expect(res.status).toBe(500);
      expect(res.text).toBe('Tarefa não encontrada');
    });

    it('deve retornar status 500 em caso de erro', async () => {
      const updatedTarefa = { titulo: 'Atualizado', descricao: 'Descrição atualizada', status: 'concluída', usuario_id: 1 };
      pool.query.mockRejectedValue(new Error('Erro ao atualizar tarefa'));

      const res = await request(app).put('/tarefas/1').send(updatedTarefa);

      expect(res.status).toBe(500);
      expect(res.text).toBe('Erro ao atualizar a tarefa');
    });
  });

  describe('DELETE /tarefas/:id', () => {
    it('deve deletar uma tarefa', async () => {
      pool.query.mockResolvedValue({ rowCount: 1 });

      const res = await request(app).delete('/tarefas/1');

      expect(res.status).toBe(204);
      expect(res.text).toBe('');
    });

    it('deve retornar status 500 se a tarefa não for encontrada', async () => {
      pool.query.mockResolvedValue({ rowCount: 0 });

      const res = await request(app).delete('/tarefas/1');

      expect(res.status).toBe(500);
      expect(res.text).toBe('Tarefa não encontrada');
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao deletar tarefa'));

      const res = await request(app).delete('/tarefas/1');

      expect(res.status).toBe(500);
      expect(res.text).toBe('Erro ao deletar a tarefa');
    });
  });

  describe('GET /tarefas/usuario/:usuario_id', () => {
    it('deve retornar tarefas por usuário', async () => {
      const mockTarefas = [{ id: 1, titulo: 'Tarefa 1' }, { id: 2, titulo: 'Tarefa 2' }];
      pool.query.mockResolvedValue({ rows: mockTarefas });

      const res = await request(app).get('/tarefas/usuario/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTarefas);
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao buscar tarefas do usuário'));

      const res = await request(app).get('/tarefas/usuario/1');

      expect(res.status).toBe(500);
      expect(res.text).toBe('Erro ao buscar tarefas do usuário');
    });
  });

});
