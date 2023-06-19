class Task {
    constructor(codigo, titulo, descricao, dataconclusao, prioridade, nomecategoria){
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataconclusao = dataconclusao;
        this.prioridade = prioridade;
        this.nomecategoria = nomecategoria;
    }
}

module.exports = Task;