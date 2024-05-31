const express = require('express');
const cors = require('cors');
const { specs, swaggerUi } = require('./swagger');
const tarefasRoutes = require('./routes/tarefasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

// Aqui é criada a aplicação Express (e também onde é configurada a porta e onde podemos iniciar nosso servidor).

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/usuarios', usuariosRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('Seu servidor está funcionando!');
});

app.use('/tarefas', tarefasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
