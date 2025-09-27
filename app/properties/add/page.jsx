import PropertyAddFrom from '@/components/PropertyAddFrom';
import React from 'react';

const AddPropertyPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="conatiner m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddFrom />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
