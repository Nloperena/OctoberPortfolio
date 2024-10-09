import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Start fade-in animation when menu opens
    } else {
      setIsVisible(false); // Hide elements when menu closes
    }
  }, [isOpen]);

  return (
    <nav className="bg-black bg-opacity-80 p-5 fixed top-0 w-full z-10">
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
          <Link to="/contact" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </Link>
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
          <Link 
            to="/contact" 
            className={`text-white text-2xl transition-opacity duration-500 ${isVisible ? 'opacity-100 delay-300' : 'opacity-0'}`}
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
