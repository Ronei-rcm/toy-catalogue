-- Create the database
CREATE DATABASE IF NOT EXISTS toy_catalogue;
USE toy_catalogue;

-- Create tables
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    imageUrl VARCHAR(255),
    userId INT NOT NULL,
    categoryId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (categoryId) REFERENCES Category(id)
);

-- Insert some initial categories
INSERT INTO Category (name, description) VALUES
    ('Brinquedos Educativos', 'Brinquedos que estimulam o aprendizado'),
    ('Jogos de Tabuleiro', 'Jogos para toda a família'),
    ('Bonecos e Figuras de Ação', 'Personagens favoritos das crianças'),
    ('Veículos', 'Carrinhos, aviões e outros veículos'),
    ('Pelúcias', 'Bichinhos de pelúcia fofos e macios');

-- Create indexes for better performance
CREATE INDEX idx_product_user ON Product(userId);
CREATE INDEX idx_product_category ON Product(categoryId);
CREATE INDEX idx_user_email ON User(email); 