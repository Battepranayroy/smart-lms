import React from "react";
import CourseCard from "../components/CourseCard";
import FilterPanel from "../components/FilterPanel";
import TopBar from "../components/TopBar";
import CoursesGrid  from "../components/CoursesGrid";
import { useState } from "react";
import { useGetCoursesQuery } from "../api/coursesApi";

export default function Courses() {

    const [filters, setFilters] = useState({
    title: "",
    category: "",
    sort: "popularity",
  });

  const { data = [], isLoading } = useGetCoursesQuery(filters);
  console.log("data "+data);
  console.log("FILTERS 👉", filters);

  return (
    <section className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Explore Courses</h1>
          <p className="text-gray-600 mt-2">
            Discover top-quality courses to help you master in-demand skills
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* FILTER PANEL */}
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
          />

          {/* RIGHT CONTENT */}
          <div className="col-span-9">
            <TopBar 
              total={data.length} 
              filters={filters}
              setFilters={setFilters}
            />
            <CoursesGrid courses={data} isLoading={isLoading} />
          </div>

        </div>
      </div>
    </section>
  );

}
