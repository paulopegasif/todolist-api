class Task {
    constructor(codigo, titulo, descricao, dataconclusao, prioridade, categoria){
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataconclusao = dataconclusao;
        this.prioridade = prioridade;
        this.categoria = categoria;
    }
}

module.exports = Task;