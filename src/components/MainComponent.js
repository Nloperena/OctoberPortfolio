import React, { useState } from 'react';
import PlanCard from './PlanCard';
import AddOns from './AddOns';

const MainComponent = () => {
  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 500,
      benefits: 'Perfect for small websites.',
      features: ['Responsive design', 'SEO optimized', 'Contact form integration'],
    },
    {
      id: 2,
      name: 'Standard Plan',
      price: 1000,
      benefits: 'Great for businesses.',
      features: ['Custom design', 'CMS integration', 'E-commerce functionality'],
    },
    {
      id: 3,
      name: 'Premium Plan',
      price: 2000,
      benefits: 'Enterprise-level websites.',
      features: ['Advanced animations', 'E-commerce', 'Custom integrations'],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const handlePlanSelect = (planId) => {
    const selected = plans.find((plan) => plan.id === planId);
    setSelectedPlan(selected);
    setSelectedAddOns([]);
  };

  const handleAddOnSelect = (addOns) => {
    setSelectedAddOns(addOns);
  };

  const totalPrice = selectedPlan ? selectedPlan.price + selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0) : 0;

  return (
    <div className="container mx-auto p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan && selectedPlan.id === plan.id}
            onSelect={handlePlanSelect}
            selectedAddOns={selectedAddOns}
            totalPrice={totalPrice}
          />
        ))}
      </div>

      {selectedPlan && (
        <AddOns selectedPlan={selectedPlan} onAddOnSelect={handleAddOnSelect} />
      )}

      {selectedPlan && (
        <div className="bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-lg p-8 mt-8 text-white text-center">
          <h3>Total Price: ${totalPrice}</h3>
          <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded mt-4">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
