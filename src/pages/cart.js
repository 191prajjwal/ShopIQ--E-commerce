import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center flex-col">
          <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-gray-500">${item.price}</p>
                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={handleClearCart}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>

            <div>
              <span className="text-lg font-semibold text-gray-900">
                Total: $
                 {calculateTotalPrice()}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push('/checkout')}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
