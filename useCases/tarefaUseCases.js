const { pool } = require('../config')
const Task = require('../entities/task')

const getTarefasDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM tarefas ORDER BY codigo');
        return rows.map((tarefa) => new Task(tarefa.codigo, tarefa.titulo,
            tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade, tarefa.categoria));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addTarefaDB = async (body) => {
    try {
        const { titulo, descricao, dataconclusao, prioridade, categoria} = body;
        const results = await pool.query(`INSERT INTO tarefas (titulo, descricao,
            dataconclusao, prioridade, categoria) VALUES ($1, $2, $3, $4, $5) 
            RETURNING codigo, titulo, descricao, dataconclusao, prioridade, categoria`, 
            [titulo, descricao, dataconclusao, prioridade, categoria]);
        const tarefa = results.rows[0];
        return new Task(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade,  tarefa.categoria);
    } catch (err){
        throw "Erro ao inserir a tarefa: " + err;
    }
}

const updateTarefaDB = async (body) => {
    try {
        const { titulo, descricao, dataconclusao, prioridade, categoria, codigo} = body;
        const results = await pool.query(`UPDATE tarefas SET titulo=$1,
        descricao=$2, dataconclusao = $3, prioridade = $4, categoria = $5 WHERE codigo=$6 
        RETURNING codigo, titulo, descricao, dataconclusao, prioridade, categoria`, 
        [titulo, descricao, dataconclusao, prioridade, categoria, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const tarefa = results.rows[0];
        return new Task(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade,  tarefa.categoria);
    } catch (err){
        throw "Erro ao alterar a tarefa: " + err;
    }
}

const deleteTarefaDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM tarefas 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Tarefa de código ${codigo} concluída com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a tarefa: " + err;
    }
}

const getTarefaPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM tarefas 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const tarefa = results.rows[0];
            return new Task(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade,  tarefa.categoria);
        }
    } catch (err){
        throw "Erro ao recuperar a tarefa: " + err;
    }
}

module.exports = { getTarefasDB, addTarefaDB, 
    updateTarefaDB, deleteTarefaDB, getTarefaPorCodigoDB }