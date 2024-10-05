import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faDollarSign, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-80 p-5 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400">Nico's Portfolio</Link>
        </div>

        {/* Nav Links */}
        <div className="space-x-8 text-white text-lg">
          <Link to="/" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link to="/projects" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faProjectDiagram} /> Projects
          </Link>
          {/* <Link to="/pricing" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faDollarSign} /> Pricing
          </Link> */}
          <Link to="/contact" className="hover:text-blue-400">
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
