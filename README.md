# Documentação MosaicQ CRUD

## Sumário

# Backend

1. Configurações de Ambiente
2. Banco de Dados
3. Criação das Tabelas
4. Inicialização do Servidor
5. Inicialização da Aplicação
6. Funcionamente das APIs de Tarefas
7. Funcionamente das APIs de Usuários
8. Rotas de Tarefas
9. Rotas de Usuários
10. Tokens
11. Testes
12. Documentação Swagger

# Frontend

1. API
2. Componentes
3. Páginas

###################################

# BACKEND

# 1 - CONFIGURAÇÕES DE AMBIENTE

Antes de mais nada, certifique-se de que tenha o NodeJS instalado, assim como as demais dependências que o projeto requere.
Verifique a verão do NodeJS correspondente e aplique um "npm install" para obter as dependências. Confirme outras instalações necessárias caso ainda não possua todos os requisitos.

# 2 - BANCO DE DADOS

O arquivo "db.js" presente na pasta "db" nos fornece os dados necessários para configurar a conexão com o banco de dados.

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cruddb',
  password: '1234',
  port: 5432,
});

# 3 - CRIAÇÃO DE TABELAS

Para a criação das tabelas execute os seguintes scripts:

Tabela "tarefas":

-- Table: public.tarefas

-- DROP TABLE IF EXISTS public.tarefas;

