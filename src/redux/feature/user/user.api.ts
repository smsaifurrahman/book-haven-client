import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: () => ({
        url: "/users/get-single-user",
        // params: { user_id },
        method: "GET",
      }),
     
    }),
  }),
});

export const {
useGetSingleUserQuery
} = userApi;