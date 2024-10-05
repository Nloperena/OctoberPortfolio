import React from 'react';

function PlanCard({ plan, isSelected, onSelect, selectedAddOns, totalPrice }) {
  // Use conditional checks for undefined or null values
  const features = plan.features || []; // Default to empty array if features is undefined
  const addOns = selectedAddOns || []; // Default to empty array if add-ons are undefined

  return (
    <div
      className={`transition transform p-4 rounded-md ${
        isSelected
          ? 'bg-blue-700 ring-4 ring-blue-500 scale-105'
          : 'bg-gray-800 bg-opacity-40 border border-gray-600 hover:scale-105 hover:bg-opacity-60'
      }`}
    >
      <h2 className="text-lg font-semibold text-white mb-4">{plan.name}</h2>
      <p className="text-xl font-semibold text-white mb-4">${plan.price}</p>
      <p className="text-sm text-white mb-4">{plan.benefits}</p>

      {/* Safely map over features, defaulting to an empty array if undefined */}
      {features.length > 0 ? (
        <ul className="text-white mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="mb-2">
              {feature}
            </li>
          ))}
          {features.length > 3 && (
            <li className="text-gray-400 mt-2">...and more</li>
          )}
        </ul>
      ) : (
        <p className="text-gray-400">No features available</p>
      )}

      <h3 className="text-white text-lg">Add-Ons: </h3>
      <ul className="text-white mb-4">
        {addOns.map((addOn, index) => (
          <li key={index} className="mb-2">
            {addOn.title} (${addOn.price})
          </li>
        ))}
      </ul>

      <p className="text-xl text-white">Total: ${totalPrice}</p>
      <button
        onClick={() => onSelect(plan.id)}
        className={`w-full py-2 px-4 rounded ${
          isSelected ? 'bg-pink-500 hover:bg-pink-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {isSelected ? 'Deselect Plan' : 'Select Plan'}
      </button>
    </div>
  );
}

export default PlanCard;
