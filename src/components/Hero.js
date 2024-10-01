// src/components/Hero.js

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import heroImg from '../assets/heroImg.jpg'; // Ensure this path is correct

const Hero = () => {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showGetInTouch, setShowGetInTouch] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // For hover effect

  useEffect(() => {
    // Trigger the animations after the headline finishes
    const timers = [
      setTimeout(() => setShowSubheading(true), 2000),
      setTimeout(() => setShowGetInTouch(true), 3000),
      setTimeout(() => setShowIcons(true), 4000),
    ];
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleHireMeClick = () => {
    setShowForm(true); // Show the contact form when "Connect with me" is clicked
  };

  const handleCloseForm = () => {
    setShowForm(false); // Hide the contact form
  };

  return (
    <header className="relative flex items-center justify-center min-h-screen bg-black text-white pt-16 z-0">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ filter: 'blur(0.1px)', opacity: 0.6 }}
        animate={{ filter: 'blur(0.1px)', opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Glassmorphism Content Container */}
      <motion.div
        className="relative flex flex-col items-start justify-center w-full max-w-5xl p-6 md:p-10 z-10 rounded-xl"
        layout
        style={{
          background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
          boxShadow: isHovered
            ? '0 12px 60px rgba(0, 0, 0, 0.7)' // Harsher shadow on hover
            : '0 8px 50px rgba(0, 0, 0, 0.5)', // Subtle shadow initially
          backdropFilter: isHovered ? 'none' : 'blur(10px)', // Remove blur on hover
          border: '1px solid rgba(255, 255, 255, 0.18)', // Light border for emphasis
          transition: 'backdrop-filter 0.4s ease, box-shadow 0.4s ease', // Smooth transition for hover effects
        }}
        onMouseEnter={() => setIsHovered(true)} // Activate hover effect
        onMouseLeave={() => setIsHovered(false)} // Deactivate hover effect
      >
        {/* Headline - Focused on Customer Results */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          layout
          style={{
            color: "#fff", // Bright white color
            textShadow: "4px 4px 12px rgba(0, 0, 0, 0.8)", // Stronger shadow for better contrast
          }}
        >
          Get a High-Converting Website That Drives Results
        </motion.h1>

        {/* Subheading */}
        <AnimatePresence>
          {showSubheading && (
            <motion.p
              className="text-xl md:text-4xl text-white font-semibold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
              layout
              style={{
                color: "rgba(255, 255, 255, 0.9)", // High contrast white color
                textShadow: "3px 3px 12px rgba(0, 0, 0, 0.8)", // Shadow for better contrast
              }}
            >
              I specialize in building websites that convert visitors into customers.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Let's Get In Touch Text */}
        <AnimatePresence>
          {showGetInTouch && (
            <motion.p
              className="text-lg md:text-3xl text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
              layout
              style={{
                textAlign: 'left',
              }}
            >
              Let's get in touch to complete your next project.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <AnimatePresence>
          {showIcons && (
            <motion.div
              className="flex space-x-4 md:space-x-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
              layout
            >
              <a
                href="https://www.linkedin.com/in/nicholas-loperena-022813185/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn Profile"
              >
                <motion.div
                  className="p-3 md:p-4 bg-blue-700 text-white rounded-full group-hover:bg-blue-600 transition-transform transform"
                  whileHover={{ scale: 1.2 }} // Enlarge on hover
                  transition={{ type: 'spring', stiffness: 300 }}
                  layout
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-2xl md:text-3xl group-hover:text-gray-100 transition-colors"
                  />
                </motion.div>
              </a>

              <a
                href="https://github.com/Nloperena"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub Profile"
              >
                <motion.div
                  className="p-3 md:p-4 bg-gray-800 text-white rounded-full group-hover:bg-gray-700 transition-transform transform"
                  whileHover={{ scale: 1.2 }} // Enlarge on hover
                  transition={{ type: 'spring', stiffness: 300 }}
                  layout
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="text-2xl md:text-3xl group-hover:text-gray-100 transition-colors"
                  />
                </motion.div>
              </a>

              <a
                href="./assets/Resume-Nicholas Loperena.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Download Resume"
              >
                <motion.div
                  className="p-3 md:p-4 bg-red-600 text-white rounded-full group-hover:bg-red-500 transition-transform transform"
                  whileHover={{ scale: 1.2 }} // Enlarge on hover
                  transition={{ type: 'spring', stiffness: 300 }}
                  layout
                >
                  <FontAwesomeIcon
                    icon={faFile}
                    className="text-2xl md:text-3xl group-hover:text-gray-100 transition-colors"
                  />
                </motion.div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Connect with me Button */}
        <AnimatePresence>
          {showIcons && (
            <motion.button
              className="bg-blue-600 hover:bg-blue-500 text-white py-4 px-8 rounded-lg transition duration-300 mb-8 text-lg md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
              layout
              whileHover={{ scale: 1.1 }} // Slightly enlarge on hover
              onClick={handleHireMeClick}
            >
              Connect with me
            </motion.button>
          )}
        </AnimatePresence>

        {/* Contact Form Overlay */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-full max-w-lg p-6 bg-gray-800 bg-opacity-90 rounded-lg backdrop-blur-md shadow-2xl relative"
                initial={{ x: '-100%' }} // Slide in from the left
                animate={{ x: '0%' }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <h2 className="text-3xl font-bold mb-4 text-white">Let's Talk</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 bg-opacity-70 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 bg-opacity-70 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 text-white">
                      Message
                    </label>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 bg-opacity-70 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                      placeholder="Your message..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-lg transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-2xl"
                  onClick={handleCloseForm}
                  aria-label="Close Contact Form"
                >
                  &times;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Hero;
