# Inventory Management Frontend

Aplicación React construida con Vite y estilizada con Tailwind CSS.

## Estructura de Componentes

- **Context API:** `ProductContext` maneja el estado global (CRUD, filtros, paginación).
- **ProductList:** Vista principal tipo tabla.
- **ProductItem:** Componente de presentación para cada fila de la tabla.
- **ProductForm:** Formulario reutilizable para creación y edición.
- **StockAlertBanner:** Componente condicional que alerta sobre stock crítico.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:5173`.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
- `npm run preview`: Previsualiza la build de producción localmente.

## Configuración

Asegúrate de que el archivo `src/services/api.js` apunte al puerto correcto de tu backend (por defecto 5000).