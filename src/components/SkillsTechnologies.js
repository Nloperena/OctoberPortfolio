import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHtml5, faCss3Alt, faJsSquare, faReact, faNodeJs, faPython, faFigma, faWordpress, faShopify, faWix, 
  faWebflow
} from '@fortawesome/free-brands-svg-icons'; // Import faWix as a placeholder for Webflow
import { 
  faCode, faServer, faNetworkWired, faLock, faPencilRuler, faDatabase, faPalette, faLaptopCode, faShieldAlt, faCloud 
} from '@fortawesome/free-solid-svg-icons';

// Expanded skill categories with a more balanced set of skills
const skillCategories = [
  {
    category: 'Design',
    icon: faPalette,
    skills: [
      { name: 'Figma', icon: faFigma },
      { name: 'Adobe Photoshop', icon: faPencilRuler },
      { name: 'Adobe Illustrator', icon: faPencilRuler },
      { name: 'Blender', icon: faPencilRuler },
      { name: 'Adobe Premiere Pro', icon: faPencilRuler },
      { name: 'Adobe After Effects', icon: faPencilRuler },
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
      { name: 'TailwindCSS', icon: faCss3Alt },
      { name: 'Framer', icon: faLaptopCode },
      { name: 'WordPress', icon: faWordpress },
      { name: 'Shopify', icon: faShopify },
      {name: 'Webflow', icon: faWebflow },
      { name: 'Wix', icon: faWix }, // Added Webflow using faWix as a placeholder
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
      { name: 'Database Management', icon: faDatabase },
      { name: 'IT Support', icon: faShieldAlt },
      { name: 'Virtualization', icon: faCode },
      { name: 'Cloud Platforms (AWS, Azure)', icon: faCloud },
    ],
  },
];

const SkillsTechnologies = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="skills-section py-16 lg:py-32 relative overflow-hidden bg-gray-900">
      <div className="container mx-auto px-4 lg:px-16 max-w-7xl">

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
        <div className="category-buttons grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center items-center relative">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              className={`category-button w-full h-36 flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg cursor-pointer transition-all ${
                selectedCategory === category.category
                  ? 'transform scale-110 shadow-lg shadow-teal-500/50'
                  : 'hover:scale-105'
              }`}
              onClick={() => handleCategoryClick(category.category)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {/* Icon */}
              <FontAwesomeIcon icon={category.icon} className="text-white w-10 h-10 mb-2" />
              {/* Category Name */}
              <span className="text-white text-lg font-bold">{category.category}</span>
            </motion.div>
          ))}
        </div>

        {/* Skills for Selected Category */}
        <motion.div
          className="skills-container mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={selectedCategory ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedCategory && (
            <motion.div
              className="skills-list bg-gray-800 p-8 rounded-lg shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6"
              layout
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
                  >
                    <FontAwesomeIcon icon={skill.icon} className="text-teal-400 w-10 h-10 mb-2" />
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
