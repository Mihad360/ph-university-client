import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourses: builder.query({
      query: () => ({
        url: "/offered-course/my-offered-courses",
        method: "GET",
      }),
      providesTags: ["student"],
    }),
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-course/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["student"],
    }),
    getAllEnrolledCourses: builder.query({
      query: () => ({
        url: "/enrolled-course/my-enrolled-courses",
        method: "GET",
      }),
      providesTags: ["student"],
    }),
    updateStudentMark: builder.mutation({
      query: (data) => ({
        url: `/enrolled-course/update-enrolled-course-marks`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useGetMyOfferedCoursesQuery,
  useEnrollCourseMutation,
  useGetAllEnrolledCoursesQuery,
  useUpdateStudentMarkMutation,
} = studentCourseApi;
