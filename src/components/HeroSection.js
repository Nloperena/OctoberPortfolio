import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Create Contentful client
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

// Animation variants for fade and bounce effects
const heroVariants = {
  hidden: { opacity: 0, y: 100 }, // Start hidden and down
  visible: {
    opacity: 1,
    y: 0, // Shoot up
    transition: {
      type: 'spring',
      stiffness: 300, // Bounciness
      damping: 20, // Controls the "bounce" (higher damping, less bounce)
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -100, // Fade out and rise up when leaving animation
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll animation control
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5, // Trigger when Hero section is halfway visible
  });

  // Trigger animation when in view or out of view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('exit');
    }
  }, [controls, inView]);

  // Fetch images and project URLs for the hero section from Contentful
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await client.getEntries({ content_type: 'portfolioProjects' });
        const fetchedImages = response.items.map((item) => {
          const imageUrl = item.fields.projectHeader?.fields?.file?.url
            ? `https:${item.fields.projectHeader.fields.file.url}`
            : null;
          const projectUrl = item.fields.link?.content?.[0]?.content?.[0]?.value || '#'; // Fallback if no URL is provided
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
    <motion.header
      ref={ref}
      className="relative flex items-center justify-center min-h-screen bg-transparent text-white pt-16 backdrop-blur-lg" // Entire Hero section blurred
      initial="hidden"
      animate={controls}
      exit="exit"
      variants={heroVariants}
    >
      {/* Glassmorphism -Background */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 rounded-lg z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{
            color: 'black', // Navy blue for contrast
          
            textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white', // Fallback for older browsers
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 300, // More bounce
            damping: 20, // Less bounce, more spring
            duration: 1,
          }}
        >
          Stand Out with a Unique Website Design
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl relative bg-white bg-opacity-20 p-4 rounded-full shadow-lg w-64 sm:w-80 md:w-96"
          style={{
            color: 'black', // Navy blue for contrast
            WebkitTextStroke: '0.1px black', // Light stroke around paragraph
            textShadow: '1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white', // Stroke effect using text-shadow
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: 1,
          }}
        >
          I create modern websites that turn visitors into customers.
        </motion.p>

        <motion.div className="mt-8 flex space-x-4">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              type: 'spring',
              stiffness: 300,
              damping: 20,
              duration: 1,
            }}
          >
            Get a Website
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-500 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:text-white hover:shadow-2xl transition-transform duration-300"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              type: 'spring',
              stiffness: 300,
              damping: 20,
              duration: 1,
            }}
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </div>

      {/* Dynamically rendered images with precise positions */}
      {images.slice(0, 4).map((imageData, index) => {
        const { imageUrl, projectUrl } = imageData;

        // Assign different positions based on the index (maintaining original)
        const positionClasses =
          index === 0
            ? 'top-16 left-4 sm:top-20 sm:left-10 md:top-24 lg:left-20'
            : index === 1
            ? 'top-32 right-4 sm:top-40 sm:right-10 md:top-48 lg:right-20'
            : index === 2
            ? 'bottom-16 left-4 sm:bottom-20 sm:left-10 md:bottom-24 lg:left-20'
            : 'bottom-32 right-4 sm:bottom-40 sm:right-10 md:bottom-48 lg:right-20';

        return (
          <a
            key={index}
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute w-40 h-24 sm:w-60 sm:h-36 md:w-72 md:h-48 lg:w-96 lg:h-60 bg-white rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.7)] mx-8 hover:shadow-[15px_15px_40px_rgba(0,0,0,0.9)] transition-all duration-300 ease-in-out ${positionClasses}`}
          >
            <div
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="w-full h-full rounded-lg"
            />
          </a>
        );
      })}
    </motion.header>
  );
};

export default HeroSection;
