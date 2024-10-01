import React, { useState } from 'react';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons'; // Correct icon for file (PDF)

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="relative flex flex-col items-center justify-center h-screen text-white bg-black">
      {/* Hero Content */}
      <div className="z-10 text-center mt-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          Hellooo! I'm Nico 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          I want to help you solve your problems. I am a <span className="font-bold">Frontend Software Engineer</span> with a background in tech, design, and marketing.
          <br />
          Here's a bit more <span className="font-bold cursor-pointer underline" onClick={toggleModal}>about me</span>.
        </p>

        {/* Redesigned Social Links */}
        <div className="flex justify-center space-x-6 mt-6">
          <a
            href="https://www.linkedin.com/in/nicholas-loperena-022813185/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-4 bg-blue-700 text-white rounded-full group-hover:bg-blue-600 transition-transform transform group-hover:scale-110">
              <FontAwesomeIcon icon={faLinkedin} className="text-3xl group-hover:text-gray-100 transition-colors" />
            </div>
          </a>

          <a
            href="https://github.com/Nloperena"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-4 bg-gray-800 text-white rounded-full group-hover:bg-gray-700 transition-transform transform group-hover:scale-110">
              <FontAwesomeIcon icon={faGithub} className="text-3xl group-hover:text-gray-100 transition-colors" />
            </div>
          </a>

          <a
            href="./assets/Resume-Nicholas Loperena.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-4 bg-red-600 text-white rounded-full group-hover:bg-red-500 transition-transform transform group-hover:scale-110">
              <FontAwesomeIcon icon={faFile} className="text-3xl group-hover:text-gray-100 transition-colors" />
            </div>
          </a>
        </div>
      </div>

      {/* Profile Image */}
      <div className="mt-10">
        <img src={require('../assets/PFP.jpeg')} alt="Portrait of Nico" className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white" />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
};

export default Hero;
