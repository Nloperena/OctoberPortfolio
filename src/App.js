import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import HeroSection from './components/HeroSection';
import WhoIam from './components/WhoIAm';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Skills from './components/SkillsTechnologies';
import Benefits from './components/BenefitsSection';
import SpecialOffer from './components/SpecialOffer';
import BackgroundVideo from './components/BackgroundVideo'; // Import the background video component

const App = () => {
  const [showModal, setShowModal] = useState(false); // Modal state
  const location = useLocation(); // Get the current location

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="App bg-gray-900 min-h-screen text-white overflow-hidden relative">
      {/* Background video */}
      <BackgroundVideo /> {/* Add the background video */}

      <Navbar onContactClick={openModal} /> {/* Pass down the modal trigger */}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
              >
                <HeroSection openModal={openModal} />
                <WhoIam />
                <Skills />
                <SpecialOffer openModal={openModal} />
                <Projects />
                <Benefits />
              </motion.div>
            }
          />
          <Route
            path="/projects"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
              >
                <SpecialOffer openModal={openModal} />
                <Projects />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {showModal && <Modal closeModal={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
