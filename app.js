//Express
const express = require('express');
const path = require('path');



const connection = require('./database/database');


const app = express();


//models
const Usuario = require('./models/usuario');
const Funcionarios = require('./models/funcionarios');

//ImportDeRotas
const usuarioRouter = require("./routes/usuarioRoutes");
const funcionarioRouter = require("./routes/funcionarioRoutes");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//rotas
app.use('/usuarios', usuarioRouter);
app.use('/funcionarios', funcionarioRouter);

//banco de dados
connection
  .authenticate()
  .then(() => {
    console.log('Conexao bem sucedida!!');
  })
  .catch(erro => {
    console.log(erro);
  })

app.use('/', (req, res, next) => {
  res.render('index');
});
  

module.exports = app;
