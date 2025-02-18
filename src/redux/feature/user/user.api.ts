/** @format */

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
      changePassword: builder.mutation({
        query: (data) => {
           console.log("Data being sent:", data); // Log the data
           return {
              url: "/auth/change-password",
              method: "POST",
              body: data,
           };
        },
     }),
      updateUserInfo: builder.mutation({
        query: (data) => {
           console.log("Data being sent:", data); // Log the data
           return {
              url: "/users/update/",
              method: "PATCH",
              body: data,
           };
        },
     }),
     
   }),
});

export const { useGetSingleUserQuery, useChangePasswordMutation, useUpdateUserInfoMutation } = userApi;
