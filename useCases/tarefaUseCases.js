const { pool } = require('../config')
const Task = require('../entities/task')

const getTarefasDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM tarefas ORDER BY codigo');
        return rows.map((tarefa) => new Task(tarefa.codigo, tarefa.titulo,
            tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade, tarefa.nomecategoria));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addTarefaDB = async (body) => {
    try {
        const { titulo, descricao, dataconclusao, prioridade, nomecategoria} = body;
        const results = await pool.query(`INSERT INTO tarefas (titulo, descricao,
            dataconclusao, prioridade, nomecategoria) VALUES ($1, $2, $3, $4, $5) 
            RETURNING codigo, titulo, descricao, dataconclusao, prioridade, nomecategoria`, 
            [titulo, descricao, dataconclusao, prioridade, nomecategoria]);
        const tarefa = results.rows[0];
        return new Task(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade,  tarefa.nomecategoria);
    } catch (err){
        throw "Erro ao inserir a tarefa: " + err;
    }
}

const updateTarefaDB = async (body) => {
    try {
        const { titulo, descricao, dataconclusao, prioridade, nomecategoria, codigo} = body;
        const results = await pool.query(`UPDATE tarefas SET titulo=$1,
        descricao=$2, dataconclusao = $3, prioridade = $4, nomecategoria = $5 WHERE codigo=$6 
        RETURNING codigo, titulo, descricao, dataconclusao, prioridade, nomecategoria`, 
        [titulo, descricao, dataconclusao, prioridade, nomecategoria, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const tarefa = results.rows[0];
        return new Task(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade,  tarefa.nomecategoria);
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
            return new Task(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.dataconclusao, tarefa.prioridade,  tarefa.nomecategoria);
        }
    } catch (err){
        throw "Erro ao recuperar a tarefa: " + err;
    }
}

module.exports = { getTarefasDB, addTarefaDB, 
    updateTarefaDB, deleteTarefaDB, getTarefaPorCodigoDB }