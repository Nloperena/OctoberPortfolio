import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">About Me</h2>
        <p className="text-gray-700 text-center mb-6">
          I'm Nico, a frontend software engineer with a background in tech, design, and marketing. I love building beautiful,
          interactive websites and applications. My skills range from web development, graphic design, to 3D motion graphics.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
