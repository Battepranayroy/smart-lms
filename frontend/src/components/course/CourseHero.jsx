export default function CourseHero({ course }) {
  return (
    <>
      <img
        src="/course-image.jpeg"
        alt="course"
        className="w-full h-72 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold">{course.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="text-yellow-500 font-semibold">
          ⭐ {course.averageRating || 4.8}
        </span>
        <span>
          👥 {course.studentsEnrolled?.length || 0} students enrolled
        </span>
      </div>

      <p className="text-sm text-gray-600">
        Created by{" "}
        <span className="text-indigo-600 font-medium">
          {course.instructor?.name}
        </span>
      </p>

      <p className="text-gray-700 leading-relaxed">
        {course.description}
      </p>
    </>
  );
}
