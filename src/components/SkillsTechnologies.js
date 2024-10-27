import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { skillCategories } from '../data/skillCategories'; // Adjust the path as needed
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SkillsTechnologies = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [wikiPreview, setWikiPreview] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const isTooltipVisible = useRef(false);
  const summaryCache = useRef({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
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
    setSelectedCategory(category === selectedCategory ? null : category);
    setHoveredSkill(null); // Reset hovered skill when category changes
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
    >
      {/* Background elements remain the same */}
      {/* ... (Background elements code) */}

      <div className="container mx-auto px-4 lg:px-16 max-w-7xl relative">
        {/* Skills Heading */}
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-white mb-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          className="text-lg lg:text-xl text-gray-300 mb-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore my expertise across different areas
        </motion.p>

        {/* Main Category Buttons */}
        <div className="category-buttons grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center relative">
          {skillCategories.map((category) => (
            <motion.button
              key={category.category}
              className={`category-button w-full h-36 flex flex-col items-center justify-center rounded-lg cursor-pointer transform transition-transform duration-300 focus:outline-none ${
                selectedCategory === category.category
                  ? 'scale-110 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 border-4 border-white'
                  : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:scale-105'
              }`}
              onClick={() => handleCategoryClick(category.category)}
              whileTap={{ scale: 0.95 }}
              aria-expanded={selectedCategory === category.category}
              aria-label={`View skills in ${category.category}`}
            >
              {/* Icon */}
              <FontAwesomeIcon
                icon={category.icon}
                className="text-white w-10 h-10 mb-2"
              />
              {/* Category Name */}
              <span className="text-white text-lg font-bold">
                {category.category}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Skills for Selected Category */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              key="skills-container"
              className="skills-container mt-12 lg:mt-16 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
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
                className="skills-list bg-gray-800 p-8 rounded-lg shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6"
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

      {/* Tooltip for Desktop */}
      {!isMobile && hoveredSkill && wikiPreview && (
        <div
          className="fixed glassmorphic-tooltip text-white p-4 rounded-lg shadow-lg max-w-xs z-50"
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
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
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
              style={{ width: '100%' }}
            >
              Read More
            </button>
          </a>
        </div>
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
            className="relative bg-white text-black p-6 rounded-lg max-w-sm w-full skill-modal-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setHoveredSkill(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">{hoveredSkill.name}</h3>
            <p className="text-sm mb-4">{wikiPreview}</p>
            <a
              href={hoveredSkill.wikiPage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 w-full"
              >
                Read More
              </button>
            </a>
          </motion.div>
        </div>
      )}

      {/* Add styles for glassmorphic effect if needed */}
      {/* ... (Styles remain the same) */}
    </section>
  );
};

export default SkillsTechnologies;
