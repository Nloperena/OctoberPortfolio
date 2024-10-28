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

// Page transition animation
const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8 // Adjusted duration for smoother transition
};

function App() {
  const [showModal, setShowModal] = useState(false); // Modal state
  const location = useLocation(); // Get the current location

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="App bg-gray-900 min-h-screen text-white overflow-hidden relative">
      {/* Background video */}
      <BackgroundVideo /> {/* Add the background video */}

      <Navbar onContactClick={openModal} /> {/* Pass down the modal trigger */}

      {/* AnimatePresence for page transitions */}
      <AnimatePresence mode="wait"> {/* Use mode="wait" to ensure exit finishes before enter */}
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HeroSection openModal={openModal} /> {/* Pass openModal prop */}
                <WhoIam />
                <Skills />
                <SpecialOffer openModal={openModal} /> {/* Pass openModal prop */}
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
                variants={pageVariants}
                transition={pageTransition}
              >
                <SpecialOffer openModal={openModal} /> {/* Pass openModal prop */}
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
}

export default App;
