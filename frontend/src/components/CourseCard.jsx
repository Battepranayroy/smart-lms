import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  if (!course) return null;

  return (
    <Link
      to={`/courses/${course._id}`}
      className="block"
    >
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition w-72 overflow-hidden cursor-pointer">

        <div className="relative h-40">
          <img
            src={course.thumbnail || "/course-image.jpeg"}
            alt={course.title || "Course"}
            className="w-full h-full object-cover blur-[1px]"
          />

          <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            {course.category}
          </span>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {course.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            ⭐⭐⭐⭐⭐
            <span className="text-gray-500 text-xs">
              ({course.totalReviews || 0})
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-indigo-600">
              ${course.price}
            </span>
            <span className="text-sm text-gray-500">
              {course.instructor?.name}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
