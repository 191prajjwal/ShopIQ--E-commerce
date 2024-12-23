import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";

const OrderSuccessPage = () => {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const calculateTotalPrice = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total + (item.price || 0) * (item.quantity || 1),
        0
      )
      .toFixed(2);
  };

  const handleRedirectToHome = () => {
    clearCart();
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Order Placed Successfully!
      </h1>
      <p className="text-lg mb-6 text-center">
        Thank you for your order. Your order is being processed, and you'll
        receive an email with the details soon.
      </p>

      <div className="space-y-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
              >
                <div className="flex items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity || 1}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-semibold text-xl text-right">
            Total: ${calculateTotalPrice()}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg mb-4">
            You can go back to the homepage using the button below.
          </p>
          <button
            onClick={handleRedirectToHome}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
