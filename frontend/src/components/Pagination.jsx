const Pagination = ({ pagination, setFilters }) => {
    const { page, totalPages } = pagination;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setFilters(prev => ({ ...prev, page: newPage }));
        }
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
                Anterior
            </button>
            <span className="px-4 py-2">Página {page} de {totalPages}</span>
            <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;