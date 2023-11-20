import React from 'react';

const Uploading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-40 bg-gray-300 rounded-md p-1">
        <div className="bg-red-700 h-4 rounded-md animate-pulse"></div>
        <div className="flex justify-center items-center h-16 bg-white rounded-b-md">
          <p className="text-gray-700 font-semibold">Uploading...</p>
        </div>
      </div>
    </div>
  );
};

export default Uploading;
