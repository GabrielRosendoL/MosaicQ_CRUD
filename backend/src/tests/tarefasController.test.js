const { createTarefa, getAllTarefas, getTarefaById, updateTarefa, deleteTarefa, getTarefaByUserId } = require('../controllers/tarefasController');
const pool = require('../db/db');

jest.mock('../db/db');

// Aqui são feitos os testes unitários para o controller de tarefas com o Jest.

describe('tarefasController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTarefa', () => {
    it('deve criar uma nova tarefa e retornar status 201', async () => {
      const req = {
        body: { titulo: 'Test', descricao: 'Descrição de teste', status: 'pendente', usuario_id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pool.query.mockResolvedValue({ rows: [{ id: 1, ...req.body }] });

      await createTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('deve retornar status 500 em caso de erro', async () => {
      const req = {
        body: { titulo: 'Test', descricao: 'Descrição de teste', status: 'pendente', usuario_id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      pool.query.mockRejectedValue(new Error('Erro ao criar tarefa'));

      await createTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao criar uma nova tarefa');
    });
  });

  describe('getAllTarefas', () => {
    let req, res;

    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
    });

    it('deve retornar todas as tarefas com status 200', async () => {
      const mockTarefas = [{ id: 1, titulo: 'Tarefa 1' }, { id: 2, titulo: 'Tarefa 2' }];
      pool.query.mockResolvedValue({ rows: mockTarefas });

      await getAllTarefas(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockTarefas);
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao buscar tarefas'));

      await getAllTarefas(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao buscar tarefas');
    });
  });

  describe('getTarefaById', () => {
    let req, res;

    beforeEach(() => {
      req = { params: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
    });

    it('deve retornar uma tarefa específica pelo ID com status 200', async () => {
      const mockTarefa = { id: 1, titulo: 'Tarefa 1' };
      pool.query.mockResolvedValue({ rows: [mockTarefa] });

      await getTarefaById(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockTarefa);
    });

    it('deve retornar status 404 se a tarefa não for encontrada', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await getTarefaById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Tarefa não encontrada');
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao buscar tarefa'));

      await getTarefaById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao buscar a tarefa');
    });
  });

  describe('updateTarefa', () => {
    let req, res;

    beforeEach(() => {
      req = { params: { id: 1 }, body: { titulo: 'Atualizado', descricao: 'Descrição atualizada', status: 'concluída', usuario_id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
    });

    it('deve atualizar uma tarefa e retornar status 200', async () => {
      const mockUpdatedTarefa = { id: 1, ...req.body };
      pool.query.mockResolvedValue({ rows: [mockUpdatedTarefa] });

      await updateTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedTarefa);
    });

    it('deve retornar status 404 se a tarefa não for encontrada', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await updateTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Tarefa não encontrada');
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao atualizar tarefa'));

      await updateTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao atualizar a tarefa');
    });
  });

  describe('deleteTarefa', () => {
    let req, res;

    beforeEach(() => {
      req = { params: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('deve deletar uma tarefa e retornar status 204', async () => {
        pool.query.mockResolvedValue({ rowCount: 1 });
    
        await deleteTarefa(req, res);
    
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith("Tarefa deletada");
    });
    
    

    it('deve retornar status 404 se a tarefa não for encontrada', async () => {
      pool.query.mockResolvedValue({ rowCount: 0 });

      await deleteTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Tarefa não encontrada');
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao deletar tarefa'));

      await deleteTarefa(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao deletar a tarefa');
    });
  });

  describe('getTarefaByUserId', () => {
    let req, res;

    beforeEach(() => {
      req = { params: { usuario_id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
    });

    it('deve retornar tarefas por usuário com status 200', async () => {
      const mockTarefas = [{ id: 1, titulo: 'Tarefa 1' }, { id: 2, titulo: 'Tarefa 2' }];
      pool.query.mockResolvedValue({ rows: mockTarefas });

      await getTarefaByUserId(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockTarefas);
    });

    it('deve retornar status 500 em caso de erro', async () => {
      pool.query.mockRejectedValue(new Error('Erro ao buscar tarefas do usuário'));

      await getTarefaByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Erro ao buscar tarefas do usuário');
    });
  });

});
