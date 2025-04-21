import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query({
      query: () => ({
        url: "/students/",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
