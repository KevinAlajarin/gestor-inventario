USE InventoryDB;
GO

-- Procedimiento para obtener resumen del dashboard
CREATE OR ALTER PROCEDURE sp_GetDashboardStats
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        (SELECT COUNT(*) FROM Products) as TotalProducts,
        (SELECT SUM(stock) FROM Products) as TotalStockUnits,
        (SELECT COUNT(*) FROM Products WHERE stock < 10) as LowStockAlerts,
        (SELECT TOP 1 category FROM Products GROUP BY category ORDER BY COUNT(*) DESC) as TopCategory;
END
GO