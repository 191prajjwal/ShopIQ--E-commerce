import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext'; 
import { fetchProductById } from '../../utils/fetchProducts'; 

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p className="text-lg mb-4">Product not found.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

 
  const isInCart = cartItems.some(item => item.id === product.id);


  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
    setAddedToCart(!addedToCart);
  };

 
  const goToCart = () => {
    router.push('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap lg:flex-nowrap justify-between">
        
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto object-contain rounded-lg shadow-lg max-w-[300px]"
          />
        </div>

       
        <div className="w-full lg:w-2/3 pl-4 flex flex-col justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mb-4">${product.price}</p>

         
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 17.09l4.19 2.21-1.11-4.78L20 9.47h-5.19L12 4.5l-2.81 4.97H4l3.92 4.05-1.11 4.78L12 17.09z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
            <span className="ml-2 text-gray-500">({product.rating})</span>
          </div>

        
          <p className="text-sm text-gray-500 mb-4">Availability: {product.availabilityStatus}</p>
          <p className="text-sm text-gray-500 mb-4">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          <p className="text-sm text-gray-500 mb-4">Minimum Order: {product.minimumOrderQuantity}</p>
          <p className="text-sm text-gray-500 mb-4">Return Policy: {product.returnPolicy}</p>

         
          <div className="mb-4">
            {!isInCart ? (
              <button
                onClick={toggleCart}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={toggleCart}
                className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove from Cart
              </button>
            )}
          </div>

        
          {isInCart && (
            <button
              onClick={goToCart}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-4"
            >
              Go to Cart
            </button>
          )}

        
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
     
        <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews?.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex items-center mb-2">
                <span className="font-semibold text-lg">{review.reviewerName}</span>
                <div className="flex ml-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 17.09l4.19 2.21-1.11-4.78L20 9.47h-5.19L12 4.5l-2.81 4.97H4l3.92 4.05-1.11 4.78L12 17.09z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
              <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
