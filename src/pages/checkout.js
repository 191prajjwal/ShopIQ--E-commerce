import { useCart } from "@/context/CartContext"; // Importing useCart hook from context
import { useRouter } from "next/router"; // Importing useRouter hook for routing

const Checkout = () => {
  const { cartItems } = useCart(); // Destructure cartItems from useCart
  const router = useRouter();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Simulate order placement logic here (e.g., calling an API or processing the cart)
    // After successfully placing the order, redirect to order success page
    router.push("/order-success");
  };

  const handleGoHome = () => {
    // Redirect to the homepage
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty! You cannot checkout without items in your cart.</p>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-xl mb-2">Order Summary</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total: ${calculateTotalPrice()}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Place order
            </button>
          </div>

          {/* Go to Home Button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleGoHome}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
