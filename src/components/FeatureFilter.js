import React from 'react';

function FeatureFilter({ features, selectedFeatures, onFeatureToggle }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Filter by Features:</h3>
      <div className="flex flex-wrap">
        {features.map((feature, index) => (
          <label key={index} className="mr-4 mb-2">
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature)}
              onChange={() => onFeatureToggle(feature)}
              className="mr-2"
            />
            {feature}
          </label>
        ))}
      </div>
    </div>
  );
}

export default FeatureFilter;