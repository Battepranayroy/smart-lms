import { apiSlice } from "./apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getCourses: builder.query({
        query: (filters = {}) => {
          console.log("RTK QUERY FILTERS 👉", filters);
          const params = new URLSearchParams();

          if (filters.title) params.append("title", filters.title);
          if (filters.category) params.append("category", filters.category);
          if (filters.minPrice) params.append("minPrice", filters.minPrice);
          if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
          if (filters.sort) params.append("sort", filters.sort);

          const queryString = params.toString();

          return `/courses${queryString ? `?${queryString}` : ""}`;
        },
        providesTags: ["Courses"],
    }),

    getCategories: builder.query({
      query: () => "/courses/categories",
      providesTags: ["Categories"],
    }),

    getCategoryStats: builder.query({
      query: () => "/courses/categories/stats",
    }),


    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (id) => [{ type: "CourseDetails", id }],
    }),

    getCoursesByCategory: builder.query({
      query: (category) => `/courses?category=${category}`,
      providesTags: ["Courses"],
    }),

    getFeaturedCourses: builder.query({
     query: () => "/courses/featured",
    }),

    enrollCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: ["Courses", "CourseDetails"],
    }),
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "/courses",
        method: "POST",
        body: formData,
      }),
    }),

  }),
});

export const {
  useGetCoursesQuery,
  useGetCategoryStatsQuery,
  useGetCategoriesQuery,
  useGetCourseByIdQuery,
  useGetCoursesByCategoryQuery,
  useEnrollCourseMutation,
  useCreateCourseMutation,
  useGetFeaturedCoursesQuery,
} = coursesApi;
