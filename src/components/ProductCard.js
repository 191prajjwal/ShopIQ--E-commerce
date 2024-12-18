import { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [isInCart, setIsInCart] = useState(cartItems.some(item => item.id === product.id));

  // Function to render star rating based on product rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    // Creating an array to store the stars
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) stars.push('full');
    for (let i = 0; i < halfStars; i++) stars.push('half');
    for (let i = 0; i < emptyStars; i++) stars.push('empty');

    return stars;
  };

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
      setIsInCart(false);
    } else {
      addToCart(product);
      setIsInCart(true);
    }
  };

  return (
    <div className="product-card max-w-xs w-full p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="image-container mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </p>
        <p className="text-lg font-semibold text-gray-900 mb-4">${product.price}</p>

        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          {renderStars(product.rating).map((star, index) => (
            <span key={index} className={`star ${star}`}>
              {star === 'full' && <span className="text-yellow-400">&#9733;</span>} 
              {star === 'half' && <span className="text-yellow-400">&#9733;</span>}
              {star === 'empty' && <span className="text-gray-400">&#9733;</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Button Group */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-2 px-4 rounded-lg text-white transition-colors ${
            isInCart ? 'bg-gray-500 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isInCart ? 'Remove' : 'Add to Cart'}
        </button>
        <Link href={`/product-details/${product.id}`} passHref>
          <button className="flex-1 py-2 px-4 rounded-lg bg-green-500 text-white text-center hover:bg-green-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
