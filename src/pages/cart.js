import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItem } = useCart();
  const router = useRouter();

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleIncrement = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      const newQuantity = (item.quantity || 1) + 1;
      updateCartItem(id, newQuantity);
    }
  };

  const handleDecrement = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        updateCartItem(id, item.quantity - 1);
      } else {
        handleRemoveItem(id);
      }
    }
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = Math.max(item.quantity || 1, 1); // Default to 1 if quantity is not set or invalid
        return total + price * quantity;
      }, 0)
      .toFixed(2);
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
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h2>
                    <p className="text-gray-500">${(item.price || 0).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-md sm:px-3 sm:py-2 sm:text-base"
                  >
                    -
                  </button>
                  <span className="text-gray-900 font-semibold text-md sm:text-base">
                    {Math.max(item.quantity || 1, 1)}x
                  </span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-md sm:px-3 sm:py-2 sm:text-base"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button
              onClick={handleClearCart}
              className="px-5 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition w-full sm:w-auto text-sm sm:text-base"
            >
              Clear Cart
            </button>

            <div>
              <span className="text-lg font-semibold text-gray-900">
                Total: ${calculateTotalPrice()}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push('/checkout')}
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto text-sm sm:text-base"
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
