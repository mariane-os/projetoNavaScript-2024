//Express
const express = require('express');
const path = require('path');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const connection = require('./database/database');

const Usuario = require('./models/usuario');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//banco de dados
connection
  .authenticate()
  .then(() => {
    console.log('Conexao bem sucedida!!');
  })
  .catch(erro => {
    console.log(erro);
  })

module.exports = app;
