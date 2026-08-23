import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../api/coursesApi";
import { useSelector } from "react-redux";





export default function CoursePlayer() {
  const { user } = useSelector((state) => state.auth);
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading, isError } =
    useGetCourseByIdQuery(courseId);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        Loading video...
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 bg-black">
        Failed to load course
      </div>
    );
  }
  // 🚫 Not logged in
if (!user) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <p className="mb-4">Please login to access this course</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-indigo-600 px-6 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}

// 🚫 Logged in but not enrolled
const isEnrolled = course.studentsEnrolled?.includes(user._id);

if (!isEnrolled) {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      You are not enrolled in this course
    </div>
  );
}

  const currentLesson = course.lessons.find(
    (lesson) => lesson._id === lessonId
  );

  if (!currentLesson) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 bg-black">
        Lesson not found
      </div>
    );
  }

  // ✅ Build absolute video URL (important)
  const videoSrc = currentLesson.videoUrl.startsWith("http")
    ? currentLesson.videoUrl
    : `${currentLesson.videoUrl}`;

  return (
    <div className="h-screen flex flex-col bg-black text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center gap-4 px-4 py-3 bg-gray-900">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="text-xl"
        >
          ←
        </button>

        <h2 className="font-semibold truncate">
          {course.title}
        </h2>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 overflow-hidden">

        {/* ===== LEFT PANEL (LESSONS LIST – 30%) ===== */}
        <div className="w-[30%] bg-gray-900 p-4 overflow-y-auto">
          {course.lessons.map((lesson, index) => {
            const isActive = lesson._id === lessonId;

            return (
              <div
                key={lesson._id}
                onClick={() =>
                  navigate(
                    `/courses/${courseId}/learn/${lesson._id}`
                  )
                }
                className={`p-3 mb-2 rounded cursor-pointer text-sm
                  ${
                    isActive
                      ? "bg-gray-700"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                {index + 1}. {lesson.title}
              </div>
            );
          })}
        </div>

        {/* ===== RIGHT PANEL (VIDEO – 70%) ===== */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <video
            key={currentLesson._id}       // 🔑 reload on lesson change
            controls
            autoPlay
            preload="metadata"
            className="w-[70%] max-h-[80%]"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </div>
  );
}
