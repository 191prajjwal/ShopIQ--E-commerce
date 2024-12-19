import Link from 'next/link';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from 'react-icons/fa'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext); 
  const router = useRouter(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getLinkClass = (path) =>
    router.pathname === path
      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-2 rounded-lg shadow-md'
      : 'hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg';

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
    
        <div className="text-2xl font-bold">
          <Link href="/" className="text-blue-600">
            ShopIQ
          </Link>
        </div>

       
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

      
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className={getLinkClass('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/categories" className={getLinkClass('/categories')}>
              Categories
            </Link>
          </li>
          <li>
            <Link href="/about" className={getLinkClass('/about')}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={getLinkClass('/contact')}>
              Contact
            </Link>
          </li>
        
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

       
        <ul
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-white shadow-md md:hidden`}
        >
          <li className="border-b">
            <Link
              href="/"
              className={getLinkClass('/')}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/categories"
              className={getLinkClass('/categories')}
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/about"
              className={getLinkClass('/about')}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={getLinkClass('/contact')}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="border-b">
            <Link
              href="/cart"
              className={getLinkClass('/cart')}
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
