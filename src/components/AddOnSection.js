import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faChartLine,
  faPencilAlt,
  faPaintBrush,
  faQuestionCircle,
  faCalculator,
  faUserLock,
  faCalendarAlt,
  faGlobe,
  faRobot,
  faImages,
  faBlog
} from '@fortawesome/free-solid-svg-icons'; // Import relevant icons

const AddOnsSection = () => {
  // State to store selected add-ons
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Function to toggle add-ons
  const handleToggleAddOn = (addOn) => {
    setSelectedAddOns((prevAddOns) => {
      if (prevAddOns.includes(addOn)) {
        return prevAddOns.filter((item) => item !== addOn);
      } else {
        return [...prevAddOns, addOn];
      }
    });
  };

  // List of available add-ons with FontAwesome icons
  const addOns = [
    { name: 'Extra Page', price: '$150 per page', icon: faFileAlt },
    { name: 'SEO Optimization', price: '$300', icon: faChartLine },
    { name: 'Content Writing', price: '$100 per page', icon: faPencilAlt },
    { name: 'Logo Design', price: '$250', icon: faPaintBrush },
    { name: 'Custom Quiz', price: '$400', icon: faQuestionCircle },
    { name: 'Custom Calculator', price: '$500', icon: faCalculator },
    { name: 'Membership System', price: '$700', icon: faUserLock },
    { name: 'Event Booking System', price: '$600', icon: faCalendarAlt },
    { name: 'Multilingual Support', price: '$800', icon: faGlobe },
    { name: 'Custom Chatbot Integration', price: '$900', icon: faRobot },
    { name: 'Interactive Portfolio Gallery', price: '$300', icon: faImages },
    { name: 'Blog Setup', price: '$350', icon: faBlog },
  ];

  return (
    <section className="addons-section p-10 flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Add-Ons</h2>
        <div className="grid grid-cols-2 gap-6">
          {addOns.map((addOn) => (
            <div
              key={addOn.name}
              className={`transition transform p-4 rounded-md 
                ${selectedAddOns.includes(addOn.name) 
                  ? 'bg-blue-700 ring-4 ring-blue-500 scale-105' // More opaque blue background for selected cards
                  : 'bg-gray-800 bg-opacity-40 border border-gray-600 hover:scale-105 hover:bg-opacity-60'}`
              }
              onClick={() => handleToggleAddOn(addOn.name)} // Set the value to true/false when clicked
            >
              <div className="flex items-center justify-between mb-2">
                <FontAwesomeIcon icon={addOn.icon} className="text-3xl text-white" />
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addOn.name)}
                  onChange={() => handleToggleAddOn(addOn.name)}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded bg-gray-800 border-gray-600"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">{addOn.name}</h3>
              <p className="text-sm text-white">{addOn.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;
