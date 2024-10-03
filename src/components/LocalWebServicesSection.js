import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faSearchLocation, faMobileAlt, faPaintBrush, faUsers, faEye, faHandshake, faMobile } from '@fortawesome/free-solid-svg-icons';

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

const LocalWebServicesSection = () => {
  // State for scroll position controlling the rotation
  const [scrollRotation, setScrollRotation] = useState(0);

  // Effect to handle scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const rotation = window.scrollY / 5; // Adjust the division for speed of rotation
      setScrollRotation(rotation);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="local-web-services-section py-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 animate-gradient text-white relative overflow-hidden">
      {/* Rotating SVGs */}
      {/* Top-left SVG */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] opacity-30"
        style={{ transform: `rotate(${scrollRotation}deg)` }} // Rotate based on scroll
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 90,35 90,75 50,90 10,75 10,35" stroke="white" strokeWidth="6" fill="none" />
        </svg>
      </div>

      {/* Bottom-right SVG */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] opacity-30"
        style={{ transform: `rotate(${scrollRotation}deg)` }} // Rotate based on scroll
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 90,35 90,75 50,90 10,75 10,35" stroke="white" strokeWidth="6" fill="none" />
        </svg>
      </div>

      {/* Gradient Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-[-1]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* First Wrapper for Features Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column: Features Text Section */}
          <div className="flex flex-col justify-center">
            {/* Headline Animation */}
            <motion.h2 className="text-5xl font-bold mb-4 text-blue-400 neon-text" variants={slideInLeft}>
              Why Choose My Services?
            </motion.h2>
            {/* Paragraph Animation with Blur */}
            <motion.p className="text-lg text-blue-200 mb-6" variants={blurIn}>
              When it comes to establishing a strong online presence, having a website that is not only visually appealing but also fully optimized for performance is essential.
              My web development services focus on creating custom-designed websites that reflect your brand identity while ensuring a seamless experience for your users.
            </motion.p>
            <motion.p className="text-lg text-blue-200" variants={blurIn}>
              I specialize in building responsive, mobile-friendly websites that look stunning on any device. Additionally, my expertise in local SEO ensures that your business will rank higher
              in search engine results, making it easier for local customers to find you. Partnering with me means getting a website that stands out from the competition and helps your business thrive.
            </motion.p>
          </div>

          {/* Right Column: Features Cards Section */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
            >
              <motion.h2 className="text-5xl font-bold text-left mb-8 text-blue-400 neon-text" variants={slideInLeft}>
                Features of My Services
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                {/* Custom Website Design */}
                <motion.div
                  className="feature-card bg-[#112240] rounded-lg p-8 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  variants={slideInLeft}
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
                  variants={slideInLeft}
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
                  variants={slideInLeft}
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
                  variants={slideInLeft}
                >
                  <FontAwesomeIcon icon={faPaintBrush} className="text-5xl text-blue-400 mb-4" />
                  <h3 className="text-3xl font-semibold mb-2">Interactive Animation</h3>
                  <p className="text-lg text-blue-200">
                    Subtle, engaging animations that create a seamless user experience and guide visitors through your site.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Second Wrapper for Benefits Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column: Benefits Text Section */}
          <div className="flex flex-col justify-center">
            <motion.h2 className="text-5xl font-bold mb-4 text-blue-400 neon-text" variants={slideInLeft}>
              Why Work With Me?
            </motion.h2>
            <motion.p className="text-lg text-blue-200 mb-6" variants={blurIn}>
              Working with me means your website will be a perfect blend of design and functionality. I ensure your site is built not only to attract customers but to keep them engaged.
              From interactive animations to user-friendly navigation, every element is designed to elevate your online presence.
            </motion.p>
            <motion.p className="text-lg text-blue-200" variants={blurIn}>
              I take a mobile-first approach, ensuring your website performs well on all devices. My experience in local SEO also guarantees that your business will be more visible to potential customers in your area. Here are some benefits of choosing my services:
            </motion.p>
          </div>

          {/* Right Column: Benefits Cards Section */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
            >
              <motion.h2 className="text-5xl font-bold text-left mb-8 text-blue-400 neon-text" variants={slideInLeft}>
                Benefits of Working with Me
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                {/* Increased Customer Engagement */}
                <motion.div
                  className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  variants={slideInLeft}
                >
                  <FontAwesomeIcon icon={faUsers} className="text-5xl text-blue-400 mb-4" />
                  <h3 className="text-3xl font-semibold mb-2">Increased Customer Engagement</h3>
                  <p className="text-lg text-blue-200">
                    Interactive animations and responsive design keep visitors engaged, leading to higher conversions and user retention.
                  </p>
                </motion.div>

                {/* Higher Local Visibility */}
                <motion.div
                  className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  variants={slideInLeft}
                >
                  <FontAwesomeIcon icon={faEye} className="text-5xl text-blue-400 mb-4" />
                  <h3 className="text-3xl font-semibold mb-2">Higher Local Visibility</h3>
                  <p className="text-lg text-blue-200">
                    Local SEO boosts your ranking on search engines, ensuring more local customers find your business.
                  </p>
                </motion.div>

                {/* Improved User Experience */}
                <motion.div
                  className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  variants={slideInLeft}
                >
                  <FontAwesomeIcon icon={faMobile} className="text-5xl text-blue-400 mb-4" />
                  <h3 className="text-3xl font-semibold mb-2">Improved User Experience</h3>
                  <p className="text-lg text-blue-200">
                    Seamless navigation and animations provide an intuitive experience, encouraging visitors to explore more.
                  </p>
                </motion.div>

                {/* Professional & Trustworthy Appearance */}
                <motion.div
                  className="benefit-card bg-[#112240] rounded-lg p-8 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  variants={slideInLeft}
                >
                  <FontAwesomeIcon icon={faHandshake} className="text-5xl text-blue-400 mb-4" />
                  <h3 className="text-3xl font-semibold mb-2">Professional & Trustworthy Appearance</h3>
                  <p className="text-lg text-blue-200">
                    A custom design tailored to your business builds trust with customers and elevates your professional image.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalWebServicesSection;
