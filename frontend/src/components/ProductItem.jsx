import { Link } from 'react-router-dom';

const ProductItem = ({ product, onDelete }) => {
    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                            {product.name}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                    <span aria-hidden="true" className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative">{product.category}</span>
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">${product.price}</p>
            </td>
            <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm`}>
                <span className={`px-2 py-1 rounded ${product.stock < 10 ? 'bg-red-100 text-red-600 font-bold' : 'text-gray-900'}`}>
                    {product.stock}
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex gap-3">
                    <Link 
                        to={`/edit/${product.id}`} 
                        className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                        Editar
                    </Link>
                    <button 
                        onClick={() => onDelete(product.id)} 
                        className="text-red-600 hover:text-red-900 font-medium"
                    >
                        Borrar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ProductItem;