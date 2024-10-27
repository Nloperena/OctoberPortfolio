import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// Create Contentful client using environment variables
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: 'master',
});

// Variants for container animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Variants for project cards
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};

// Variants for modal overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Variants for modal content
const modalVariants = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: '0',
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.3 },
  },
};

// Helper function to truncate text
const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const ProjectCard = ({ project, onClick }) => {
  const { header, description, projectHeader } = project.fields;
  const imageUrl = projectHeader?.fields?.file?.url
    ? `https:${projectHeader.fields.file.url}`
    : null;

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg cursor-pointer overflow-hidden"
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      onClick={() => onClick(project)}
    >
      {/* Image */}
      {imageUrl ? (
        <motion.img
          src={imageUrl}
          alt={header}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
      {/* Content */}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-white mb-2">{header}</h3>
        <p className="text-gray-300">{truncateText(description, 100)}</p>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // InView hook to trigger animations when section comes into view
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: 'portfolioProjects' });
        setProjects(response.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(true);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading projects. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {/* Projects Section */}
      <section
        ref={ref}
        className="container max-w-screen-lg mx-auto py-12 px-6 lg:px-0 bg-gray-900 text-white"
      >
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <motion.p
          className="text-lg lg:text-xl text-gray-300 text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Here are some of my latest works and projects.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} onClick={setSelectedProject} />
          ))}
        </motion.div>
      </section>

      {/* Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-lg shadow-xl p-6 relative max-w-2xl mx-4"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setSelectedProject(null)}
              >
                &times;
              </button>
              {/* Modal Content */}
              <div className="flex flex-col items-center">
                {selectedProject.fields.projectHeader?.fields?.file?.url && (
                  <img
                    src={`https:${selectedProject.fields.projectHeader.fields.file.url}`}
                    alt={selectedProject.fields.header}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <h2 className="text-3xl font-bold mb-4">{selectedProject.fields.header}</h2>
                <p className="text-gray-300 mb-6">{selectedProject.fields.description}</p>
                {selectedProject.fields.link?.content?.[0]?.content?.[0]?.value && (
                  <a
                    href={selectedProject.fields.link.content[0].content[0].value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center"
                  >
                    Visit Site
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
