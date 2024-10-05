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
    <section className="pricing-section p-10 flex justify-center items-center min-h-screen">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Web Development Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`transition transform p-4 rounded-md
                ${index === 1 
                  ? 'bg-blue-700 ring-4 ring-blue-500 scale-105' // Similar to the highlighted add-on cards
                  : 'bg-white bg-opacity-10 border border-gray-700 hover:scale-105 hover:bg-opacity-20'}`
              }
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{plan.title}</h3>
              <p className="text-xl font-semibold text-white mb-4">{plan.price}</p>
              <p className="text-sm text-white mb-6">{plan.description}</p>
              <ul className="mb-6 text-white">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">{feature}</li>
                ))}
              </ul>
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
