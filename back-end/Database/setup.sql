-- Criar banco
CREATE DATABASE IF NOT EXISTS Bancotecnico;

-- Criar usuário
CREATE USER IF NOT EXISTS 'dev'@'localhost' IDENTIFIED BY '123456';

-- Permissões
GRANT ALL PRIVILEGES ON Bancotecnico.* TO 'dev'@'localhost';

FLUSH PRIVILEGES;