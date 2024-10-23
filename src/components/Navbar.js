import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // Add sticky state
  const [navbarHeight, setNavbarHeight] = useState(0); // Store navbar height

  // Toggle visibility for mobile menu
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Add scroll event listener to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get navbar height and set it to state
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <>
      {/* Placeholder div to prevent content jumping */}
      <div style={{ height: isSticky ? `${navbarHeight}px` : '0px' }}></div>

      <nav className={`p-5 w-full z-10 transition-all duration-500 ease-in-out ${isSticky ? 'fixed top-0 bg-black bg-opacity-80 shadow-lg' : 'relative bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Brand */}
          <div className="text-white text-2xl font-bold">
            <Link to="/" className="hover:text-blue-400">Nico's Portfolio</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-white text-lg">
            <Link to="/" className="hover:text-blue-400">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/projects" className="hover:text-blue-400">
              <FontAwesomeIcon icon={faProjectDiagram} /> Projects
            </Link>
            <button
              onClick={onContactClick}  // Use onContactClick to trigger modal
              className="hover:text-blue-400 focus:outline-none"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-2xl" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden fixed inset-0 bg-black bg-opacity-90 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Close Button */}
          <button 
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Centered Menu Links */}
          <div className="flex flex-col justify-center items-center h-full space-y-5">
            <Link 
              to="/" 
              className={`text-white text-2xl transition-opacity duration-500 ${isVisible ? 'opacity-100 delay-100' : 'opacity-0'}`}
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
            </Link>
            <Link 
              to="/projects" 
              className={`text-white text-2xl transition-opacity duration-500 ${isVisible ? 'opacity-100 delay-200' : 'opacity-0'}`}
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" /> Projects
            </Link>
            <button 
              className={`text-white text-2xl transition-opacity duration-500 ${isVisible ? 'opacity-100 delay-300' : 'opacity-0'}`}
              onClick={() => {
                setIsOpen(false);  // Close the mobile menu
                onContactClick();  // Trigger the modal
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
