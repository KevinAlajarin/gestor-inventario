import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import StockAlertBanner from './components/StockAlertBanner';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sistema de Gestión de Inventario</h1>
        <StockAlertBanner />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;