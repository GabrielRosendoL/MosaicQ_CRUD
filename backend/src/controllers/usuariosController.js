const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db/db');

// O "criarUsuario" é responsável por criar um novo usuário.
// Essa função também já verifica se existe um usuário com o mesmo email e encriptografa a senha utilizando o bcrypt.

const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuarioExistente = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ mensagem: 'O usuário já existe com este e-mail.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, hashedPassword]);

    res.status(201).json({ mensagem: 'Usuário criado com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

// O "loginUsuario" é responsável por fazer o login do usuário.
// Essa função gera nosso token quando logamos na aplicação por meio da nossa 'chave-secreta' que dura por 1 hora.

const loginUsuario = async (req, res) => {
  const { nome, senha } = req.body;
  try {
    const usuario = await db.query('SELECT * FROM usuarios WHERE nome = $1', [nome]);
    if (usuario.rows.length === 0) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.rows[0].senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign({ nome: usuario.rows[0].nome }, 'chave-secreta', { expiresIn: '1h' });

    res.status(200).json({ id: usuario.rows[0].id, token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = { criarUsuario, loginUsuario };
