const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verificarTokens = require('../middlewares/verificarTokens');

//Aqui definimos as rotas da API para os usuários.

/**
 * @swagger
 * /usuarios/criar:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar o usuário
 */
router.post('/criar', usuariosController.criarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Faz login de um usuário
 *     description: Faz login de um usuário com os dados fornecidos no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Credenciais inválidas
 */
router.post('/login', usuariosController.loginUsuario);

/**
 * @swagger
 * /usuarios/tarefas:
 *   get:
 *     summary: Obtém as tarefas do usuário autenticado
 *     description: Retorna uma mensagem indicando que o usuário está autenticado e pode acessar as tarefas.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 */
router.get('/tarefas', verificarTokens, (req, res) => {
    res.json({ mensagem: 'Você está autenticado e pode acessar as tarefas.' });
});

module.exports = router;
