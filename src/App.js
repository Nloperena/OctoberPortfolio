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
import Testimonials from './components/Testimonials';

const App = () => {
  const [showModal, setShowModal] = useState(false); // Modal state
  const location = useLocation(); // Get the current location

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="App bg-gray-900 min-h-screen text-white overflow-hidden relative">
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
                <Testimonials />
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
          <Route
            path="/testimonials"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
              >
                <Testimonials />
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
