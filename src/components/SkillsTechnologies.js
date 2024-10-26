import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHtml5, faCss3Alt, faJsSquare, faReact, faNodeJs, faPython, faFigma, faWordpress, faShopify, faWix, 
  faWebflow
} from '@fortawesome/free-brands-svg-icons'; // Import faWix as a placeholder for Webflow
import { 
  faCode, faServer, faNetworkWired, faLock, faPencilRuler, faDatabase, faPalette, faLaptopCode, faShieldAlt, faCloud 
} from '@fortawesome/free-solid-svg-icons';

const skillCategories = [
  {
    category: 'Design',
    icon: faPalette,
    skills: [
      {
        name: 'Figma',
        icon: faFigma,
        description: 'A collaborative interface design tool used for UI/UX design and prototyping.',
      },
      {
        name: 'Adobe Photoshop',
        icon: faPencilRuler,
        description: 'A software for image editing and photo retouching for various image formats.',
      },
      {
        name: 'Adobe Illustrator',
        icon: faPencilRuler,
        description: 'A vector graphics editor used for creating logos, icons, and illustrations.',
      },
      {
        name: 'Blender',
        icon: faPencilRuler,
        description: 'An open-source 3D creation suite supporting modeling, animation, and rendering.',
      },
      {
        name: 'Adobe Premiere Pro',
        icon: faPencilRuler,
        description: 'A timeline-based video editing software application developed by Adobe.',
      },
      {
        name: 'Adobe After Effects',
        icon: faPencilRuler,
        description: 'A digital visual effects and motion graphics application for compositing and animation.',
      },
      {
        name: 'UI/UX Design',
        icon: faFigma,
        description: 'The process of designing user interfaces and experiences for software and applications.',
      },
    ],
  },
  {
    category: 'Development',
    icon: faLaptopCode,
    skills: [
      {
        name: 'HTML5',
        icon: faHtml5,
        description: 'The standard markup language for creating web pages and web applications.',
      },
      {
        name: 'CSS3',
        icon: faCss3Alt,
        description: 'A style sheet language used for describing the look and formatting of a document written in HTML.',
      },
      {
        name: 'JavaScript',
        icon: faJsSquare,
        description: 'A programming language that conforms to the ECMAScript specification, used for web development.',
      },
      {
        name: 'React',
        icon: faReact,
        description: 'A JavaScript library for building user interfaces, maintained by Facebook.',
      },
      {
        name: 'Node.js',
        icon: faNodeJs,
        description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine, used for server-side scripting.',
      },
      {
        name: 'Python',
        icon: faPython,
        description: 'A high-level, interpreted programming language known for its readability and versatility.',
      },
      {
        name: 'TailwindCSS',
        icon: faCss3Alt,
        description: 'A utility-first CSS framework for rapidly building custom user interfaces.',
      },
      {
        name: 'Framer',
        icon: faLaptopCode,
        description: 'A prototyping tool that allows designers to create responsive layouts and interactive components.',
      },
      {
        name: 'WordPress',
        icon: faWordpress,
        description: 'An open-source content management system used to build and maintain websites.',
      },
      {
        name: 'Shopify',
        icon: faShopify,
        description: 'A commerce platform that allows anyone to set up an online store and sell their products.',
      },
      {
        name: 'Webflow',
        icon: faWebflow,
        description: 'A web design tool, CMS, and hosting platform in one, allowing for responsive web design.',
      },
      {
        name: 'Wix',
        icon: faWix,
        description: 'A cloud-based web development platform that allows users to create HTML5 websites through drag and drop tools.',
      },
    ],
  },
  {
    category: 'IT',
    icon: faShieldAlt,
    skills: [
      {
        name: 'Networking',
        icon: faNetworkWired,
        description: 'The practice of interfacing two or more computing devices for the purpose of sharing data.',
      },
      {
        name: 'Cybersecurity',
        icon: faLock,
        description: 'The practice of protecting systems, networks, and programs from digital attacks.',
      },
      {
        name: 'Server Management',
        icon: faServer,
        description: 'The process of monitoring and maintaining servers to operate at peak performance.',
      },
      {
        name: 'Cloud Computing',
        icon: faCode,
        description: 'Delivery of computing services over the internet to offer faster innovation and flexible resources.',
      },
      {
        name: 'Database Management',
        icon: faDatabase,
        description: 'The use of software to store and organize data in a structured way for easy access and management.',
      },
      {
        name: 'IT Support',
        icon: faShieldAlt,
        description: 'Assistance with technology-related issues including hardware, software, and network problems.',
      },
      {
        name: 'Virtualization',
        icon: faCode,
        description: 'The creation of a virtual version of something, such as operating systems or network resources.',
      },
      {
        name: 'Cloud Platforms (AWS, Azure)',
        icon: faCloud,
        description: 'Services offered by Amazon and Microsoft for cloud computing, storage, and networking.',
      },
    ],
  },
];

const SkillsTechnologies = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setHoveredSkill(null); // Reset hovered skill when category changes
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
              className={`category-button w-full h-36 flex flex-col items-center justify-center rounded-lg cursor-pointer transform transition-transform duration-300 ${
                selectedCategory === category.category
                  ? 'scale-110 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 border-4 border-white'
                  : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:scale-105'
              }`}
              onClick={() => handleCategoryClick(category.category)}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon */}
              <FontAwesomeIcon icon={category.icon} className="text-white w-10 h-10 mb-2" />
              {/* Category Name */}
              <span className="text-white text-lg font-bold">{category.category}</span>
            </motion.div>
          ))}
        </div>

        {/* Skills for Selected Category */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              key="skills-container"
              className="skills-container mt-12 lg:mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
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
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Icon with Enhanced Hover Effect */}
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          color: '#38bdf8', // Tailwind CSS color cyan-400
                          textShadow: '0px 0px 8px rgba(56, 189, 248, 0.8)',
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <FontAwesomeIcon icon={skill.icon} className="text-teal-400 w-10 h-10 mb-2" />
                      </motion.div>
                      <span className="text-white text-md">{skill.name}</span>
                    </motion.div>
                  ))}
              </motion.div>

              {/* Description for Hovered Skill */}
              <AnimatePresence>
                {hoveredSkill && (
                  <motion.div
                    key="skill-description"
                    className="skill-description mt-8 p-6 bg-gray-700 rounded-lg text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">{hoveredSkill.name}</h3>
                    <p className="text-lg">{hoveredSkill.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsTechnologies;