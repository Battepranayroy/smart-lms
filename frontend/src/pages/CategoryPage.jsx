import React from "react";
import { useParams } from "react-router-dom";
import { useGetCoursesByCategoryQuery } from "../api/coursesApi";
import CourseCard from "../components/CourseCard";

export default function CategoryPage() {
  const { category } = useParams();

  const { data, isLoading, isError } = useGetCoursesByCategoryQuery(category);

  if (isLoading)
    return <p className="pt-20 text-center text-xl">Loading...</p>;

  if (isError)
    return <p className="pt-20 text-center text-red-600">Error loading courses</p>;

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{category} Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.courses?.length > 0 ? (
          data.courses.map((c) => <CourseCard key={c._id} course={c} />)
        ) : (
          <p>No courses found in this category.</p>
        )}
      </div>
    </div>
  );
}
