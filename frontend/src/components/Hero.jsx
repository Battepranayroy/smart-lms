import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="pt-28 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT SECTION */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Elevate Your Skills with <br />
            Expert-Led Courses
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            Join thousands of students learning in-demand skills.
            Start your learning journey today.
          </p>

          <button
            onClick={() => navigate("/courses")}
            className="mt-8 bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Browse Courses
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Learning"
            className="rounded-xl shadow-lg max-w-full"
          />
        </div>

      </div>
    </section>
  );
}
