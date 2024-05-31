const pool = require('../db/db');

// O "createTarefa" é responsável por criar uma nova tarefa.
const createTarefa = async (req, res) => {
  const { titulo, descricao, status, usuario_id } = req.body;

  try {
    const newTarefa = await pool.query(
      'INSERT INTO tarefas (titulo, descricao, status, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, descricao, status, usuario_id]
    );
    
    res.status(201).json(newTarefa.rows[0]);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).send('Erro ao criar uma nova tarefa');
  }
};

// O "getAllTarefas" é responsável por buscar todas as tarefas.
const getAllTarefas = async (req, res) => {
  try {
    const tarefas = await pool.query('SELECT * FROM tarefas');
    res.json(tarefas.rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).send('Erro ao buscar tarefas');
  }
};

// O "getTarefaById" é responsável por buscar uma tarefa pelo ID.
const getTarefaById = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    
    if (tarefa.rows.length > 0) {
      res.json(tarefa.rows[0]);
    } else {
      res.status(404).send('Tarefa não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).send('Erro ao buscar a tarefa');
  }
};

// O "updateTarefa" é responsável por atualizar uma tarefa pelo ID.
const updateTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status } = req.body;

  try {
    const updatedTarefa = await pool.query(
      'UPDATE tarefas SET titulo = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *',
      [titulo, descricao, status, id]
    );
    
    if (updatedTarefa.rows.length > 0) {
      res.status(200).json(updatedTarefa.rows[0]);
    } else {
      res.status(404).send('Tarefa não encontrada');
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).send('Erro ao atualizar a tarefa');
  }
};


// O "deleteTarefa" é responsável por deletar uma tarefa pelo ID.
const deleteTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      res.status(404).send('Tarefa não encontrada');
    } else {
      res.status(204).send('Tarefa deletada');
    }
  } catch (error) {
    console.error('Erro ao deletar a tarefa:', error);
    res.status(500).send('Erro ao deletar a tarefa');
  }
};

// O "getTarefaByUserId" é responsável por buscar todas as tarefas de um usuário.
const getTarefaByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log('ID do usuário:', userId);
    const tarefas = await pool.query('SELECT * FROM tarefas WHERE usuario_id = $1', [userId]);
    console.log('Tarefas encontradas:', tarefas);
    res.json(tarefas.rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas do usuário:', error);
    res.status(500).send('Erro ao buscar tarefas do usuário');
  }
};


module.exports = {
  createTarefa,
  getAllTarefas,
  getTarefaById,
  updateTarefa,
  deleteTarefa,
  getTarefaByUserId
};
