import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Fetch categories from the API
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

  // Handle category selection change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  // Fetch products for the selected category
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

  // Check if a product is in the cart
  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

      {/* Dropdown for selecting categories */}
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

      {/* Show loading spinner or products */}
      {loading ? (
        <div className="text-center">
          <p className="text-lg text-gray-500">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow-md rounded-md hover:shadow-xl transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">
                {product.description.length > 50
                  ? `${product.description.slice(0, 50)}...`
                  : product.description}
              </p>
              <p className="text-blue-600 font-bold mb-4">${product.price}</p>

              {/* Add to Cart / Remove from Cart Button */}
              {isInCart(product.id) ? (
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Display a message if no products are found */}
      {!loading && selectedCategory && products.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
