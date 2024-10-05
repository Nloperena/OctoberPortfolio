import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BadgeImage from '../assets/ucfLogo.jpg';
import Image from '../assets/heroImg.jpg';

// Variants for the container and text animations
const containerVariants = {
  hidden: { opacity: 0, x: '-3vw' }, // Slide in from the left with reduced distance for a snappier effect
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      when: 'beforeChildren',
      staggerChildren: 0.01, // Elements unravel faster with minimal delay for snappier effect
      duration: 0.2, // Faster animation duration for snappier appearance
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: '3vw', // Slide out to the right on exit with reduced distance
    transition: { duration: 0.15, ease: 'easeInOut' },
  },
};

// Text animation variants
const textVariants = {
  hidden: { opacity: 0, x: -5 }, // Fade in from the left with reduced distance
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2, // Faster text animation for snappier effect
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 5, // Move right and fade out with reduced distance
    transition: { duration: 0.15, ease: 'easeInOut' },
  },
};

// UCF Section animation variants
const ucfVariants = {
  hidden: { opacity: 0, y: 20 }, // Fade in and slide up from below
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Faster animation for snappier effect
      ease: 'easeOut',
      delay: 0.5, // Delay to start after other animations are complete
    },
  },
  exit: {
    opacity: 0,
    y: 20, // Slide down and fade out
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

const WhoIAm = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow re-triggering as we scroll in/out
    threshold: 0.1, // Trigger animation slightly later for smoother appearance
  });

  // Start animation when in view, reverse when out of view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.section
      className="relative flex flex-col md:flex-row items-center py-12 bg-gray-900 text-white"
      ref={ref}
      initial="hidden"
      animate={controls}
      exit="exit"
      variants={containerVariants}
      style={{ width: '100%' }} // Ensure section takes full width
    >
      {/* Image Section */}
      <motion.div
        className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0 relative"
        variants={containerVariants}
        style={{ width: '100%' }} // Ensure image container takes full width
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-40 mix-blend-multiply z-10 rounded-lg"></div>
        {/* Image */}
        <motion.img
          src={Image}
          alt="Who I Am"
          className="object-cover w-full h-full rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }} // Snappier fade and slight scale animation
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="md:w-1/2 w-full px-6"
        variants={containerVariants}
        style={{ width: '100%' }}
      >
        <motion.h2
          className="text-3xl font-bold mb-4"
          variants={textVariants}
        >
          Who I Am
        </motion.h2>
        <motion.p className="text-lg mb-4" variants={textVariants}>
          I'm a passionate web developer and designer with a background in
          graphic design, video editing, and motion graphics. My goal is to
          create visually stunning websites that offer a seamless user experience while bringing unique ideas to life.
        </motion.p>
        <motion.p className="text-lg" variants={textVariants}>
          With a love for creativity and technology, I constantly strive to
          improve my skills and push the boundaries of what's possible. Let's
          work together to create something amazing!
        </motion.p>

        {/* UCF Certification */}
        <motion.div
          className="mt-6 flex items-center space-x-4"
          variants={ucfVariants}
          initial="hidden"
          animate={controls}
          exit="exit"
        >
          <motion.img
            src={BadgeImage}
            alt="UCF Certification Badge"
            className="w-16 h-16 object-contain"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }} // Snappier rotate animation for more dynamic entrance
          />
          <div>
            <motion.h3 className="text-xl font-semibold" variants={ucfVariants}>UCF Coding Boot Camp</motion.h3>
            <motion.p className="text-gray-400" variants={ucfVariants}>Full-Stack Web Development Graduate (2019)</motion.p>
            <motion.p className="text-gray-400" variants={ucfVariants}>Credential ID: CREDLY-19824013</motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WhoIAm;