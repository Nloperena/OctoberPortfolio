import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AddOns = ({ selectedPlan, onAddOnSelect }) => {
  const addOns = [
    {
      title: 'Additional Pages',
      price: 100,
      description: 'Add more content to your website.',
    },
    {
      title: 'E-commerce Integration',
      price: 500,
      description: 'Integrate a store and manage your products online.',
    },
    {
      title: 'Custom Animations',
      price: 300,
      description: 'Bring your website to life with custom animations.',
    },
  ];

  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const handleAddOnSelect = (addOn) => {
    const isSelected = selectedAddOns.includes(addOn);

    if (isSelected) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== addOn));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }

    // Update the parent component with the selected add-ons
    onAddOnSelect(isSelected ? selectedAddOns.filter((item) => item !== addOn) : [...selectedAddOns, addOn]);
  };

  return (
    <motion.div className="addons-section p-10 flex justify-center items-center min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Add-Ons for {selectedPlan.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addOns.map((addOn, index) => (
            <motion.div 
              key={index}
              className={`transition transform p-4 rounded-md ${selectedAddOns.includes(addOn) ? 'bg-blue-700 ring-4 ring-blue-500 scale-105' : 'bg-gray-800 bg-opacity-40 border border-gray-600 hover:scale-105 hover:bg-opacity-60'}`}
              onClick={() => handleAddOnSelect(addOn)}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{addOn.title}</h3>
              <p className="text-xl font-semibold text-white mb-4">${addOn.price}</p>
              <p className="text-sm text-white mb-6">{addOn.description}</p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded">
                {selectedAddOns.includes(addOn) ? 'Remove Add-On' : 'Add to Plan'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AddOns;
