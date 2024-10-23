// src/components/SkillsTechnologies.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHtml5, faCss3Alt, faJsSquare, faReact, faNodeJs, faPython, faFigma 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCode, faServer, faNetworkWired, faLock, faPencilRuler, faDatabase, faPalette, faLaptopCode, faShieldAlt 
} from '@fortawesome/free-solid-svg-icons';

// Skill categories with relevant icons
const skillCategories = [
  {
    category: 'Design',
    icon: faPalette,
    skills: [
      { name: 'Figma', icon: faFigma },
      { name: 'Photoshop', icon: faPencilRuler },
      { name: 'Illustrator', icon: faPencilRuler },
      { name: 'UI/UX Design', icon: faFigma },
    ],
  },
  {
    category: 'Development',
    icon: faLaptopCode,
    skills: [
      { name: 'HTML5', icon: faHtml5 },
      { name: 'CSS3', icon: faCss3Alt },
      { name: 'JavaScript', icon: faJsSquare },
      { name: 'React', icon: faReact },
      { name: 'Node.js', icon: faNodeJs },
      { name: 'Python', icon: faPython },
      { name: 'Git', icon: faCode },
      { name: 'MySQL', icon: faDatabase },
    ],
  },
  {
    category: 'IT',
    icon: faShieldAlt,
    skills: [
      { name: 'Networking', icon: faNetworkWired },
      { name: 'Cybersecurity', icon: faLock },
      { name: 'Server Management', icon: faServer },
      { name: 'Cloud Computing', icon: faCode },
    ],
  },
];

const SkillsTechnologies = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setRotationAngle(rotationAngle + 360); // Rotate by 360 degrees
  };

  return (
    <section className="skills-section py-32 relative overflow-hidden">
      <div className="container mx-auto px-8 lg:px-16 relative max-w-7xl">
        
        {/* Skills Heading and Subheading */}
        <motion.h2
          className="text-5xl font-extrabold text-white mb-4 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }} // Keep opacity at 1
          transition={{ duration: 0.3 }}
        >
          Skills
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 mb-12 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }} // Keep opacity at 1
          transition={{ duration: 0.3 }}
        >
          Explore my expertise across different areas
        </motion.p>

        {/* Main Category Buttons in Centered Grid */}
        <div className="category-buttons flex justify-center items-center space-x-12 flex-wrap relative">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              className={`category-button w-48 h-48 ${
                selectedCategory === category.category
                  ? 'bg-gradient-to-r from-blue-400 to-teal-500 shadow-2xl transform scale-110 shadow-cyan-500/50'
                  : 'bg-gradient-to-r from-blue-400 to-teal-500 shadow-lg'
              } rounded-full flex flex-col items-center justify-center text-center cursor-pointer transition-all`}
              onClick={() => handleCategoryClick(category.category)}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              style={{
                boxShadow:
                  selectedCategory === category.category
                    ? '0 0 20px 8px rgba(0, 255, 255, 0.7), 0 10px 20px rgba(0, 0, 0, 0.3)'
                    : '',
              }}
            >
              {/* Icon */}
              <FontAwesomeIcon
                icon={category.icon}
                className="text-white w-16 h-16 mb-2"
                style={{
                  filter: selectedCategory === category.category ? 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7))' : '',
                }}
              />
              {/* Category Name */}
              <span className="text-white text-lg font-bold">{category.category}</span>
            </motion.div>
          ))}
        </div>

        {/* Rotating Container for Skills List */}
        <motion.div
          className="skills-container flex justify-center items-center mt-16"
          style={{
            perspective: '1000px', // Top-down perspective
          }}
          animate={{ rotateY: rotationAngle }} // Rotate the container on Y-axis
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          {/* Skills for Selected Category */}
          {selectedCategory && (
            <motion.div
              className="skills-list bg-gray-800 p-8 rounded-lg shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {skillCategories
                .find((cat) => cat.category === selectedCategory)
                .skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className="skill-item flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.8))',
                    }}
                  >
                    <FontAwesomeIcon icon={skill.icon} className="text-teal-400 w-12 h-12 mb-2" />
                    <span className="text-white text-md">{skill.name}</span>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsTechnologies;
