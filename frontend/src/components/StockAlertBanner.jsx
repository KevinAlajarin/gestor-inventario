import { useProducts } from "../context/ProductContext";

const StockAlertBanner = () => {
    const { lowStockItems } = useProducts();

    if (!lowStockItems || lowStockItems.length === 0) return null;

    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">⚠️ Atención: Stock Bajo</p>
            <p>Hay {lowStockItems.length} productos por debajo del nivel mínimo.</p>
        </div>
    );
};

export default StockAlertBanner;