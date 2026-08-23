import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CourseHero from "../components/course/CourseHero";
import WhatYouWillLearn from "../components/course/WhatYouWillLearn";
import CourseContent from "../components/course/CourseContent";
import CourseSidebar from "../components/course/CourseSidebar";
import {
  useGetCourseByIdQuery,
  useEnrollCourseMutation,
} from "../api/coursesApi";

export default function CourseDetail() {
  const { id } = useParams();
  
  const { user } = useSelector((state) => state.auth);

  const { data:course, isLoading, isError } = useGetCourseByIdQuery(id);
  const [enrollCourse, { isLoading: enrolling }] = useEnrollCourseMutation();

  if (isLoading)
    return <p className="pt-20 text-center text-xl">Loading course...</p>;

  if (isError || !course)
    return (
      <p className="pt-20 text-center text-red-600">
        Failed to load course
      </p>
    );

  

  const isEnrolled =
    user && course.studentsEnrolled?.includes(user._id);

  return (
    <section className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-12 gap-10">

        <div className="col-span-8 space-y-8">
          <CourseHero course={course} />
          <WhatYouWillLearn tags={course.tags} />
          <CourseContent
            lessons={course.lessons}
            isEnrolled={isEnrolled}
            courseId={course._id}
          />
        </div>

        {!isEnrolled && (
          <div className="col-span-4">
            <CourseSidebar
              course={course}
              enrolling={enrolling}
              onEnroll={() => enrollCourse(course._id)}
            />
          </div>
        )}

      </div>
    </section>
  );
}
