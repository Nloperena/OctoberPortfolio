import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faHandshake, faRocket, faClock, faSearchLocation, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Reuse the button hover animation and modal trigger from SpecialOffer.js
const buttonHover = {
  hover: { scale: 1.05, boxShadow: '0px 0px 15px rgba(255,165,0,0.5)' },
  tap: { scale: 0.95 },
};

const BenefitsSection = ({ openModal }) => {
  const benefits = [
    {
      title: "Custom Solutions",
      description: "I don't just build websites—I solve business problems. Each solution is tailored specifically to your needs, helping your business stand out.",
      icon: faLaptopCode
    },
    {
      title: "Rapid Development",
      description: "You're not just another project in the queue. I deliver high-quality results quickly, keeping your website on schedule and ready to grow.",
      icon: faRocket
    },
    {
      title: "SEO Optimization",
      description: "I specialize in local SEO for Central Florida, making sure your site ranks higher for keywords that attract the right audience to your business.",
      icon: faSearchLocation
    },
    {
      title: "Collaborative Approach",
      description: "I treat every project as a partnership. Your vision and feedback shape the entire process, ensuring the result perfectly represents your brand.",
      icon: faHandshake
    },
    {
      title: "Timely Support",
      description: "I’m here for the long run. Whether it's troubleshooting or updates, you can count on me for ongoing, personalized support after your website goes live.",
      icon: faClock
    },
    {
      title: "Local Expertise",
      description: "I understand the Central Florida market and know what local businesses need to succeed online. My insights help you connect with your community.",
      icon: faMapMarkerAlt
    }
  ];

  return (
    <section className="benefits-section py-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <motion.h2
          className="text-5xl font-bold text-blue-400 text-center mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }}
        >
          Why Choose Me as Your Web Developer?
        </motion.h2>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }}
            >
              <FontAwesomeIcon icon={benefit.icon} className="text-blue-400 text-5xl mb-4" />
              <h3 className="text-3xl font-semibold text-white mb-4">{benefit.title}</h3>
              <p className="text-lg text-blue-200">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default BenefitsSection;
