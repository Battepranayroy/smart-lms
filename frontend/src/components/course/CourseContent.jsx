import { useNavigate } from "react-router-dom";

export default function CourseContent({ lessons, isEnrolled, courseId }) {
  const navigate = useNavigate();

  if (!lessons?.length) {
    return (
      <p className="text-gray-500">
        No lessons added yet
      </p>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Course Content
      </h2>

      <ul className="space-y-3">
        {lessons.map((lesson, index) => {
          const lessonId =
            typeof lesson === "string" ? lesson : lesson._id;

          const lessonTitle =
            typeof lesson === "string"
              ? lesson
              : lesson.title || lesson.name;

          return (
            <li
              key={lessonId}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              {/* Lesson title (not clickable) */}
              <span className="text-sm font-medium">
                {index + 1}. {lessonTitle}
              </span>

              {/* ACTION */}
              {isEnrolled ? (
                <button
                  onClick={() =>
                    navigate(
                      `/courses/${courseId}/learn/${lessonId}`
                    )
                  }
                  className="text-xs text-indigo-600 hover:underline"
                >
                  ▶ Watch
                </button>
              ) : (
                <span className="text-xs text-gray-400">
                  🔒 Locked
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
