import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BadgeImage from '../assets/ucfLogo.jpg';
import Image from '../assets/heroImg.jpg';

// Variants for the container and text animations
const containerVariants = {
  hidden: { opacity: 0, x: '-3vw' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      when: 'beforeChildren',
      staggerChildren: 0.01,
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: '3vw',
    transition: { duration: 0.15, ease: 'easeInOut' },
  },
};

// Text animation variants
const textVariants = {
  hidden: { opacity: 0, x: -5 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 5,
    transition: { duration: 0.15, ease: 'easeInOut' },
  },
};

// UCF Section animation variants
const ucfVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

const WhoIAm = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

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
      style={{ width: '100%' }}
    >
      {/* Image Section */}
      <motion.div
        className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0 relative"
        variants={containerVariants}
        style={{ width: '100%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-40 mix-blend-multiply z-10 rounded-lg"></div>
        <motion.img
          src={Image}
          alt="Experienced Web Designer and Developer for Orlando and Kissimmee"
          className="object-cover w-full h-full rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="md:w-1/2 w-full px-6"
        variants={containerVariants}
        style={{ width: '100%' }}
      >
        <motion.h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" variants={textVariants}>
          Who I Am
        </motion.h2>
        <motion.p className="text-lg md:text-2xl lg:text-3xl mb-6 leading-relaxed font-light" variants={textVariants}>
          I am a dedicated web designer and developer based in Central Florida, specializing in creating dynamic, user-friendly websites for local businesses in Orlando and Kissimmee. With over a decade of experience in graphic design, video editing, and motion graphics, I bring a unique perspective to web development, blending creativity with technical expertise.
        </motion.p>
        <motion.p className="text-lg md:text-2xl lg:text-3xl mb-6 leading-relaxed font-light" variants={textVariants}>
          My journey in the tech world has been diverse, spanning roles in IT, design, and digital marketing. I've worked with small businesses across various industries, helping them establish a strong online presence through custom web design and strategic SEO practices. I understand the importance of building websites that not only look great but also rank well on search engines, driving more local traffic and converting visitors into loyal customers.
        </motion.p>
        <motion.p className="text-lg md:text-2xl lg:text-3xl leading-relaxed font-light" variants={textVariants}>
          From e-commerce stores to informative business sites, I’ve developed solutions tailored to the unique needs of businesses in Orlando, Kissimmee, and beyond. My goal is to create websites that reflect your brand’s personality and resonate with your target audience, ensuring a seamless experience across all devices.
        </motion.p>

        {/* UCF Certification */}
        <motion.div
          className="mt-8 flex items-center space-x-6"
          variants={ucfVariants}
          initial="hidden"
          animate={controls}
          exit="exit"
        >
          <motion.img
            src={BadgeImage}
            alt="UCF Coding Bootcamp Graduate"
            className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
          <div>
            <motion.h3 className="text-xl md:text-2xl lg:text-3xl font-semibold" variants={ucfVariants}>
              UCF Coding Boot Camp
            </motion.h3>
            <motion.p className="text-gray-400 text-lg md:text-xl lg:text-2xl leading-snug" variants={ucfVariants}>
              Full-Stack Web Development Graduate (2019)
            </motion.p>
            <motion.p className="text-gray-400 text-lg md:text-xl lg:text-2xl leading-snug" variants={ucfVariants}>
              Credential ID: CREDLY-19824013
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WhoIAm;
