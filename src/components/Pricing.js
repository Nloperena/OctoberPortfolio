// components/Pricing.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const pricingPlans = [
    {
      title: 'Basic Plan',
      price: '$500',
      description: 'Perfect for small businesses and personal websites.',
      features: ['Responsive design', 'SEO optimized', 'Contact form integration'],
    },
    {
      title: 'Standard Plan',
      price: '$1000',
      description: 'Ideal for growing businesses with additional features.',
      features: ['All Basic features', 'CMS integration', 'Custom design'],
    },
    {
      title: 'Premium Plan',
      price: '$2000',
      description: 'For large enterprises and advanced functionality.',
      features: ['All Standard features', 'E-commerce functionality', 'Advanced animations'],
    },
  ];

  return (
    <motion.div 
      className="pricing-section py-20 bg-gray-800 text-white" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-center text-4xl font-bold mb-10">Web Development Plans</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div 
            key={index} 
            className="pricing-card bg-gray-900 p-6 rounded-lg text-center shadow-lg" 
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
            <p className="text-xl font-semibold mb-4">{plan.price}</p>
            <p className="mb-6">{plan.description}</p>
            <ul className="mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="mb-2">{feature}</li>
              ))}
            </ul>
            <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded">Choose Plan</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Pricing;
