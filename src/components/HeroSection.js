// src/components/HeroSection.js

import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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

// Parallax effect for the images
const parallaxEffect = (scrollY, factor) => {
  return {
    transform: `translateY(${scrollY * factor}px)`,
  };
};

const HeroSection = ({ openModal }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollY, setScrollY] = useState(0); // Track scrolling for parallax

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

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 text-white pt-16"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
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
            {/* Get a Website Button */}
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
            >
              <button
                onClick={openModal}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faGlobe} />
                <span>Get a Website</span>
              </button>
            </motion.div>

            {/* Projects Button */}
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
            >
              <Link to="/projects">
                <button
                  className="px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-500 text-lg font-semibold rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-2xl flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <span>Projects</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Parallax Images with Corrected Background Position Animation */}
        {images.slice(0, 4).map((imageData, index) => {
          const { imageUrl, projectUrl } = imageData;

          // Assign different positions based on the index
          const positionClasses =
            index === 0
              ? 'top-16 left-4 sm:top-20 sm:left-10 md:top-24 lg:left-20'
              : index === 1
              ? 'top-32 right-4 sm:top-40 sm:right-10 md:top-48 lg:right-20'
              : index === 2
              ? 'bottom-16 left-4 sm:bottom-20 sm:left-10 md:bottom-24 lg:left-20'
              : 'bottom-32 right-4 sm:bottom-40 sm:right-10 md:bottom-48 lg:right-20';

          return (
            <motion.a
              key={index}
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute w-40 h-24 sm:w-60 sm:h-36 md:w-72 md:h-48 lg:w-[32rem] lg:h-[20rem] rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.7)] mx-8 hover:shadow-[15px_15px_40px_rgba(0,0,0,0.9)] transition-all duration-300 ease-in-out ${positionClasses}`}
              style={{
                ...parallaxEffect(scrollY, 0.2 + index * 0.05),
                backgroundPosition: '0% 0%', // Set initial background position
              }}
              whileHover={{
                scale: 1.05,
                rotateX: -5,
                rotateY: 5,
                backgroundPosition: '50% 50%', // Use numeric percentages
                border: '2px solid #fff',
                boxShadow: '0 0 20px rgba(0,0,255,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
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
