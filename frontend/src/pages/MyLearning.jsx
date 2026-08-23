import React from "react";
import { useSelector } from "react-redux";
import { useGetCoursesQuery } from "../api/coursesApi";
import CourseCard from "../components/CourseCard";

export default function MyLearning() {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetCoursesQuery();

  if (!user) return <p className="pt-20 text-center">Please login.</p>;

  if (isLoading)
    return <p className="pt-20 text-center text-xl">Loading...</p>;

  const enrolledCourses = data?.courses?.filter((c) =>
    c.students.includes(user._id)
  );

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Learning</h1>

      {enrolledCourses?.length === 0 && (
        <p>You haven't enrolled in any course yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {enrolledCourses?.map((c) => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  );
}
