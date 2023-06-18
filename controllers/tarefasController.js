const { getTarefasDB, addTarefaDB, 
    updateTarefaDB, deleteTarefaDB, getTarefaPorCodigoDB }= require('../useCases/tarefaUseCases');
    
    const getTarefas = async (request, response) => {
        await getTarefasDB()
              .then(data => response.status(200).json(data))
              .catch(err => {
                response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar as tarefas: ' + err
                })
              })
    }
    
    const addTarefa = async (request, response) => {
        await addTarefaDB(request.body)
              .then(data => response.status(200).json({
                status : "success", message : "Tarefa Criada",
                objeto : data
              }))
              .catch(err => response.status(400).json({
                status : "error", message: err
              }))
    }
    
    const updateTarefa = async (request, response) => {
        await updateTarefaDB(request.body)
              .then(data => response.status(200).json({
                status : "success", message : "Tarefa Alterada",
                objeto : data
              }))
              .catch(err => response.status(400).json({
                status : "error", message: err
              }))
    }
    
    const deleteTarefa = async (request, response) => {
        await deleteTarefaDB(request.params.codigo)
              .then(data => response.status(200).json({
                status : "success", message : data
              }))
              .catch(err => response.status(400).json({
                status : "error", message: err
              }))
    }
    
    const getTarefaPorCodigo = async (request, response) => {
        await getTarefaPorCodigoDB(request.params.codigo)
              .then(data => response.status(200).json(data))
              .catch(err => response.status(400).json({
                status : "error", message: err
              }))
    }
    
    module.exports = { getTarefas, addTarefa, 
        updateTarefa, deleteTarefa, getTarefaPorCodigo }