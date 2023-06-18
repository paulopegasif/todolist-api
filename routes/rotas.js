const { Router } = require('express');

const { getTarefas, addTarefa, 
     updateTarefa, deleteTarefa, getTarefaPorCodigo } = require('../controllers/tarefasController')

/* const { getSalas, addSala, updateSala, deleteSala, getSalaPorCodigo }
     = require('../controllers/salasController');

const { getEquipamentoPorSala, addEquipamento, updateEquipamento,
     deleteEquipamento, getEquipamentoPorCodigo } =
     require('../controllers/equipamentosController'); */


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

module.exports = rotas;