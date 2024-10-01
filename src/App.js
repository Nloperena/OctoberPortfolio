import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure BrowserRouter is correctly imported
import Hero from './components/Hero';
import Projects from './components/Projects';
import SkillsTechnologies from './components/SkillsTechnologies';
import ContactForm from './components/ContactForm';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './index.css'; 
import LocalWebServicesSection from './components/LocalWebServicesSection';

function App() {
  return (
    <Router>
      <motion.div
        className="App bg-gray-900 min-h-screen text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="text-center p-10 bg-black bg-opacity-80 neon-header">
          <h1 className="text-5xl font-bold neon-text breathing-text">Nico's Portfolio</h1>
          <p className="mt-3 text-xl neon-subtext breathing-text-small">Frontend Engineer | Designer</p>
        </header>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <LocalWebServicesSection />
                <Projects />
                <SkillsTechnologies />
                <ContactForm />
              </>
            }
          />
        </Routes>

        {/* Footer */}
        <footer className="mt-10 text-center p-5 neon-footer">
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Nloperena" target="_blank" rel="noopener noreferrer" className="neon-icon hover:text-pink-500">
              <FontAwesomeIcon icon={faGithub} className="text-4xl" />
            </a>
            <a href="https://www.linkedin.com/in/nicholas-loperena-022813185/" target="_blank" rel="noopener noreferrer" className="neon-icon hover:text-blue-500">
              <FontAwesomeIcon icon={faLinkedin} className="text-4xl" />
            </a>
            <a href="./assets/Resume-Nicholas Loperena.pdf" target="_blank" rel="noopener noreferrer" className="neon-icon hover:text-green-500">
              <FontAwesomeIcon icon={faFileAlt} className="text-4xl" />
            </a>
          </div>
        </footer>
      </motion.div>
    </Router>
  );
}

export default App;
