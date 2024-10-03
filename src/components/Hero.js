import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { createClient } from 'contentful';

// Create Contentful client
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

// Animation variants for fade and slide effects (appear and disappear)
const imageVariants = {
  hidden: { opacity: 0, y: 20 }, // Start hidden and down
  visible: {
    opacity: 1,
    y: 0, // Slide up and become visible
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20, // Slide up and fade out when leaving
    transition: {
      duration: 0.5, // Quick fade-out
      ease: 'easeIn',
    },
  },
};

const Hero = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parallax setup
  const { scrollYProgress } = useViewportScroll();

  // Sticky and fade-out transformations (starting much sooner)
  const translateY = useTransform(scrollYProgress, [0, 0.2], [0, -100]); // Parallax effect
  const opacity = useTransform(scrollYProgress, [0.05, 0.1], [1, 0]); // Fade out sooner (after two swipes)
  const shootUp = useTransform(scrollYProgress, [0.05, 0.1], [0, -200]); // Shoot up during fade out

  // Fetch images and project URLs for the hero section from Contentful
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await client.getEntries({ content_type: 'portfolioProjects' });

        // Extract images and URLs from Contentful response
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
      className="sticky top-0 flex items-center justify-center min-h-screen bg-transparent text-white pt-16 z-10"
      style={{ translateY, opacity, y: shootUp }} // Apply parallax effect, fade out, and shoot up
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.7)] z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Headline with grow effect */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ scale: 0.8, opacity: 0 }} // Start smaller and hidden
          animate={{ scale: 1, opacity: 1 }} // Grow to full size
          transition={{ duration: 1.2, ease: 'easeOut' }} // Smooth animation
          style={{
            color: '#fff',
            textShadow: '4px 4px 12px rgba(0, 0, 0, 0.7)',
          }}
        >
          Stand Out with a Unique Website Design
        </motion.h1>

        {/* Subheading with opaque circular background, now properly responsive */}
        <motion.p
          className="text-lg md:text-2xl text-gray-400 relative bg-white bg-opacity-20 p-4 rounded-full shadow-lg w-64 sm:w-80 md:w-96"
          initial={{ scale: 0.8, opacity: 0 }} // Start smaller and hidden
          animate={{ scale: 1, opacity: 1 }} // Grow to full size
          transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }} // Slight delay after headline
        >
          I create modern websites that turn visitors into customers.
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }} // Hover effect with slight lift
            whileTap={{ scale: 0.95 }} // Tap effect
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300"
          >
            Hire Me
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }} // Hover effect with slight lift
            whileTap={{ scale: 0.95 }} // Tap effect
            className="px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-500 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:text-white hover:shadow-2xl transition-transform duration-300"
          >
            Let's Talk
          </motion.button>
        </div>
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
          <motion.a
            key={index}
            href={projectUrl} // Add the project URL as the link
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute w-40 h-24 sm:w-60 sm:h-36 md:w-72 md:h-48 lg:w-96 lg:h-60 bg-white rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.7)] mx-8 hover:shadow-[15px_15px_40px_rgba(0,0,0,0.9)] transition-all duration-300 ease-in-out ${positionClasses}`}
          >
            <motion.div
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              whileTap="hover"
              className="w-full h-full rounded-lg"
            />
          </motion.a>
        );
      })}
    </motion.header>
  );
};

export default Hero;