CREATE TABLE IF NOT EXISTS public.tarefas
(
    id integer NOT NULL DEFAULT nextval('tarefas_id_seq'::regclass),
    titulo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descricao text COLLATE pg_catalog."default",
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    data_de_criacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer,
    CONSTRAINT tarefas_pkey PRIMARY KEY (id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tarefas
    OWNER to postgres;
    
--------------------------------

Tabela "usuarios":

-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id integer NOT NULL DEFAULT nextval('usuarios_id_seq'::regclass),
    nome character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    senha character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;
    
4 - INICIALIZAÇÃO DE SERVIDOR

Estando na pasta raiz do projeto, use "cd backend/src" no terminal e execute o comando "node index.js" para iniciar o servidor.

# 5 - INICIALIZAÇÃO DA APLICAÇÃO

Estando na pasta raiz do projeto, use "cd frontend" no terminal e execute o comando "npm" para iniciar a aplicação. Se já estiver rodando o servidor na porta 3000, permita que a aplicação seja iniciada em outra porta (ex: 3001).

# 6 - FUNCIONAMENTO DAS APIS DE TAREFAS:

- createTarefa:

Esta função é responsável por criar uma nova tarefa. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função extrai titulo, descricao, status e usuario_id do corpo da solicitação e tenta inserir esses dados na tabela tarefas do banco de dados. Se a operação for bem-sucedida, a função retorna a nova tarefa com o status 201. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

- getAllTarefas:

Esta função é responsável por buscar todas as tarefas. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função tenta buscar todas as tarefas na tabela tarefas do banco de dados. Se a operação for bem-sucedida, a função retorna todas as tarefas. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

- getTarefaById:

Esta função é responsável por buscar uma tarefa pelo ID. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função extrai o id dos parâmetros da solicitação e tenta buscar a tarefa com esse ID na tabela tarefas do banco de dados. Se a tarefa for encontrada, a função retorna a tarefa. Se a tarefa não for encontrada, a função retorna uma mensagem de erro com o status 404. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

- updateTarefa:

Esta função é responsável por atualizar uma tarefa pelo ID. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função extrai o id dos parâmetros da solicitação e titulo, descricao e status do corpo da solicitação. A função tenta atualizar a tarefa com esse ID na tabela tarefas do banco de dados. Se a tarefa for atualizada com sucesso, a função retorna a tarefa atualizada. Se a tarefa não for encontrada, a função retorna uma mensagem de erro com o status 404. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

- deleleTarefa:

Esta função é responsável por deletar uma tarefa pelo ID. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função extrai o id dos parâmetros da solicitação e tenta deletar a tarefa com esse ID na tabela tarefas do banco de dados. Se a tarefa for deletada com sucesso, a função retorna uma mensagem de sucesso com o status 204. Se a tarefa não for encontrada, a função retorna uma mensagem de erro com o status 404. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

- getTarefaByUserId:

Esta função é responsável por buscar todas as tarefas de um usuário. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função extrai o userId dos parâmetros da solicitação e tenta buscar todas as tarefas com esse usuario_id na tabela tarefas do banco de dados. Se a operação for bem-sucedida, a função retorna todas as tarefas do usuário. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

# 7 - FUNCIONAMENTO DAS APIS DE USUÁRIOS:

- criarUsuario:

Esta função é responsável por criar um novo usuário. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função extrai nome, email e senha do corpo da solicitação. Primeiro, verifica se já existe um usuário com o mesmo email. Se já existir, retorna uma mensagem de erro com o status 400. Se não existir, a função encripta a senha usando bcrypt e insere o novo usuário na tabela usuarios do banco de dados. Se a operação for bem-sucedida, a função retorna uma mensagem de sucesso com o status 201. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

- loginUsuario:

Esta função é responsável por fazer o login do usuário. Ela recebe um objeto de solicitação e um objeto de resposta como parâmetros. A função extrai nome e senha do corpo da solicitação. Primeiro, tenta buscar o usuário com esse nome na tabela usuarios do banco de dados. Se o usuário não for encontrado, retorna uma mensagem de erro com o status 400. Se o usuário for encontrado, a função verifica se a senha fornecida é correta usando bcrypt. Se a senha estiver incorreta, retorna uma mensagem de erro com o status 401. Se a senha estiver correta, a função gera um token JWT que dura 1 hora e retorna o token com o status 200. Se ocorrer um erro, a função registra o erro e retorna uma mensagem de erro com o status 500.

# 8 - ROTAS DE TAREFAS

- POST /tarefas:

Esta rota é usada para criar uma nova tarefa. Ela aceita um corpo de requisição JSON com titulo, descricao, status e usuario_id. Se a tarefa for criada com sucesso, a rota retorna um status 201 e a nova tarefa.

- GET /tarefas:

Esta rota é usada para obter todas as tarefas. Ela não requer nenhum parâmetro e retorna uma lista de todas as tarefas.

- GET /tarefas/{id}:

Esta rota é usada para obter uma tarefa específica pelo ID. Ela requer um ID de tarefa como parâmetro na URL. Se a tarefa for encontrada, a rota retorna a tarefa. Se a tarefa não for encontrada, a rota retorna um status 404.

- PUT /tarefas/{id}:

Esta rota é usada para atualizar uma tarefa específica pelo ID. Ela requer um ID de tarefa como parâmetro na URL e um corpo de requisição JSON com titulo, descricao e status. Se a tarefa for atualizada com sucesso, a rota retorna a tarefa atualizada. Se a tarefa não for encontrada, a rota retorna um status 404.

- DELETE /tarefas/{id}:

Esta rota é usada para deletar uma tarefa específica pelo ID. Ela requer um ID de tarefa como parâmetro na URL. Se a tarefa for deletada com sucesso, a rota retorna um status 204. Se a tarefa não for encontrada, a rota retorna um status 404.

- GET /tarefas/userId/{userId}:

Esta rota é usada para obter todas as tarefas de um usuário específico pelo ID do usuário. Ela requer um ID de usuário como parâmetro na URL. A rota retorna uma lista de todas as tarefas do usuário.

# 9 - ROTAS DE TAREFAS

- POST /usuarios/criar:

Esta rota é usada para criar um novo usuário. Ela aceita um corpo de requisição JSON com nome, email e senha. Se o usuário for criado com sucesso, a rota retorna um status 201 e uma mensagem de sucesso. Se ocorrer um erro (por exemplo, se o email já estiver em uso), a rota retorna um status 400 e uma mensagem de erro.

- POST /usuarios/login:

Esta rota é usada para fazer login de um usuário. Ela aceita um corpo de requisição JSON com nome e senha. Se as credenciais estiverem corretas, a rota retorna um status 200 e um token JWT. Se as credenciais estiverem incorretas, a rota retorna um status 400 e uma mensagem de erro.

- GET /usuarios/tarefas:

Esta rota é usada para verificar se o usuário está autenticado e pode acessar as tarefas. Ela requer um token JWT no cabeçalho Authorization da requisição. Se o token for válido, a rota retorna um status 200 e uma mensagem indicando que o usuário está autenticado e pode acessar as tarefas. Se o token for inválido, a rota retorna um status 401 e uma mensagem de erro.

# 10 - TOKENS

Sobre a autenticação em "verificarToken.js":

A função verificarToken é um middleware usado para verificar se um token JWT válido foi fornecido na solicitação. Ela recebe três parâmetros: req (o objeto de solicitação), res (o objeto de resposta) e next (a função de callback para passar para o próximo middleware).

A função começa extraindo o token do cabeçalho Authorization da solicitação.

Se nenhum token for fornecido, a função retorna uma resposta com o status 401 e uma mensagem de erro indicando que o token de autenticação está ausente.

Se um token for fornecido, a função tenta verificar o token usando a função verify do pacote jsonwebtoken. A função verify recebe três parâmetros: o token, uma chave secreta para decodificar o token e uma função de callback.

A função de callback é chamada quando a função verify termina de verificar o token. Ela recebe dois parâmetros: err (um erro, se ocorrer) e decoded (o payload decodificado do token, se a verificação for bem-sucedida).

Se ocorrer um erro durante a verificação (por exemplo, se o token for inválido), a função de callback retorna uma resposta com o status 403 e uma mensagem de erro indicando que o token de autenticação é inválido.

Se a verificação for bem-sucedida, a função de callback adiciona o payload decodificado ao objeto de solicitação como req.usuario e chama a função next para passar para o próximo middleware.

# 11 - TESTES

Sobre testes:

No arquivo "tarefasController.test.js" temos testes unitários para o controlador de tarefas. Ele usa a biblioteca de testes Jest e a biblioteca de simulação jest.mock para simular a interação com o banco de dados. Basicamente simula todos os endpoints sem alterar diretamente o banco, testando assim cada funcionalidade.

Já no arquivo "tarefasRoutes.tests.js" também temos testes, mas dessa vez testes de integração para as rotas.

Podemos executar os testes por meio do comando navegandoa até "cd backend" e executando o comando "npm tests".

# 12 - DOCUMENTAÇÃO SWAGGER

A documentação do Swagger foi configurada no arquivo "swagger.js", no arquivo de rotas e no próprio "index.js".

Para acessar o Swagger e testar as rotas utilize o endpoint "/api-docs" no endereço em que estiver rodando o servidor.

---------------------------------

# FRONTEND

# 1 - API

Sobre o "tarefas.ts":

Este arquivo define uma série de funções para interagir com a API de tarefas. Ele usa a biblioteca axios para fazer solicitações HTTP.

- api: 

Esta é uma instância do axios com a URL base da API definida como http://localhost:3000.

- getToken: 

Esta função retorna o token de autenticação do armazenamento local.

- api.interceptors.request.use: 

Este é um interceptor que é chamado antes de cada solicitação ser enviada. Ele verifica se há um token de autenticação e, se houver, adiciona-o ao cabeçalho Authorization da solicitação.

O restante do arquivo lida com os endpoints que já estabelecemos.

# 2 - COMPONENTES

Na pasta "componentes" nós nos deparamos com 3 modais (que são caixas flutuantes que são ativadas na página como dialogs). Os modais com quais trabalhamos são: "TarefaAdicaoModal", "TarefaConfirmarDeletarModal" e "TarefaEdicaoModal". Um para cada função do CRUD (a listagem ocorre na página de tarefas). Além disso, aqui também encontramos o nosso arquivo CSS global e o arquivo de configuração de formulário para tarefas.

# 3 - PÁGINAS

Por fim, falaremos sobre as páginas e consequentemente sobre como a aplicação funciona em um todo.

- SPLASHSCREEN (somos recebidos pelo Oli!):

A SplashScreenPage é a página inicial da aplicação. Ela é a primeira página que os usuários veem quando acessam o aplicativo. A página é composta pela imagem do Oli, um título, um subtítulo e um botão. A página usa o hook useNavigate do react-router-dom para navegar para outras páginas. A função handleEnter é chamada quando o botão "Começar!" é clicado. Esta função adiciona a classe slideUp ao elemento com a classe centeredContent, criando um efeito de animação. Após 850 milissegundos, a função navega para a página de login.

O componente retorna um JSX que representa a página. O JSX contém um div com a classe splashContainer, que contém o título do aplicativo, um div com a classe centeredContent, que contém o subtítulo, a imagem do mascote e o botão "Começar!".

- LOGINPAGE:

A LoginPage é a página de login do aplicativo. Ela permite que os usuários insiram suas credenciais e acessem o aplicativo. A página é composta por um formulário de login com campos para nome de usuário e senha, um botão de login e um botão para criar uma nova conta.

A página usa os hooks useNavigate e useLocation do react-router-dom para navegar para outras páginas e acessar o estado da localização atual, respectivamente. Ela também usa o hook useState do React para gerenciar o estado das credenciais do usuário, a mensagem de erro e o ID do usuário. O hook useEffect é usado para adicionar efeitos colaterais que ocorrem quando a página é carregada e quando o estado da localização muda.

A função handleInputChange é chamada quando o valor de um campo de entrada muda. Ela atualiza o estado das credenciais com o novo valor.

A função handleLogin é chamada quando o botão de login é clicado. Ela verifica se os campos de nome de usuário e senha estão preenchidos. Se estiverem, ela faz uma solicitação POST para a rota /usuarios/login da API para autenticar o usuário. Se a autenticação for bem-sucedida, ela armazena o token JWT no armazenamento local, atualiza o estado do ID do usuário e navega para a página de tarefas. Se a autenticação falhar, ela atualiza o estado da mensagem de erro.

- CRIARCONTAPAGE:

A CriarContaPage é a página de criação de conta do aplicativo. Ela permite que os usuários criem uma nova conta inserindo suas credenciais e clicando no botão "Criar Conta". A página é composta por um formulário de criação de conta com campos para nome de usuário, e-mail, senha e confirmação de senha, um botão de criação de conta e uma mensagem que é exibida quando a conta é criada com sucesso ou quando ocorre um erro.

A página usa o hook useNavigate do react-router-dom para navegar para outras páginas. Ela também usa os hooks useState e useEffect do React para gerenciar o estado das credenciais do usuário, a mensagem e o sucesso da criação da conta, e para adicionar efeitos colaterais que ocorrem quando a página é carregada.

A função handleInputChange é chamada quando o valor de um campo de entrada muda. Ela atualiza o estado das credenciais com o novo valor.

A função handleCriarConta é chamada quando o botão "Criar Conta" é clicado. Ela verifica se todos os campos estão preenchidos e se as senhas coincidem. Se estiverem, ela faz uma solicitação POST para a rota /usuarios/criar da API para criar a nova conta. Se a criação da conta for bem-sucedida, ela atualiza a mensagem e o sucesso da criação da conta e navega para a página de login após 2 segundos. Se a criação da conta falhar, ela atualiza a mensagem e o sucesso da criação da conta.

- TAREFAPAGE:

A TarefaPage é a página de tarefas do aplicativo. Ela permite que os usuários visualizem, criem, editem e excluam tarefas. A página é composta por uma lista de tarefas, um formulário de criação de tarefas, um modal de edição de tarefas, um modal de confirmação de exclusão de tarefas e um botão de logout.

A página usa os hooks useEffect e useState do React para gerenciar o estado das tarefas, os modais, a tarefa atual, a tarefa a ser excluída, o erro e o formulário. Ela também usa os hooks useLocation e useNavigate do react-router-dom para obter o ID do usuário do estado da localização e para navegar para outras páginas.

A função fetchTarefas é chamada para buscar as tarefas do usuário. Ela faz uma solicitação GET para a rota /tarefas da API com o ID do usuário e atualiza o estado das tarefas com a resposta. Se ocorrer um erro, ela atualiza o estado do erro.

As funções handleCreateTarefa, handleUpdateTarefa e handleDeleteTarefa são chamadas para criar, atualizar e excluir tarefas, respectivamente. Elas fazem solicitações POST, PUT e DELETE para as rotas /tarefas, /tarefas/:id e /tarefas/:id da API, respectivamente, e atualizam o estado das tarefas.

As funções handleOpenAddModal, handleOpenEditModal, handleCloseEditModal, handleConfirmDelete e toggleForm são chamadas para abrir o modal de adição, abrir o modal de edição, fechar o modal de edição, confirmar a exclusão e alternar o formulário, respectivamente. Elas atualizam o estado dos modais, da tarefa atual, da tarefa a ser excluída e do formulário.

