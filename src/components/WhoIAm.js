// src/components/WhoIAm.js

import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { motion } from 'framer-motion';
import BadgeImage from '../assets/ucfLogo.jpg';
import Image from '../assets/heroImg.jpg';
import GraduationPhoto from '../assets/graduationphoto.jpg';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

const containerVariants = {
  hidden: { opacity: 0, x: '-3vw' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
      type: 'spring',
      stiffness: 120,
      damping: 12,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: '3vw',
    transition: { duration: 0.15, ease: 'easeInOut' },
  },
};

const WhoIAm = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <div className="text-center text-white">Loading images...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading images: {error.message}</div>;
  }

  return (
    <motion.section
      className="flex flex-col py-12 bg-gray-900 text-white space-y-12"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* First Row: Text on Left, Image on Right */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full">
        <motion.div
          className="md:w-1/2 w-full px-6 md:px-12 text-center md:text-left"
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold mb-6 text-white leading-tight"
            style={{
              textShadow: '3px 3px 15px rgba(0, 0, 0, 0.5)',
            }}
          >
            Your Local Web Developer in Central Florida
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl bg-white bg-opacity-10 p-6 rounded-lg shadow-xl mx-auto md:mx-0 max-w-lg"
            style={{
              color: '#f0f0f0',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            I'm Nico, a passionate web developer based in Central Florida, specializing in helping local businesses grow by building visually appealing, SEO-optimized websites.
          </motion.p>
        </motion.div>

        <motion.div
          className="md:w-1/2 w-full flex items-center justify-center my-4 md:my-0"
          variants={containerVariants}
        >
          <motion.img
            src={Image}
            alt="Experienced Web Designer and Developer"
            className="w-full max-w-xs h-auto rounded-lg shadow-lg m-4"
          />
        </motion.div>
      </div>

      {/* Second Row: Image on Left, Text on Right with UCF Badge */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center md:justify-between w-full">
        <motion.div
          className="md:w-1/2 w-full px-6 md:px-12 text-center md:text-left"
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold mb-6 text-white leading-tight"
            style={{
              textShadow: '3px 3px 15px rgba(0, 0, 0, 0.5)',
            }}
          >
            Why Choose Me?
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl bg-white bg-opacity-10 p-6 rounded-lg shadow-xl mx-auto md:mx-0 max-w-lg"
            style={{
              color: '#f0f0f0',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            As a UCF Coding Bootcamp graduate, I ensure that your website not only represents your brand but also delivers exceptional user experiences that convert visitors into customers.
          </motion.p>

          {/* UCF Badge and Text inside the "Why Choose Me" container */}
          <motion.div
            className="mt-4 flex items-center justify-center md:justify-start space-x-4"
            variants={containerVariants}
          >
            <motion.img
              src={BadgeImage}
              alt="UCF Coding Bootcamp Graduate"
              className="w-16 h-16 lg:w-20 lg:h-20"
            />
            <div>
              <motion.h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                UCF Coding Boot Camp
              </motion.h3>
              <motion.p className="text-gray-400 text-lg leading-snug">
                Full-Stack Web Development Graduate (2019)
              </motion.p>
              <motion.p className="text-gray-400 text-lg leading-snug">
                Credential ID: CREDLY-19824013
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 w-full flex items-center justify-center my-4 md:my-0"
          variants={containerVariants}
        >
          <motion.img
            src={GraduationPhoto}
            alt="Graduation Photo"
            className="object-cover w-full max-w-xs rounded-lg shadow-lg m-4"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhoIAm;
