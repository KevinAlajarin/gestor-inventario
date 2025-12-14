# 📦 Sistema de Gestión de Inventario Full-Stack

![Status](https://img.shields.io/badge/Status-Completed-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v18-blue)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2019%2F2022-red)
![Power BI](https://img.shields.io/badge/Power%20BI-Integrated-yellow)

Objetivo del proyecto:    
Diseñar una solución full-stack para la gestión de inventarios con foco en escalabilidad, separación de responsabilidades y análisis operativo mediante BI.

Una solución robusta y escalable para la administración de inventarios, desarrollada con una arquitectura **MVC** en el backend y una interfaz moderna en React. Incluye alertas de stock bajo en tiempo real, paginación, filtros avanzados y un módulo de integración con **Power BI** para Business Intelligence.

Flujo de la API

Client (React)     
       ↓       
REST API (Express)      
       ↓       
SQL Server (Pool de conexiones)       
       ↓      
Power BI (KPIs)      

---

## 🚀 Características Principales

### ⚙️ Backend (Node.js & Express)
- **Arquitectura MVC:** Separación clara de responsabilidades (Modelos, Controladores, Rutas).
- **API RESTful:** Endpoints estandarizados con verbos HTTP correctos.
- **SQL Server Integration:** Uso de `mssql` con **Connection Pooling** para alto rendimiento.
- **Validaciones Robustas:** Middleware con `express-validator` para integridad de datos.
- **Manejo de Errores Centralizado:** Middleware global para captura y respuesta de excepciones.
- **Lógica de Negocio:** Alertas automáticas de stock crítico y seeders de datos masivos.

### 💻 Frontend (React & Vite)
- **Gestión de Estado:** Implementación de `Context API` para un flujo de datos global y limpio.
- **Componentización:** UI modular (ProductItem, ProductList, Alerts).
- **Estilos:** Diseño responsivo y profesional utilizando **Tailwind CSS**.
- **UX:** Feedback visual al usuario (Alertas, Spinners de carga, Modales).

### 📊 Data Analytics (Power BI)
- **Dashboard Operativo:** Conexión directa a la base de datos para visualización de KPIs.
- **Métricas Clave:** Valor total del inventario, distribución por categoría y detección de quiebres de stock.


### 📊 Proximas mejoras:
 - Autenticación y roles (admin / user)
 - Soft delete
 - Auditoría de cambios
 - Deploy en la nube
 - Tests de integración
---

## 🛠️ Stack Tecnológico

| Área | Tecnología | Uso |
|------|------------|-----|
| **Backend** | Node.js, Express | Servidor y API REST |
| **Database** | SQL Server (MSSQL) | Persistencia de datos relacional |
| **Frontend** | React, Vite | SPA (Single Page Application) |
| **Estilos** | Tailwind CSS | Diseño y Maquetación |
| **HTTP Client** | Axios | Consumo de API |
| **DevOps/Tools** | Git, Postman, Power BI | Control de versiones y Análisis |

---

<img width="1119" height="703" alt="image" src="https://github.com/user-attachments/assets/dc78d154-c17d-4674-b8db-8d20be20e727" />


## 📂 Estructura del Proyecto

```text
inventory-management-api/
│
├── backend/
│   ├── src/
│   │   ├── config/       # Configuración DB (Pool conexiones)
│   │   ├── controllers/  # Lógica de los endpoints
│   │   ├── models/       # Queries SQL directas
│   │   ├── routes/       # Definición de rutas API
│   │   ├── middleware/   # Validaciones y Error Handling
│   │   └── utils/        # ApiFeatures (Paginación/Filtros)
│   └── scripts/          # DDL, Stored Procedures y Seeders
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── context/      # Estado global (ProductContext)
│   │   ├── services/     # Configuración Axios
│   │   └── pages/        # Vistas principales
│   └── index.html        # Entry point
```
```text
🔧 Instalación y Ejecución:
Sigue estos pasos para levantar el entorno de desarrollo localmente.
1. Base de Datos (SQL Server): Asegúrate de tener una instancia de SQL Server corriendo (Local o Docker).  
Habilita el protocolo TCP/IP y verifica el puerto (por defecto 1433).  
Ejecuta el script de inicialización ubicado en backend/scripts/init-database.sql.(Opcional)  
Ejecuta el script generador de datos para poblar la tabla con 100 productos de prueba. 
2. Configuración del Backend
Navega a la carpeta backend, crea un archivo .env basado en el .env.example y configura tus credenciales:

Bashcd backend 
npm install
Archivo .env:Ini, TOMLPORT=5000
NODE_ENV=development
DB_USER=sa
DB_PASSWORD=TuPasswordSeguro
DB_SERVER=localhost
DB_NAME=InventoryDB
DB_PORT=1433
STOCK_THRESHOLD=10

Ejecuta el servidor:Bashnpm run dev
Deberías ver: ✅ Conectado a SQL Server en puerto 14333. 

Configuración del Frontend 
Navega a la carpeta frontend:
Bashcd frontend
npm install
npm run dev
```
Desarrollado por Kevin ALajarin - 2025
