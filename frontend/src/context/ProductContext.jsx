import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lowStockItems, setLowStockItems] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [filters, setFilters] = useState({ category: '', page: 1 });

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            params.append('page', filters.page);
            params.append('limit', 10);

            const res = await api.get(`/products?${params.toString()}`);
            setProducts(res.data.data);
            setPagination(res.data.pagination);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const checkLowStock = async () => {
        try {
            const res = await api.get('/products/low-stock');
            setLowStockItems(res.data.data);
        } catch (console) {
            console.error("Error checking stock");
        }
    };

    // Crear producto
    const saveProduct = async (productData, id = null) => {
        try {
            if (id) {
                await api.put(`/products/${id}`, productData);
            } else {
                await api.post('/products', productData);
            }
            await fetchProducts(); // Recargar lista
            await checkLowStock(); // Recargar alertas
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.errors || err.message };
        }
    };

    // Eliminar
    const deleteProduct = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
        try {
            await api.delete(`/products/${id}`);
            await fetchProducts();
        } catch (err) {
            alert('Error al eliminar');
        }
    };

    useEffect(() => {
        fetchProducts();
        checkLowStock();
    }, [fetchProducts]);

    return (
        <ProductContext.Provider value={{
            products,
            loading,
            error,
            lowStockItems,
            pagination,
            filters,
            setFilters,
            saveProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};