import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
    getAllSemesterRegistration: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registration/all-registered-semesters",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registration/${args?.id}`,
        method: "PATCH",
        body: args?.data,
      }),
      invalidatesTags: ["semester"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "/course/",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    assignCourseToFaculties: builder.mutation({
      query: (args) => ({
        url: `/course/${args?.id}/assign-faculties`,
        method: "PUT",
        body: args?.data,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useCreateSemesterRegistrationMutation,
  useGetAllSemesterRegistrationQuery,
  useUpdateRegisteredSemesterMutation,
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useAssignCourseToFacultiesMutation,
} = courseManagementApi;
