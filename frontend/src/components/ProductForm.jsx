import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import api from '../services/api';

const ProductForm = () => {
    const { saveProduct } = useProducts();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', stock: '', category: 'Electronica'
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            // Cargar datos si es edicion
            api.get(`/products/${id}`).then(res => setFormData(res.data.data));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await saveProduct(formData, id);
        if (result.success) {
            navigate('/');
        } else {
            // Manejo simple de errores de array del backend
            setErrors(Array.isArray(result.error) ? result.error : [{ msg: 'Error desconocido' }]);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{id ? 'Editar' : 'Crear'} Producto</h2>
            
            {errors.length > 0 && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                    {errors.map((e, i) => <p key={i}>• {e.msg || e.param + ' invalido'}</p>)}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Nombre</label>
                    <input type="text" className="w-full border p-2 rounded" 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                    <label className="block text-gray-700">Descripción</label>
                    <input type="text" className="w-full border p-2 rounded" 
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-gray-700">Precio</label>
                        <input type="number" step="0.01" className="w-full border p-2 rounded" 
                            value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} required />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700">Stock</label>
                        <input type="number" className="w-full border p-2 rounded" 
                            value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} required />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700">Categoría</label>
                    <select className="w-full border p-2 rounded"
                        value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="Electronica">Electronica</option>
                        <option value="Muebles">Muebles</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default ProductForm;