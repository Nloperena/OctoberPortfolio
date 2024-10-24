import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import HeroSection from './components/HeroSection';
import WhoIam from './components/WhoIAm';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Skills from './components/SkillsTechnologies';
import Benefits from './components/BenefitsSection';
import SpecialOffer from './components/SpecialOffer';
import BackgroundVideo from './components/BackgroundVideo'; // Import your background video component

function App() {
  const [showModal, setShowModal] = useState(false); // Modal state

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Router>
      <div className="App bg-gray-900 min-h-screen text-white overflow-hidden relative">
        {/* Background video */}
        <BackgroundVideo /> 

        <Navbar onContactClick={openModal} /> {/* Pass down the modal trigger */}
        
        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <HeroSection openModal={openModal} /> {/* Pass openModal prop */}
                <WhoIam />
                <Benefits />
                <Projects />
                <SpecialOffer openModal={openModal} /> {/* Pass openModal prop */}
              </div>
            }
          />
          <Route
            path="/projects"
            element={
              <div>
                <Skills />
                <SpecialOffer openModal={openModal} /> {/* Pass openModal prop */}
                <Projects />
              </div>
            }
          />
        </Routes>

        <Footer />

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <Modal closeModal={closeModal} /> 
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
