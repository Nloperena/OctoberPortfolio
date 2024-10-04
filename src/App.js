import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SkillsTechnologies from './components/SkillsTechnologies';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import Pricing from './components/Pricing';
import { motion } from 'framer-motion';
import './index.css'; 
import LocalWebServicesSection from './components/LocalWebServicesSection';
import BackgroundVideo from './components/BackgroundVideo';
import StickyShapes from './components/StickyShapes';
import AddOnsSection from './components/AddOnSection.js'; // Corrected import path for AddOnsSection
import MaintenancePlans from './components/MaintenancePlans'; // New import for MaintenancePlans
import HowItWorks from './components/HowItWorks'; // New import for HowItWorks
import AddOns from './components/AddOns.js';
import Footer from './components/Footer.js';

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
        {/* Navbar */}
        <Navbar />

        {/* Sticky Background Video */}
        <BackgroundVideo />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<>
            <StickyShapes />
            <Hero />
         
            <Projects />
            <LocalWebServicesSection />
          </>} />
          
          <Route path="/projects" element={<>
            <Projects /> 
            <SkillsTechnologies />
          </>} />
          
          <Route path="/pricing" element={
            <>
            <Pricing />
            <AddOns />
            <MaintenancePlans />
            </>
            } />
          <Route path="/maintenance-plans" element={<MaintenancePlans />} /> {/* Route for Maintenance Plans */}
          <Route path="/how-it-works" element={<HowItWorks />} /> {/* Route for How it Works */}
          <Route path="/contact" element={<ContactForm />} />
        </Routes>

       <Footer />
      </motion.div>
    </Router>
  );
}

export default App;
