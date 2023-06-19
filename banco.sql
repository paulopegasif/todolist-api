create table tarefas (
	codigo serial primary key, 
	titulo varchar(40) not null, 
	descricao varchar(40) not null, 
	dataconclusao date not null,
	prioridade varchar(10) not null,
	categoria integer not null, 
	foreign key (categoria) references categoria (codigo)
);

INSERT INTO tarefas (titulo, descricao, dataconclusao, prioridade, categoria)
VALUES ('Tarefa 1', 'Descrição da Tarefa 1', '2023-04-30', 'Alta', '1')
RETURNING codigo, titulo, descricao, dataconclusao, prioridade, nomecategoria;




create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);


insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao'),
('paulo@ifsul.edu.br', '123456', 'T','(54)44484-4348','Paulo');


create table categoria (
	codigo serial primary key,
	nome varchar(20) not null
)

insert into categoria (nome) values ('Pessoal'), ('Lazer'), ('Faculdade');