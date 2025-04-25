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
  }),
});

export const {
  useCreateSemesterRegistrationMutation,
  useGetAllSemesterRegistrationQuery,
  useUpdateRegisteredSemesterMutation,
} = courseManagementApi;
