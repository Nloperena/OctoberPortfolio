import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlanCard from './components/PlanCard';
import ComparisonTable from './components/ComparisonTable';
import HeroSection from './components/Herosection';
import AddOnSection from './components/AddOnSection';
import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';
import StickyShapes from './components/StickyShapes';
import Footer from './components/Footer';
import { plans } from './data/plans';
import WhoIAm from './components/WhoIAm';
import Projects from './components/Projects';
import LocalWebServicesSection from './components/LocalWebServicesSection';
import SkillsTechnologies from './components/SkillsTechnologies';
import ContactForm from './components/ContactForm';
import MaintenancePlans from './components/MaintenancePlans';
import HowItWorks from './components/HowItWorks';
import Modal from './components/Modal'; // Import the modal component

function App() {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (planId) => {
    setSelectedPlans((prevSelected) => {
      if (prevSelected.includes(planId)) {
        return prevSelected.filter((id) => id !== planId);
      } else {
        setSelectedPlan(plans.find((plan) => plan.id === planId)); // Set the selected plan
        setShowModal(true); // Show the modal when a plan is selected
        return [...prevSelected, planId];
      }
    });
  };

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
          <Route
            path="/"
            element={
              <>
                <StickyShapes />
                <HeroSection />
                <WhoIAm />
                <Projects />
                <LocalWebServicesSection />
              </>
            }
          />

          <Route
            path="/projects"
            element={
              <>
                <Projects />
                <SkillsTechnologies />
              </>
            }
          />

          <Route
            path="/pricing"
            element={
              <>
                <div className="container mx-auto p-0">
                  <HeroSection />
                  <div className="container mx-auto p-4">
                    <h1 className="text-4xl font-bold text-center mb-8">
                      Choose the Perfect Plan for Your Business
                    </h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {plans.map((plan) => (
                        <PlanCard
                          key={plan.id}
                          plan={plan}
                          isSelected={selectedPlans.includes(plan.id)}
                          onSelect={handlePlanSelection}
                        />
                      ))}
                    </div>
                    {selectedPlans.length > 0 && (
                      <ComparisonTable selectedPlans={selectedPlans} />
                    )}
                  </div>
                </div>
                <AddOnSection />
                <MaintenancePlans />
              </>
            }
          />

          <Route path="/maintenance-plans" element={<MaintenancePlans />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>

        <Footer />

        {/* Modal for Plan Selection */}
        {showModal && (
          <Modal
            selectedPlan={selectedPlan}
            closeModal={() => setShowModal(false)} // Close modal function
          />
        )}
      </motion.div>
    </Router>
  );
}

export default App;
