import React from "react";


// Add-Ons Section Component
export const AddOnsSection = () => (
    <section className="addons-section p-10">
      <h2 className="text-3xl font-bold mb-6">Add-Ons</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-gray-800 p-6 rounded-lg w-80">
          <h3 className="text-2xl font-semibold mb-4">Extra Page</h3>
          <p className="text-xl mb-4">$150 per page</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-80">
          <h3 className="text-2xl font-semibold mb-4">SEO Optimization</h3>
          <p className="text-xl mb-4">$300</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-80">
          <h3 className="text-2xl font-semibold mb-4">Content Writing</h3>
          <p className="text-xl mb-4">$100 per page</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-80">
          <h3 className="text-2xl font-semibold mb-4">Logo Design</h3>
          <p className="text-xl mb-4">$250</p>
        </div>
      </div>
    </section>
)

export default AddOnsSection;