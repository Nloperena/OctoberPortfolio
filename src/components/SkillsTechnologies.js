import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { skillCategories } from '../data/skillCategories'; // Adjust the path as needed

// Floating circle animation with varied speed and offsets
const circleAnimation = (duration, delay, distance) => ({
  hidden: { y: 0 },
  visible: {
    y: [0, distance, 0],
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: duration,
      ease: 'easeInOut',
      delay: delay,
    },
  },
});

const SkillsTechnologies = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [wikiPreview, setWikiPreview] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const isTooltipVisible = useRef(false);
  const summaryCache = useRef({});

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

  return (
    <section
      className="skills-section py-16 lg:py-32 relative overflow-hidden bg-gray-900"
      id="skills"
    >
      {/* Floating Background Elements Container */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        layout
        transition={{ duration: 0.5 }}
      >
        {/* Floating Parallax Circles with opacity */}
        <motion.div
          className="absolute top-1/4 left-0 w-32 h-32 bg-purple-400 rounded-full opacity-50"
          variants={circleAnimation(6, 0, 30)}
          initial="hidden"
          animate="visible"
          layout
        ></motion.div>
        <motion.div
          className="absolute top-1/3 right-0 w-24 h-24 bg-blue-400 rounded-full opacity-50"
          variants={circleAnimation(4, 0.5, 20)}
          initial="hidden"
          animate="visible"
          layout
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 left-0 w-16 h-16 bg-pink-400 rounded-full opacity-50"
          variants={circleAnimation(5, 1, 25)}
          initial="hidden"
          animate="visible"
          layout
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-50"
          variants={circleAnimation(7, 1.2, 40)}
          initial="hidden"
          animate="visible"
          layout
        ></motion.div>
        <motion.div
          className="absolute bottom-1/3 right-0 w-28 h-28 bg-green-400 rounded-full opacity-50"
          variants={circleAnimation(5.5, 0.8, 35)}
          initial="hidden"
          animate="visible"
          layout
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 right-10 w-20 h-20 bg-red-400 rounded-full opacity-50"
          variants={circleAnimation(6.2, 1.5, 28)}
          initial="hidden"
          animate="visible"
          layout
        ></motion.div>
      </motion.div>

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
              onMouseLeave={() => {
                // Hide tooltip if not over it
                setTimeout(() => {
                  if (!isTooltipVisible.current) {
                    setHoveredSkill(null);
                  }
                }, 100);
              }}
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
                      onMouseEnter={(e) => {
                        setHoveredSkill(skill);
                        isTooltipVisible.current = true;
                        setTooltipPosition(calculateTooltipPosition(e));
                      }}
                      onMouseLeave={() => {
                        isTooltipVisible.current = false;
                        // Hide tooltip if not over it
                        setTimeout(() => {
                          if (!isTooltipVisible.current) {
                            setHoveredSkill(null);
                          }
                        }, 100);
                      }}
                      onFocus={(e) => {
                        setHoveredSkill(skill);
                        isTooltipVisible.current = true;
                        setTooltipPosition(calculateTooltipPosition(e));
                      }}
                      onBlur={() => {
                        isTooltipVisible.current = false;
                        setHoveredSkill(null);
                      }}
                      tabIndex="0"
                      role="button"
                      aria-label={`Learn more about ${skill.name}`}
                    >
                      {/* Icon with Enhanced Hover Effect */}
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          color: '#38bdf8',
                          textShadow:
                            '0px 0px 8px rgba(56, 189, 248, 0.8)',
                        }}
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

      {/* Wikipedia Preview */}
      {hoveredSkill && wikiPreview && (
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

      {/* Add wavy gradient animation and glassmorphic effect */}
      <style jsx>{`
        .glassmorphic-tooltip {
          background: linear-gradient(
            270deg,
            rgba(255, 0, 117, 0.4),
            rgba(255, 119, 205, 0.4),
            rgba(119, 170, 255, 0.4),
            rgba(0, 117, 255, 0.4)
          );
          background-size: 800% 800%;
          animation: gradient-flow 15s ease infinite;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 50% 100%;
          }
          50% {
            background-position: 100% 50%;
          }
          75% {
            background-position: 50% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsTechnologies;
