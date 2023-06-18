class Task {
    constructor(codigo, titulo, descricao, dataconclusao, prioridade){
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataconclusao = dataconclusao;
        this.prioridade = prioridade;
    }
}

module.exports = Task;