// src/components/SpecialOffer.js

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      type: 'spring', stiffness: 100, damping: 15, staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      type: 'spring', stiffness: 100, damping: 15,
    },
  },
};

const buttonHover = {
  hover: { scale: 1.05, boxShadow: '0px 0px 15px rgba(255,165,0,0.5)' },
  tap: { scale: 0.95 },
};

const SpecialOffer = ({ openModal }) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={childVariants}
            style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)' }}
          >
            Enjoy Reduced Rates While I Grow My Business!
          </motion.h2>
          <motion.p
            className="text-lg md:text-2xl mb-8"
            variants={childVariants}
            style={{ color: 'white', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }}
          >
            I'm currently offering my web design services at a discounted rate until my schedule fills up. It's a great opportunity to get a custom website at an exceptional value!
          </motion.p>
          <motion.div
            variants={childVariants}
            className="flex justify-center"
          >
            <motion.button
              onClick={openModal}
              className="px-8 py-4 bg-gradient-to-r from-red-500 via-yellow-500 to-yellow-600 text-white text-xl font-semibold rounded-lg shadow-lg flex items-center justify-center space-x-2"
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
            >
              <FontAwesomeIcon icon={faGlobe} />
              <span>Get Started Now</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffer;
