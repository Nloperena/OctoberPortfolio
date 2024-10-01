import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { motion } from 'framer-motion';

// Create Contentful client using environment variables
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

// Idle animation for floating effect with staggered hover
const cardVariants = (hoverEnabled, delay) => ({
  idle: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
  hover: hoverEnabled
    ? {
        scale: 1.1,
        boxShadow: '0px 0px 60px rgba(0, 255, 255, 0.9)', 
        transition: {
          duration: 0.4,
          ease: 'easeInOut',
          delay,
        },
      }
    : {},
});

// Helper function to truncate text
const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const ProjectCard = ({ title, description, image, url, delay }) => {
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHoverEnabled(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-br from-gray-900 to-gray-800 neon-card p-6 rounded-lg shadow-xl border border-gray-700 transition-all duration-300 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700"
      variants={cardVariants(hoverEnabled, delay)}
      initial="idle"
      whileHover={hoverEnabled ? 'hover' : ''}
      animate="idle"
      whileTap="hover"
      style={{ flex: '1 1 calc(100% - 1rem)', maxWidth: '100%' }} 
    >
      {/* Image with hover effect */}
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
        {isExpanded ? description : truncateText(description, 100)}{' '}
        {description.length > 100 && (
          <span
            className="text-cyan-400 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              toggleExpanded();
            }}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </span>
        )}
      </p>
    </motion.a>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch entries from Contentful using the 'portfolioProjects' content type
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

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error loading projects: {error.message}</div>;
  }

  return (
    <div className="animated-bg py-10 lg:py-20 px-4 lg:px-24">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <h2 className="text-5xl lg:text-7xl font-bold text-left neon-text">Projects</h2>
          <p className="text-md lg:text-lg text-left text-gray-400 mt-2">
            Here are some of my latest works and projects.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                delay={index * 0.1} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
