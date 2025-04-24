import { TQueryParam, TResponseRedux } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";
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
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/students/all-students", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getEachStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
    }),
    updateStudentStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getEachUserStudent: builder.query({
      query: (id) => ({
        url: `/student-user/${id}`,
        method: "GET",
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetEachStudentQuery,
  useUpdateStudentStatusMutation,
  useGetEachUserStudentQuery,
  useUpdateStudentMutation,
  useCreateAdminMutation,
  useCreateFacultyMutation,
} = userManagementApi;
