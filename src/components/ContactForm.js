import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and y offset
  visible: { opacity: 1, y: 0, transition: { duration: 1 } } // Fade in and move up
};

const ContactForm = () => {
  return (
    <motion.div
      className="container mx-auto my-16 p-8 bg-gray-800 rounded-lg shadow-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <h2 className="text-4xl font-bold text-white mb-6 text-center">Contact Me</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none"
              placeholder="Your Email"
            />
          </div>
        </div>
        <div>
          <label className="block text-white">Message</label>
          <textarea
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none"
            rows="5"
            placeholder="Your Message"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
