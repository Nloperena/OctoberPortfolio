import React from 'react';
import { useInView } from 'react-intersection-observer';
import { plans } from '../data/plans';
import { allFeatures } from '../data/features';

function ComparisonTable({ selectedPlans }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const selectedPlanDetails = selectedPlans.map((planId) =>
    plans.find((p) => p.id === planId)
  );

  return (
    <div
      ref={ref}
      className={`mt-12 overflow-x-auto transition-opacity duration-1000 ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Compare Selected Plans
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/4"></th>
            {selectedPlanDetails.map((plan) => (
              <th key={plan.id} className="text-xl font-semibold p-4">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } transition duration-500 ease-in-out`}
            >
              <td className="p-4">{feature}</td>
              {selectedPlanDetails.map((plan) => (
                <td key={plan.id} className="text-center">
                  {plan.features.includes(feature) ? '✓' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;