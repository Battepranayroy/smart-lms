import { useGetCategoriesQuery, useGetCoursesQuery, useGetCategoryStatsQuery, useGetFeaturedCoursesQuery } from "../api/coursesApi";
import CategoryCard from "../components/CategoryCard";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Hero from "../components/Hero";
import {
  FaBriefcase,
  FaChartLine,
  FaPaintBrush,
  FaBullhorn,
  FaAndroid,
  FaCode,
} from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Home() {

  const { data: categories = [] } = useGetCategoryStatsQuery();
  const { data: coursesData, isLoading: loadingCourses } = useGetCoursesQuery();
  const { data: categoriesData, isLoading: loadingCats } = useGetCategoriesQuery();
  const { data: featuredCourses = [], isLoading } = useGetFeaturedCoursesQuery();

  const ALL_CATEGORIES = [
    { id: "Business", icon: <FaBriefcase /> },
    { id: "Data Science", icon: <FaChartLine /> },
    { id: "Design", icon: <FaPaintBrush /> },
    { id: "Marketing", icon: <FaBullhorn /> },
    { id: "Mobile Development", icon: <FaAndroid /> },
    { id: "Web Development", icon: <FaCode /> },
  ];

  const navigate = useNavigate();

  const categoryCountMap = categories.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});


  if (loadingCourses || loadingCats)
    return <p className="pt-20 text-center text-xl">Loading...</p>;

  return (
    <>
      <Hero />
      {/* BROWSE CATEGORIES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Browse Categories
            </h2>
            <p className="text-gray-600 mt-2">
              Discover a wide range of courses across popular categories
            </p>
          </div>

          {/* Category Cards */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide px-1">
            {ALL_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                icon={cat.icon}
                title={cat.id}
                count={categoryCountMap[cat.id] || 0}
                onClick={() => navigate(`/courses?category=${cat.id}`)}
              />
            ))}
          </div>

        </div>
      </section>

      {/*featured courses*/}
      <section className="mt-6">
            <div className="max-w-6xl mx-auto px-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Featured Courses</h2>
                    <p className="text-gray-600 text-sm">
                      Hand-picked courses recommended by our team
                    </p>
                  </div>

                  <Link
                    to="/courses"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    View All Courses →
                  </Link>
                </div>
              </div>
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
                  {featuredCourses.map(course => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
            </div>
      </section>
      
      {/*call to action section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">

            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>

            <p className="text-indigo-100 text-lg mb-8">
              Join our community of learners and boost your career with in-demand skills
            </p>

            <Link
              to="/courses"
              className="inline-block bg-white text-indigo-600 
                        px-8 py-3 rounded-full font-semibold
                        hover:bg-indigo-50 transition"
            >
              Explore Courses
            </Link>

          </div>
        </section>


    
    </>
  );
}
