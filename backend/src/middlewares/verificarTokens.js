const jwt = require('jsonwebtoken');

// Aqui é verificado o token para validar a autenticação.

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação ausente.' });
  }

  jwt.verify(token.split(' ')[1], 'chave-secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Token de autenticação inválido.' });
    }
    
    req.usuario = decoded;
    next();
  });
};

module.exports = verificarToken;
