// src/components/HeroSection.js

import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

// Create Contentful client
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
      type: 'spring',
      stiffness: 120,
      damping: 12,
      ease: 'easeOut',
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
      duration: 0.4,
    },
  },
};

const buttonHover = {
  hover: { scale: 1.05, boxShadow: '0px 0px 10px rgba(0, 0, 255, 0.5)' },
  tap: { scale: 0.95 },
};

// Floating animation for the main content
const floatingAnimation = {
  y: [0, -10, 0], // Move up by 10px and back
  transition: {
    duration: 4,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

const HeroSection = ({ openModal }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from Contentful
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await client.getEntries({ content_type: 'portfolioProjects' });
        const fetchedImages = response.items.map((item) => {
          const imageUrl = item.fields.projectHeader?.fields?.file?.url
            ? `https:${item.fields.projectHeader.fields.file.url}`
            : null;
          const projectUrl = item.fields.link?.content?.[0]?.content?.[0]?.value || '#';
          return { imageUrl, projectUrl };
        });
        setImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchHeroImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>Error loading images: {error.message}</div>;
  }

  return (
    <>
      <motion.header
        className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 text-white pt-16 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Background Spheres */}
        {[
          // Array of spheres with their properties
          { size: 200, x: '10%', y: '20%', delay: 0, zIndex: 0, opacity: 0.2 },
          { size: 300, x: '70%', y: '30%', delay: 1, zIndex: 2, opacity: 0.15 },
          { size: 150, x: '50%', y: '70%', delay: 0.5, zIndex: 0, opacity: 0.25 },
          { size: 250, x: '80%', y: '80%', delay: 1.5, zIndex: 2, opacity: 0.2 },
          { size: 100, x: '20%', y: '80%', delay: 2, zIndex: 0, opacity: 0.3 },
        ].map((sphere, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
            style={{
              width: sphere.size,
              height: sphere.size,
              left: sphere.x,
              top: sphere.y,
              zIndex: sphere.zIndex,
              opacity: sphere.opacity,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: sphere.delay,
            }}
          />
        ))}

        {/* Main Content Container with Floating Animation */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
          animate={floatingAnimation}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
            style={{
              textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
            }}
            variants={childVariants}
          >
            Stand Out with a Unique Website Design
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl relative bg-white bg-opacity-20 p-4 rounded-full shadow-lg w-64 sm:w-80 md:w-96"
            style={{
              color: 'white',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
            }}
            variants={childVariants}
          >
            I create modern websites that turn visitors into customers.
          </motion.p>

          <motion.div className="mt-8 flex space-x-4" variants={childVariants}>
            {/* Get a Website Button with Floating Animation */}
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
            >
              <motion.button
                onClick={openModal}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg flex items-center space-x-2"
                animate={floatingAnimation}
              >
                <FontAwesomeIcon icon={faGlobe} />
                <span>Get a Website</span>
              </motion.button>
            </motion.div>

            {/* Projects Button with Floating Animation */}
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
            >
              <Link to="/projects">
                <motion.button
                  className="px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-500 text-lg font-semibold rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-2xl flex items-center space-x-2"
                  animate={floatingAnimation}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <span>Projects</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Images with Enhanced Hover Effect and Larger Sizes */}
        {images.slice(0, 4).map((imageData, index) => {
          const { imageUrl, projectUrl } = imageData;

          // Assign different positions based on the index
          const positionClasses =
            index === 0
              ? 'top-16 left-4 sm:top-20 sm:left-10 md:top-24 lg:top-32 lg:left-20'
              : index === 1
              ? 'top-32 right-4 sm:top-40 sm:right-10 md:top-48 lg:top-56 lg:right-20'
              : index === 2
              ? 'bottom-16 left-4 sm:bottom-20 sm:left-10 md:bottom-24 lg:bottom-32 lg:left-20'
              : 'bottom-32 right-4 sm:bottom-40 sm:right-10 md:bottom-48 lg:bottom-56 lg:right-20';

          // Adjust floating animation delay for each image
          const imageFloatingAnimation = {
            y: [0, -20, 0],
            transition: {
              duration: 6,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: index * 0.5, // Stagger the animations
            },
          };

          // Enhanced hover effect
          const hoverEffect = {
            scale: 1.15,
            rotate: index % 2 === 0 ? 10 : -10,
            border: '4px solid #fff',
            boxShadow: '0 0 40px rgba(0,0,255,0.7)',
          };

          return (
            <motion.a
              key={index}
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute ${positionClasses} w-60 h-36 sm:w-80 sm:h-48 md:w-96 md:h-60 lg:w-[48rem] lg:h-[30rem] rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.7)] transition-all duration-300 ease-in-out`}
              // Apply floating animation to images
              animate={imageFloatingAnimation}
              whileHover={hoverEffect}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileTap={{ scale: 0.95 }}
              style={{ zIndex: 1 }} // Set z-index to 1 to position images between spheres
            >
              <div
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="w-full h-full rounded-lg"
              />
            </motion.a>
          );
        })}
      </motion.header>
    </>
  );
};

export default HeroSection;
