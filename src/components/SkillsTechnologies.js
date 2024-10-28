import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { skillCategories } from '../data/skillCategories'; // Adjust the path as needed

// Animation variants for the tooltip/modal container
const containerVariants = {
  hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and y offset
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Fade in and move up
};

// Floating Bubbles Component
const FloatingBubbles = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Floating Bubbles */}
    <div className="relative w-full h-full">
      {/* Bubble 1 */}
      <motion.div
        className="absolute w-48 h-48 bg-teal-500 rounded-full opacity-20"
        style={{ top: '10%', left: '5%' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bubble 2 */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-500 rounded-full opacity-20"
        style={{ bottom: '20%', right: '10%' }}
        animate={{
          y: [0, 30, 0],
          x: [0, -30, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bubble 3 */}
      <motion.div
        className="absolute w-56 h-56 bg-purple-500 rounded-full opacity-20"
        style={{ top: '50%', left: '60%' }}
        animate={{
          y: [0, -25, 0],
          x: [0, 25, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bubble 4 */}
      <motion.div
        className="absolute w-40 h-40 bg-pink-500 rounded-full opacity-20"
        style={{ bottom: '30%', left: '15%' }}
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bubble 5 */}
      <motion.div
        className="absolute w-64 h-64 bg-yellow-500 rounded-full opacity-20"
        style={{ top: '25%', right: '20%' }}
        animate={{
          y: [0, -35, 0],
          x: [0, 35, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bubble 6 */}
      <motion.div
        className="absolute w-52 h-52 bg-green-500 rounded-full opacity-20"
        style={{ bottom: '10%', right: '40%' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bubble 7 */}
      <motion.div
        className="absolute w-36 h-36 bg-indigo-500 rounded-full opacity-20"
        style={{ top: '70%', left: '80%' }}
        animate={{
          y: [0, -10, 0],
          x: [0, 10, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </div>
));

const SkillsTechnologies = () => {
  const [selectedCategory, setSelectedCategory] = useState('Development'); // Default to 'Development'
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [wikiPreview, setWikiPreview] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const isTooltipVisible = useRef(false);
  const summaryCache = useRef({});
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const skillsSectionRef = useRef(null);
  const headlineRef = useRef(null);

  // Detect if the device is mobile and if it's in landscape mode
  useEffect(() => {
    const checkDeviceOrientation = () => {
      const isMobileDevice = window.innerWidth <= 768; // Adjust breakpoint as needed
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      setIsMobile(isMobileDevice);
      setIsLandscape(isLandscapeMode);
    };

    checkDeviceOrientation();
    window.addEventListener('resize', checkDeviceOrientation);
    return () => {
      window.removeEventListener('resize', checkDeviceOrientation);
    };
  }, []);

  // Handle scroll to show/hide sticky categories bar based on headline visibility
  useEffect(() => {
    const headline = headlineRef.current;
    let observer;

    if (headline) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setShowStickyBar(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
        }
      );

      observer.observe(headline);
    }

    return () => {
      if (observer && headline) {
        observer.unobserve(headline);
      }
    };
  }, []);

  // Fetch Wikipedia summary when hoveredSkill changes
  useEffect(() => {
    if (hoveredSkill) {
      const fetchWikiPreview = async () => {
        if (summaryCache.current[hoveredSkill.name]) {
          setWikiPreview(summaryCache.current[hoveredSkill.name]);
        } else {
          try {
            const title = hoveredSkill.wikiTitle || hoveredSkill.name;
            const response = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                title
              )}`
            );
            const data = await response.json();
            if (data.extract) {
              setWikiPreview(data.extract);
              summaryCache.current[hoveredSkill.name] = data.extract;
            } else {
              setWikiPreview('No summary available.');
            }
          } catch (error) {
            console.error('Error fetching Wikipedia summary:', error);
            setWikiPreview('Error loading summary.');
          }
        }
      };

      fetchWikiPreview();
    } else {
      setWikiPreview('');
    }
  }, [hoveredSkill]);

  // Calculate tooltip position
  const calculateTooltipPosition = (e) => {
    const tooltipWidth = 250; // Adjust based on tooltip width
    const tooltipHeight = 200; // Adjust based on tooltip height
    const xOffset = 15;
    const yOffset = 15;
    let x = e.clientX + xOffset;
    let y = e.clientY + yOffset;

    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Adjust x and y if tooltip goes beyond the right edge
    if (x + tooltipWidth > viewportWidth) {
      x = e.clientX - tooltipWidth - xOffset;
    }

    // Adjust y if tooltip goes beyond the bottom edge
    if (y + tooltipHeight > viewportHeight) {
      y = e.clientY - tooltipHeight - yOffset;
    }

    return { x, y };
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setHoveredSkill(null); // Reset hovered skill when category changes
  };

  // Animation variants for skills container
  const skillsContainerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    enter: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 50 },
  };

  // Animation variants for the sticky bar
  const stickyBarVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Handle click outside of modal on mobile
  const handleOutsideClick = (e) => {
    if (
      e.target.closest('.skill-modal-content') === null &&
      e.target.closest('.skill-item') === null
    ) {
      setHoveredSkill(null);
    }
  };

  // Add event listener for mobile devices to detect clicks outside the modal
  useEffect(() => {
    if (isMobile && hoveredSkill) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      if (isMobile) {
        document.removeEventListener('click', handleOutsideClick);
      }
    };
  }, [isMobile, hoveredSkill]);

  return (
    <section
      className="skills-section py-16 lg:py-32 relative overflow-hidden bg-gray-900"
      id="skills"
      ref={skillsSectionRef}
    >
      {/* Background Floating Bubbles */}
      <FloatingBubbles />

      <div className="container mx-auto px-4 lg:px-16 max-w-7xl relative">
        {/* Skills Heading */}
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-white mb-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          ref={headlineRef}
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          className="text-lg lg:text-xl text-gray-300 mb-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore my expertise across different areas
        </motion.p>

        {/* Category Buttons for Landscape Mode */}
        {isLandscape && (
          <div className="category-buttons grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center relative">
            {skillCategories.map((category) => (
              <motion.button
                key={category.category}
                className={`category-button w-full h-36 flex flex-col items-center justify-center rounded-lg cursor-pointer transform transition-transform duration-300 focus:outline-none ${
                  selectedCategory === category.category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 border-4 border-white text-white'
                    : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:scale-105 text-white'
                }`}
                onClick={() => handleCategoryClick(category.category)}
                whileTap={{ scale: 0.95 }}
                animate={
                  selectedCategory === category.category ? { scale: 1.1 } : { scale: 1 }
                }
                transition={{ type: 'spring', stiffness: 300 }}
                aria-expanded={selectedCategory === category.category}
                aria-label={`View skills in ${category.category}`}
              >
                {/* Icon */}
                <FontAwesomeIcon
                  icon={category.icon}
                  className="w-10 h-10 mb-2"
                />
                {/* Category Name */}
                <span className="text-lg font-bold">{category.category}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Skills for Selected Category */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              key={selectedCategory}
              className="skills-container mt-8 lg:mt-12 relative"
              variants={skillsContainerVariants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.7, ease: 'easeOut' }}
              layout
            >
              {/* Category Description */}
              <div className="category-description mb-6 text-center">
                <p className="text-gray-300 text-lg">
                  {
                    skillCategories.find(
                      (cat) => cat.category === selectedCategory
                    ).description
                  }
                </p>
              </div>

              <motion.div
                className="skills-list bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6"
                layout
              >
                {skillCategories
                  .find((cat) => cat.category === selectedCategory)
                  .skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item flex flex-col items-center justify-center text-center relative cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onMouseEnter={
                        !isMobile
                          ? (e) => {
                              setHoveredSkill(skill);
                              isTooltipVisible.current = true;
                              setTooltipPosition(calculateTooltipPosition(e));
                            }
                          : null
                      }
                      onMouseLeave={
                        !isMobile
                          ? () => {
                              isTooltipVisible.current = false;
                              // Hide tooltip if not over it
                              setTimeout(() => {
                                if (!isTooltipVisible.current) {
                                  setHoveredSkill(null);
                                }
                              }, 100);
                            }
                          : null
                      }
                      onFocus={(e) => {
                        setHoveredSkill(skill);
                        isTooltipVisible.current = true;
                        if (!isMobile) {
                          setTooltipPosition(calculateTooltipPosition(e));
                        }
                      }}
                      onBlur={() => {
                        isTooltipVisible.current = false;
                        setHoveredSkill(null);
                      }}
                      onClick={
                        isMobile
                          ? (e) => {
                              setHoveredSkill(skill);
                              isTooltipVisible.current = true;
                            }
                          : null
                      }
                      tabIndex="0"
                      role="button"
                      aria-label={`Learn more about ${skill.name}`}
                    >
                      {/* Icon with Enhanced Hover Effect */}
                      <motion.div
                        whileHover={
                          !isMobile
                            ? {
                                scale: 1.2,
                                rotate: 10,
                                color: '#38bdf8',
                                textShadow:
                                  '0px 0px 8px rgba(56, 189, 248, 0.8)',
                              }
                            : null
                        }
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <FontAwesomeIcon
                          icon={skill.icon}
                          className="text-teal-400 w-10 h-10 mb-2"
                        />
                      </motion.div>
                      {/* Skill Name */}
                      <span className="text-white text-md">{skill.name}</span>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Categories Bar */}
      {!isLandscape && (
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              className="fixed bottom-0 left-0 right-0 py-2 shadow-lg flex justify-around items-center z-50"
              variants={stickyBarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                backgroundColor: '#1f2937', // Dark gray background
              }}
            >
              {skillCategories.map((category) => (
                <motion.button
                  key={category.category}
                  className={`category-button flex-1 h-16 flex flex-col items-center justify-center rounded-lg cursor-pointer transform transition-transform duration-300 focus:outline-none mx-2 ${
                    selectedCategory === category.category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 border-4 border-white text-white'
                      : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                  }`}
                  onClick={() => handleCategoryClick(category.category)}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    selectedCategory === category.category ? { scale: 1.1 } : { scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 300 }}
                  aria-expanded={selectedCategory === category.category}
                  aria-label={`View skills in ${category.category}`}
                  style={{ minWidth: '30%' }} // Ensure buttons take up equal space
                >
                  {/* Icon */}
                  <FontAwesomeIcon icon={category.icon} className="w-6 h-6 mb-1" />
                  {/* Category Name */}
                  <span className="text-sm font-bold">{category.category}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Tooltip for Desktop */}
      {!isMobile && hoveredSkill && wikiPreview && (
        <motion.div
          className="fixed text-white p-4 rounded-lg shadow-lg max-w-xs z-50 glass-container"
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseEnter={() => {
            isTooltipVisible.current = true;
          }}
          onMouseLeave={() => {
            isTooltipVisible.current = false;
            setHoveredSkill(null);
          }}
        >
          <h3 className="text-xl font-bold mb-2">{hoveredSkill.name}</h3>
          <p className="text-sm mb-4">{wikiPreview}</p>
          <a
            href={hoveredSkill.wikiPage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-300 w-full"
            >
              Read More
            </button>
          </a>
        </motion.div>
      )}

      {/* Modal for Mobile */}
      {isMobile && hoveredSkill && wikiPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setHoveredSkill(null)}
          ></div>
          {/* Modal Content */}
          <motion.div
            className="relative p-6 rounded-lg max-w-sm w-full glass-container skill-modal-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={() => setHoveredSkill(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2 text-white">
              {hoveredSkill.name}
            </h3>
            <p className="text-sm mb-4 text-white">{wikiPreview}</p>
            <a
              href={hoveredSkill.wikiPage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-300 w-full"
              >
                Read More
              </button>
            </a>
          </motion.div>
        </div>
      )}

      {/* Add styles for the glass container */}
      <style jsx>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px); /* For Safari support */
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
};

export default SkillsTechnologies;
