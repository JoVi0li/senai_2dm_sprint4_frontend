CREATE DATABASE WishList
GO

CREATE TABLE Desejo(
	idDesejo int primary key identity,
	descricao varchar(250)
);
GO

CREATE TABLE Usuario(
	idUsuario int primary key identity,
	idDesejo int foreign key references Desejo(idDesejo),
	email varchar(250),
	senha varchar(250)
);
GO