import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faHandshake, faRocket, faClock, faSearchLocation, faMobileAlt, faPaintBrush, faUsers, faEye, faMobile } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Animation variants for sliding in from the left and fading in
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

// Animation variants for blurring in paragraphs
const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }
};

// Staggered effect for the headlines
const container = {
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

const BenefitsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const benefits = [
    {
      title: "Custom Solutions",
      description: "I provide tailored solutions that fit your unique needs and business goals.",
      expandedDescription: "Every project is unique, and I take the time to understand your requirements and craft a solution specifically for you.",
      icon: faLaptopCode
    },
    {
      title: "Collaborative Approach",
      description: "I believe in working closely with clients to ensure we achieve the best results together.",
      expandedDescription: "Your insights and feedback are essential in creating a website that truly reflects your vision.",
      icon: faHandshake
    },
    {
      title: "Rapid Development",
      description: "My efficient processes ensure that your project is completed quickly without compromising quality.",
      expandedDescription: "Using the latest tools and methodologies, I can deliver your project in a timely manner.",
      icon: faRocket
    },
    {
      title: "Timely Support",
      description: "I offer ongoing support and maintenance to keep your website running smoothly.",
      expandedDescription: "From updates to troubleshooting, I'm here to help you every step of the way.",
      icon: faClock
    },
    {
      title: "SEO Optimization",
      description: "I implement SEO best practices to ensure your site gets the visibility it deserves.",
      expandedDescription: "I use targeted keywords and optimization techniques to improve your site's ranking.",
      icon: faSearchLocation
    },
    {
      title: "Long-Term Partnership",
      description: "I aim to build lasting relationships with my clients for future projects and collaborations.",
      expandedDescription: "Let's work together not just for a project, but for a continuous journey towards your business growth.",
      icon: faHandshake
    }
  ];

  return (
    <section className="benefits-section py-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 animate-gradient text-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <motion.h2
          className="text-5xl font-bold text-blue-400 text-center mb-16 neon-text"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Benefits of Working with Me
        </motion.h2>

        {/* Benefits Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={index}
              variants={slideInLeft}
            >
              <FontAwesomeIcon icon={benefit.icon} className="text-blue-400 text-5xl mb-4" />
              <motion.h3 className="text-3xl font-semibold text-white mb-4">
                {benefit.title}
              </motion.h3>
              <motion.div className="relative h-20 overflow-hidden">
                {hoveredIndex === index ? (
                  <motion.p
                    key="expanded"
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }}
                    exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8 } }}
                    className="text-lg text-blue-200"
                  >
                    {benefit.expandedDescription}
                  </motion.p>
                ) : (
                  <motion.p
                    key="default"
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }}
                    exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8 } }}
                    className="text-lg text-blue-200"
                  >
                    {benefit.description}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
