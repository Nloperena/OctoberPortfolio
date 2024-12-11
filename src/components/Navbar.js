import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaQuoteRight } from 'react-icons/fa'; // Import the icon
import { motion } from 'framer-motion';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Generate star data for the background
  const generateStars = (count) =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2,
    }));

  const stars = generateStars(30);

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className="fixed top-0 left-0 w-full bg-[#2F2504] text-[#D0DDD7] p-4 flex justify-between items-center shadow-lg z-[2147483647] overflow-hidden"
        style={{ background: 'radial-gradient(circle at top, #2F2504, #1a202c)' }}
      >
        {/* Twinkling Stars */}
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [0, star.opacity, 0],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: star.delay,
            }}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="#fff" />
            </svg>
          </motion.div>
        ))}

        <div className="font-bold text-xl md:text-2xl lg:text-3xl">
          <Link
            to="/"
            className="hover:text-[#8EF9F3] transition-colors duration-300"
          >
            Dad Hat Hub
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="hover:text-[#8EF9F3] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:text-[#8EF9F3] transition-colors duration-300"
          >
            Shop
          </Link>
          <Link
            to="/testimonials"
            className="hover:text-[#8EF9F3] transition-colors duration-300 flex items-center"
          >
            <FaQuoteRight className="mr-2" /> Testimonials
          </Link>
          <Link
            to="/checkout"
            className="hover:text-[#8EF9F3] transition-colors duration-300"
          >
            Checkout
          </Link>
          <button onClick={toggleCart} className="relative focus:outline-none">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#8EF9F3] text-[#2F2504] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Cart Icon and Menu Icon */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleCart} className="relative focus:outline-none">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8EF9F3] text-[#2F2504] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="text-2xl focus:outline-none hover:text-[#8EF9F3] transition-colors duration-300"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Links */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#2F2504] text-[#D0DDD7] py-4 space-y-4 flex flex-col items-center md:hidden">
            <Link
              to="/"
              onClick={toggleMobileMenu}
              className="hover:text-[#8EF9F3] transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={toggleMobileMenu}
              className="hover:text-[#8EF9F3] transition-colors duration-300"
            >
              Shop
            </Link>
            <Link
              to="/testimonials"
              onClick={toggleMobileMenu}
              className="hover:text-[#8EF9F3] transition-colors duration-300 flex items-center"
            >
              <FaQuoteRight className="mr-2" /> Testimonials
            </Link>
            <Link
              to="/checkout"
              onClick={toggleMobileMenu}
              className="hover:text-[#8EF9F3] transition-colors duration-300"
            >
              Checkout
            </Link>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />

      {/* Adding padding to the top of the content so it doesn't get hidden behind the sticky navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
