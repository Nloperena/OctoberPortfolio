import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHtml5, faCss3Alt, faJsSquare, faReact, faNodeJs, faPython, faGitAlt, faJava, 
  faFigma, faShopify, faPhp, faBootstrap, faWordpress, faWindows 
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase, faCode, faCogs, faServer, faNetworkWired, faPencilRuler, faEnvelope, 
  faProjectDiagram, faSitemap, faSearch, faMousePointer, faLock, faUserShield 
} from '@fortawesome/free-solid-svg-icons';

// Skill categories with appropriate icons
const skillCategories = [
  {
    genre: 'Web Development',
    skills: [
      { name: 'HTML5', icon: faHtml5 },
      { name: 'CSS3', icon: faCss3Alt },
      { name: 'JavaScript', icon: faJsSquare },
      { name: 'TypeScript', icon: faJsSquare }, // Placeholder, no TypeScript icon in FontAwesome
      { name: 'React', icon: faReact },
      { name: 'Node.js', icon: faNodeJs },
      { name: 'MySQL', icon: faDatabase },
      { name: 'PHP', icon: faPhp },
      { name: 'MongoDB', icon: faDatabase },
      { name: 'WordPress', icon: faWordpress },
    ],
  },
  {
    genre: 'Design Tools',
    skills: [
      { name: 'Figma', icon: faFigma },
      { name: 'Photoshop', icon: faPencilRuler }, // Generic design tool icon
      { name: 'Illustrator', icon: faPencilRuler }, // Generic design tool icon
      { name: 'After Effects', icon: faPencilRuler }, // Generic design tool icon
      { name: 'Premier Pro', icon: faPencilRuler }, // Generic design tool icon
      { name: '3D Modeling (Blender)', icon: faPencilRuler }, // Placeholder for 3D modeling
    ],
  },
  {
    genre: 'Marketing Tools & Platforms',
    skills: [
      { name: 'SEO (Search Engine Optimization)', icon: faSearch },
      { name: 'MailChimp', icon: faEnvelope },
      { name: 'Shopify', icon: faShopify },
      { name: 'Email Marketing', icon: faEnvelope },
    ]
  },
  {
    genre: 'Networking & Security',
    skills: [
      { name: 'Networking (Cisco, OSPF, Packet Tracer)', icon: faNetworkWired },
      { name: 'Wireshark', icon: faLock },
      { name: 'Kali Linux', icon: faUserShield }, // Placeholder for Kali Linux
      { name: 'Cybersecurity', icon: faLock },
    ],
  },
  {
    genre: 'Project & Team Tools',
    skills: [
      { name: 'Git', icon: faGitAlt },
      { name: 'Project Management', icon: faProjectDiagram },
      { name: 'Team Collaboration (Slack, Discord)', icon: faSitemap }, // Placeholder
      { name: 'Emailjs', icon: faEnvelope }, // Placeholder
    ],
  },
];

// Custom Animation for Slide Up Effect
const splitAndSlideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 50,
    },
  }),
};

const SkillsTechnologies = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  };

  return (
    <div 
      className="relative py-12 px-4"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #6a00ff, #00008b)`,
        transition: 'background 0.1s ease',
      }}
    >
      {/* Breathing Border */}
      <motion.div
        className="absolute inset-0 border-4 border-cyan-400 rounded-lg"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ zIndex: -1 }}
      />

      {/* Aligning Title to the Left and Adding Subheading */}
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-left text-white mb-2 neon-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Skills & Technologies
      </motion.h2>
      <motion.h3
        className="text-lg lg:text-2xl text-left text-gray-200 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        A comprehensive overview of the tools and technologies I excel in.
      </motion.h3>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.genre}
            className="skills-genre p-5 bg-black bg-opacity-70 rounded-lg shadow-inner relative"
            initial="hidden"
            animate="visible"
            variants={splitAndSlideUp}
            custom={index}
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 0px 20px 10px rgba(0, 255, 255, 0.8)',
              backgroundImage: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
              transition: {
                duration: 0.3,
                ease: 'easeInOut'
              },
            }}
            whileTap={{
              scale: 1.05,
              boxShadow: '0px 0px 20px 10px rgba(0, 255, 255, 0.8)', // For mobile tap interaction
            }}
          >
            <h3 className="text-2xl lg:text-3xl mb-4 text-cyan-400">{category.genre}</h3>
            <table className="w-full table-auto">
              <tbody>
                {category.skills.map((skill, i) => (
                  <tr key={i}>
                    <td className="py-2">
                      <FontAwesomeIcon icon={skill.icon} className="text-cyan-400 w-6 h-6 mr-2" />
                    </td>
                    <td className="py-2 text-md lg:text-lg">{skill.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ))}

        {/* Adding a final image box */}
        <motion.div
          className="skills-genre p-5 bg-cover bg-center rounded-lg shadow-inner relative"
          initial="hidden"
          animate="visible"
          variants={splitAndSlideUp}
          custom={skillCategories.length}
          style={{
            backgroundImage: "url('../assets/portfolio-image.jpg')", // Use your preferred image path
            height: '300px',
            boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.6)',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 0px 20px 10px rgba(0, 255, 255, 0.8)',
            transition: {
              duration: 0.3,
              ease: 'easeInOut'
            },
          }}
          whileTap={{
            scale: 1.05,
            boxShadow: '0px 0px 20px 10px rgba(0, 255, 255, 0.8)', // Mobile tap interaction
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default SkillsTechnologies;
