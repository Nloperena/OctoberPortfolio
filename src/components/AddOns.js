// components/AddOns.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AddOns = () => {
  const addOns = [
    {
      title: 'Additional Pages',
      price: '$100/page',
      description: 'Add more content to your website.',
    },
    {
      title: 'E-commerce Integration',
      price: '$500',
      description: 'Integrate a store and manage your products online.',
    },
    {
      title: 'Custom Animations',
      price: '$300',
      description: 'Bring your website to life with custom animations.',
    },
  ];

  return (
    <motion.div className="addons-section py-20 bg-gray-800 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <h2 className="text-center text-4xl font-bold mb-10">Add-ons</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {addOns.map((addOn, index) => (
          <motion.div key={index} className="addon-card bg-gray-900 p-6 rounded-lg text-center shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-bold mb-4">{addOn.title}</h3>
            <p className="text-xl font-semibold mb-4">{addOn.price}</p>
            <p className="mb-6">{addOn.description}</p>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Add to Plan</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AddOns;
