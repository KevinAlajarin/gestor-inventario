-- Crear Base de Datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'InventoryDB')
BEGIN
    CREATE DATABASE InventoryDB;
END
GO

USE InventoryDB;
GO

-- Crear Tabla Products
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Products')
BEGIN
    CREATE TABLE Products (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        description NVARCHAR(255),
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        category NVARCHAR(50) NOT NULL,
        createdAt DATETIME DEFAULT GETDATE(),
        updatedAt DATETIME DEFAULT GETDATE()
    );
END
GO

-- Insertar Datos Semilla 
IF NOT EXISTS (SELECT * FROM Products)
BEGIN
    INSERT INTO Products (name, description, price, stock, category) VALUES
    ('Laptop Gamer', 'Alta performance', 1200.00, 5, 'Electronica'),
    ('Mouse Inalambrico', 'Ergonomico', 25.50, 50, 'Accesorios'),
    ('Monitor 24"', 'Full HD 144hz', 200.00, 8, 'Electronica'),
    ('Teclado Mecanico', 'Switch Blue', 80.00, 15, 'Accesorios'),
    ('Silla de Oficina', 'Ergonomica mesh', 150.00, 20, 'Muebles'),
    ('Escritorio', 'Madera maciza', 300.00, 2, 'Muebles');
END
GO