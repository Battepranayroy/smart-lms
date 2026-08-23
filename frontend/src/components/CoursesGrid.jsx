import CourseCard from "../components/CourseCard";

export default function CoursesGrid({ courses = [], isLoading }) {

  if (isLoading) {
    return <p className="text-gray-500">Loading courses...</p>;
  }

  if (!courses.length) {
    return <p className="text-gray-500">No courses found</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-16">
      {courses.map(course => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
