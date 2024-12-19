import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from 'next/router';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/categories");
        const data = await response.json();

        if (Array.isArray(data)) {
          setCategories(data.map((cat) => (typeof cat === "object" ? cat.name : cat)));
        } else {
          console.error("Unexpected categories data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();

      if (data.products) {
        setProducts(data.products);
      } else {
        console.error("Unexpected products data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  const viewDetails = (id) => {
    router.push(`/product-details/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

      <div className="max-w-md mx-auto mb-8">
        <select
          id="categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            -- Select a Category --
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {typeof category === "string"
                ? category.charAt(0).toUpperCase() + category.slice(1)
                : category}
            </option>
          ))}
        </select>
      </div>

      {!selectedCategory && !loading && (
        <div className="text-center mb-8">
          <p className="text-lg text-gray-500">Select a category to view products</p>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <p className="text-lg text-gray-500">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-xl transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-contain rounded-md mb-4"
              />
              <h2 className="text-sm font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">
                {product.description.length > 50
                  ? `${product.description.slice(0, 50)}...`
                  : product.description}
              </p>
              <p className="text-blue-600 font-bold mb-4">${product.price}</p>

              <div className="flex mb-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
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

              <div className="flex justify-between">
                {isInCart(product.id) ? (
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  onClick={() => viewDetails(product.id)}
                  className="py-2 px-4 bg-green-500 text-gray-700 font-semibold rounded-md hover:bg-green-600 transition-colors ml-[1px]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && selectedCategory && products.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
