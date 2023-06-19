const { pool } = require('../config')
const Categoria = require('../entities/categoria')

const getCategoriasDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM categoria ORDER BY nome');
        return rows.map((categoria) => new Categoria(categoria.codigo, categoria.nome));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addCategoriaDB = async (body) => {
    try {
        const { nome } = body;
        const results = await pool.query(`INSERT INTO categoria (nome) VALUES ($1) 
            RETURNING codigo, nome`, 
            [nome]);
        const categoria = results.rows[0];
        return new Categoria(categoria.codigo, categoria.nome);
    } catch (err){
        throw "Erro ao inserir categoria: " + err;
    }
}

const updateCategoriaDB = async (body) => {
    try {
        const { codigo, nome } = body;
        const results = await pool.query(`UPDATE categoria SET nome=$1 WHERE codigo=$2 
        RETURNING codigo, nome`, 
            [nome, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const categoria = results.rows[0];
        return new Categoria(categoria.codigo, categoria.nome);
    } catch (err){
        throw "Erro ao alterar categoria: " + err;
    }
}

const deleteCategoriaDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM categoria 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Categoria de código ${codigo} removida com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover categoria: " + err;
    }
}

const getCategoriaPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM categoria 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const categoria = results.rows[0];
        return new Categoria(categoria.codigo, categoria.nome);
        }
    } catch (err){
        throw "Erro ao recuperar o prédio: " + err;
    }
}





module.exports = { getCategoriasDB, addCategoriaDB,
    updateCategoriaDB, deleteCategoriaDB, getCategoriaPorCodigoDB }