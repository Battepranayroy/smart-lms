import React, { useState } from "react";
import { useCreateCourseMutation } from "../../api/coursesApi";

export default function CreateCourse() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: []
  });

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const submitHandler = (e) => {
    e.preventDefault();
    createCourse(form);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>

      <form className="space-y-4" onSubmit={submitHandler}>
        <input
          className="w-full border p-3 rounded"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button
          disabled={isLoading}
          className="px-6 py-2 bg-indigo-600 text-white rounded"
        >
          {isLoading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
