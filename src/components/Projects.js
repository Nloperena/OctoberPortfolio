import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Create Contentful client using environment variables
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

// Variants for scroll-based animations with slide up effects (no bounce on exit)
const containerVariants = {
  hidden: { opacity: 0, y: 200 }, // Start below viewport, hidden
  visible: {
    opacity: 1,
    y: 0, // Slide up into place
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      when: 'beforeChildren',
      staggerChildren: 0.2, // Delay between child animations
    },
  },
  exit: {
    opacity: 0,
    y: -100, // Slide up smoothly when exiting, no bounce
    transition: { ease: 'easeInOut', duration: 0.6 }, // Smooth exit
  },
};

// Individual card animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 }, // Start slightly lower
  visible: {
    opacity: 1,
    scale: 1,
    y: 0, // Slide up and scale to normal size
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: -100, // Slide up and fade on exit
    transition: { ease: 'easeInOut', duration: 0.4 },
  },
};

// Helper function to truncate text
const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const ProjectCard = ({ title, description, image, url, delay }) => {
  const { scrollYProgress } = useScroll();
  // Apply parallax effect to cards (move slower than the page scroll)
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Move cards slower than scroll

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-br from-gray-900 to-gray-800 neon-card p-6 rounded-lg shadow-xl border border-gray-700 transition-all duration-300 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700"
      variants={cardVariants} // Apply animation to each card
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ y }} // Parallax effect for cards
    >
      {/* Image */}
      {image ? (
        <motion.img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
      <h3 className="text-4xl font-bold mt-6 text-white breathing-text transition-colors duration-300 hover:text-cyan-400">
        {title}
      </h3>
      <p className="text-gray-400 mt-4 text-lg leading-relaxed">
        {truncateText(description, 100)}
      </p>
    </motion.a>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // InView hook to trigger animations when section comes into view
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Trigger animation every time it scrolls into view
    threshold: 0.1, // Trigger animation when 10% of section is visible
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: 'portfolioProjects' });
        setProjects(response.items);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error loading projects: {error.message}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className="py-10 lg:py-20 px-4 lg:px-24 mb-40" // Added more margin-bottom for more space
      variants={containerVariants} // Container animation
      initial="hidden"
      animate={controls}
      exit="exit"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Headline with Wrapper */}
        <motion.div
          className="inline-block bg-white bg-opacity-20 backdrop-blur-lg px-6 py-4 rounded-lg shadow-lg mb-10" // Glassmorphism style for headline, width matches text
          variants={cardVariants} // Apply animation to the headline wrapper
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h2 className="text-5xl lg:text-7xl font-bold neon-text text-white">
            Projects
          </h2>
          <p className="text-md lg:text-lg text-left text-white-300 ">
          Here are some of my latest works and projects.
        </p>
        </motion.div>
        
        

        {/* Project Cards */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const { header, description, projectHeader, link } = project.fields;
            const imageUrl = projectHeader?.fields?.file?.url
              ? `https:${projectHeader.fields.file.url}`
              : null;
            const projectLink = link?.content?.[0]?.content?.[0]?.value || '#';

            return (
              <ProjectCard
                key={index}
                title={header}
                description={description}
                image={imageUrl}
                url={projectLink}
                delay={index * 0.2} // Staggered delay for each card
              />
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
