// src/components/LocalWebServicesSection.js

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faSearchLocation, faMobileAlt, faPaintBrush } from '@fortawesome/free-solid-svg-icons';

// Animation variants for fading in and scaling
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const LocalWebServicesSection = () => {
  return (
    <section className="local-web-services-section py-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 animate-gradient text-white relative overflow-hidden">
      {/* Gradient Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-[-1]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Features Section */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl font-bold text-left mb-8 text-blue-400 neon-text">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Custom Website Design */}
            <motion.div
              className="feature-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <FontAwesomeIcon icon={faLaptopCode} className="text-5xl text-blue-400 mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Custom Website Design</h3>
              <p className="text-lg text-blue-200">
                Tailored website designs that perfectly capture your brand identity and help you stand out in the local market.
              </p>
            </motion.div>

            {/* Local SEO Optimization */}
            <motion.div
              className="feature-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <FontAwesomeIcon icon={faSearchLocation} className="text-5xl text-blue-400 mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Local SEO Optimization</h3>
              <p className="text-lg text-blue-200">
                SEO strategies that boost your visibility in local searches, ensuring customers in your area can find you easily.
              </p>
            </motion.div>

            {/* Responsive Development */}
            <motion.div
              className="feature-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <FontAwesomeIcon icon={faMobileAlt} className="text-5xl text-blue-400 mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Responsive Development</h3>
              <p className="text-lg text-blue-200">
                Ensure your website looks and performs perfectly on all devices, from mobile to desktop.
              </p>
            </motion.div>

            {/* Interactive Animation */}
            <motion.div
              className="feature-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <FontAwesomeIcon icon={faPaintBrush} className="text-5xl text-blue-400 mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Interactive Animation</h3>
              <p className="text-lg text-blue-200">
                Subtle, engaging animations that create a seamless user experience and guide visitors through your site.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="benefits-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl font-bold text-left mb-8 text-blue-400 neon-text">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Increased Customer Engagement */}
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-semibold mb-2">Increased Customer Engagement</h3>
              <p className="text-lg text-blue-200">
                Interactive animations and responsive design keep visitors engaged, leading to higher conversions and user retention.
              </p>
            </motion.div>

            {/* Higher Local Visibility */}
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-semibold mb-2">Higher Local Visibility</h3>
              <p className="text-lg text-blue-200">
                Local SEO boosts your ranking on search engines, ensuring more local customers find your business.
              </p>
            </motion.div>

            {/* Improved User Experience */}
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-semibold mb-2">Improved User Experience</h3>
              <p className="text-lg text-blue-200">
                Seamless navigation and animations provide an intuitive experience, encouraging visitors to explore more.
              </p>
            </motion.div>

            {/* Professional & Trustworthy Appearance */}
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-semibold mb-2">Professional & Trustworthy Appearance</h3>
              <p className="text-lg text-blue-200">
                A custom design tailored to your business builds trust with customers and elevates your professional image.
              </p>
            </motion.div>

            {/* Mobile-First Advantage */}
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-semibold mb-2">Mobile-First Advantage</h3>
              <p className="text-lg text-blue-200">
                As most local customers browse on mobile, responsive design ensures they have a smooth experience.
              </p>
            </motion.div>

            {/* Increased Conversion Rates */}
            <motion.div
              className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-semibold mb-2">Increased Conversion Rates</h3>
              <p className="text-lg text-blue-200">
                Clear navigation and design focus help guide customers towards making purchases or bookings, boosting your sales.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalWebServicesSection;
