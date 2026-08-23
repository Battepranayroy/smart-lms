import { useSelector } from "react-redux";
import { useGetCoursesQuery } from "../../api/coursesApi";
import CourseCard from "../../components/CourseCard";

export default function MyCourses() {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetCoursesQuery();

  if (isLoading)
    return <p>Loading...</p>;

  const myCourses = data?.courses?.filter(c => c.instructor === user._id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myCourses.map(c => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  );
}
