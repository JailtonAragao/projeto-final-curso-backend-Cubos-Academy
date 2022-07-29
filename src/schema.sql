create table usuarios (
	id serial primary key,
	nome varchar(100) not null,
	email varchar(100) not null unique,
	senha text not null
);

create table categorias (
	id serial primary key,
	descricao text not null
);

insert into categorias (descricao)
values ('Informática');
insert into categorias (descricao)
values ('Celulares');
insert into categorias (descricao)
values ('Beleza e Perfumaria');
insert into categorias (descricao)
values ('Mercado');
insert into categorias (descricao)
values ('Livros e Papelaria');
insert into categorias (descricao)
values ('Brinquedos');
insert into categorias (descricao)
values ('Moda');
insert into categorias (descricao)
values ('Bebê');
insert into categorias (descricao)
values ('Games');


create table produtos (
	id serial primary key,
	descricao text not null,
	quantidade_estoque int not null,
	valor int not null,
	categoria_id int not null,
	foreign key (categoria_id) references categorias(id)
);

create table clientes (
	id serial primary key,
	nome varchar(100) not null,
	email varchar(100) not null unique,
	cpf varchar(11) not null unique,
	cep int,
	rua text,
	numero int,
	bairro text,
	cidade text,
	estado varchar(2)
);