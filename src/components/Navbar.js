import Link from 'next/link';
import { useState, useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from react-icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext); // Access cart items from context

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="text-blue-600">
            ShopIQ
          </Link>
        </div>

        {/* Hamburger Icon (Mobile View) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/categories" className="hover:text-blue-600">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
          {/* Cart Icon with Hover Tooltip */}
          <li className="relative group">
            <Link href="/cart" className="flex items-center hover:text-blue-600">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg py-2 px-4">
              Go to Cart
            </div>
          </li>
        </ul>

        {/* Mobile Menu */}
        <ul
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-white shadow-md md:hidden`}
        >
          <li className="border-b">
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/categories"
              className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {/* Cart Link */}
          <li className="border-b">
            <Link
              href="/cart"
              className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Cart ({cartItems.length})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
