// components/MaintenancePlans.jsx
import React from 'react';
import { motion } from 'framer-motion';

const MaintenancePlans = () => {
  const maintenancePlans = [
    {
      title: 'Basic Maintenance',
      price: '$50/month',
      description: 'For basic monthly updates and security checks.',
    },
    {
      title: 'Standard Maintenance',
      price: '$100/month',
      description: 'Includes all Basic features and priority support.',
    },
    {
      title: 'Premium Maintenance',
      price: '$200/month',
      description: 'Includes advanced support, backups, and performance optimization.',
    },
  ];

  return (
    <motion.div className="maintenance-section py-20 bg-gray-800 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <h2 className="text-center text-4xl font-bold mb-10">Maintenance Plans</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {maintenancePlans.map((plan, index) => (
          <motion.div key={index} className="pricing-card bg-gray-900 p-6 rounded-lg text-center shadow-lg" whileHover={{ scale: 1.05 }}>
            <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
            <p className="text-xl font-semibold mb-4">{plan.price}</p>
            <p className="mb-6">{plan.description}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Choose Plan</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MaintenancePlans;
