const { Router } = require('express');

const { getTarefas, addTarefa, 
     updateTarefa, deleteTarefa, getTarefaPorCodigo } = require('../controllers/tarefasController')


const { getCategorias, addCategoria,
     updateCategoria, deleteCategoria, getCategoriaPorCodigo } = require('../controllers/categoriasController')


const {login, verificaJWT} = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login')
     .post(login);

rotas.route('/tarefas')
     .get(verificaJWT, getTarefas)
     .post(verificaJWT, addTarefa)
     .put(verificaJWT, updateTarefa);

rotas.route('/tarefas/:codigo')
     .get(verificaJWT, getTarefaPorCodigo)
     .delete(verificaJWT, deleteTarefa);

rotas.route('/categorias')
     .get(verificaJWT, getCategorias)
     .post(verificaJWT, addCategoria)
     .put(verificaJWT, updateCategoria);

rotas.route('/categorias/:codigo')
     .get(verificaJWT, getCategoriaPorCodigo)
     .delete(verificaJWT, deleteCategoria);

module.exports = rotas;