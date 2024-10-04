import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto text-center">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/Nloperena"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-400 underline-animation"
          >
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nicholas-loperena-022813185/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-blue-400 underline-animation"
          >
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a
            href="/assets/NicholasNicoLoperena-Resume.pdf"
            download="NicholasNicoLoperena-Resume.pdf"  // Forces the browser to download the file
            className="text-2xl hover:text-blue-400 underline-animation"
          >
            <FontAwesomeIcon icon={faFileAlt} /> Resume
          </a>
        </div>

        {/* Copyright Section */}
        <p className="text-gray-400">
          © {new Date().getFullYear()} Nico Loperena. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
