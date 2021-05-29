USE WishList
GO

INSERT INTO Desejo(descricao) values
('Eu quero ter uma moto'),
('Ser advogada');
GO

INSERT INTO Usuario(idDesejo, email, senha) values
(1, 'tolentinogustavo@gmail.com', 'qwerty'),
(2, 'gustavo@versatilis.com.br', 'qwerty');
GO

select * from Desejo

select * from Usuario
right join Desejo