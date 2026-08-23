import React from "react";

export default function CategoryCard({ icon, title, count }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition 
                p-6 flex-shrink-0 flex flex-col items-center text-center w-44">

      {/* Icon */}
      <div className="text-indigo-600 text-4xl mb-3">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800">
        {title}
      </h3>

      {/* Course Count */}
      <p className="text-sm text-gray-500 mt-1">
        {count} courses
      </p>

    </div>
  );
}
