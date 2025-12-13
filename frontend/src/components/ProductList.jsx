import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const ProductList = () => {
    const { products, loading, error, deleteProduct, filters, setFilters, pagination } = useProducts();

    if (loading) return <div className="text-center p-4">Cargando inventario...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Inventario</h2>
                <div className="flex gap-4">
                    <select 
                        value={filters.category}
                        onChange={(e) => setFilters({...filters, category: e.target.value, page: 1})}
                        className="border rounded p-2"
                    >
                        <option value="">Todas las categorías</option>
                        <option value="Electronica">Electronica</option>
                        <option value="Muebles">Muebles</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                    <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        + Nuevo Producto
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.name}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                                        <span aria-hidden className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                                        <span className="relative">{product.category}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${product.price}</td>
                                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${product.stock < 10 ? 'text-red-600 font-bold' : ''}`}>
                                    {product.stock}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link to={`/edit/${product.id}`} className="text-blue-600 hover:text-blue-900 mr-4">Editar</Link>
                                    <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Pagination pagination={pagination} setFilters={setFilters} />
        </div>
    );
};

export default ProductList;