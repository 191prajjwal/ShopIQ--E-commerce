import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../utils/fetchProducts';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = async (pageNum) => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(12, pageNum * 12);
      if (data.length > 0) {
        // Prevent duplicating products
        setProducts((prevProducts) => {
          const newProducts = data.filter(
            (newProduct) => !prevProducts.some((existingProduct) => existingProduct.id === newProduct.id)
          );
          return [...prevProducts, ...newProducts];
        });
        setPage(pageNum + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to load products. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts(0);
  }, []);

  const handleShowMore = () => {
    loadProducts(page);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => loadProducts(0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="product-listing grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {loading && hasMore && (
        <div className="text-center py-4">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {hasMore && !loading && (
        <div className="w-full flex justify-center py-6 mt-6">
          <button
            onClick={handleShowMore}
            className="px-16 py-4 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition"
          >
            Show More
          </button>
        </div>
      )}

      {!hasMore && !loading && (
        <div className="text-center py-4">
          <p>No more products available.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
