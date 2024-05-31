const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');
const verificarTokens = require('../middlewares/verificarTokens');

//Aqui definimos as rotas da API para as tarefas.

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *               usuario_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 status:
 *                   type: string
 *                 usuario_id:
 *                   type: integer
 */
router.post('/', tarefasController.createTarefa);

/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Obtém todas as tarefas
 *     description: Retorna todas as tarefas cadastradas no sistema.
 *     responses:
 *       200:
 *         description: Lista de todas as tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 */
router.get('/', tarefasController.getAllTarefas);

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Obtém uma tarefa pelo ID
 *     description: Retorna uma tarefa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser obtida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/:id', tarefasController.getTarefaById);

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa pelo ID
 *     description: Atualiza os dados de uma tarefa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:id', tarefasController.updateTarefa);

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Deleta uma tarefa pelo ID
 *     description: Deleta uma tarefa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', tarefasController.deleteTarefa);

/**
 * @swagger
 * /tarefas/userId/{userId}:
 *   get:
 *     summary: Obtém todas as tarefas de um usuário pelo ID do usuário
 *     description: Retorna todas as tarefas associadas a um usuário com base no ID do usuário fornecido.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de todas as tarefas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 */
router.get('/userId/:userId', tarefasController.getTarefaByUserId);

module.exports = router;
