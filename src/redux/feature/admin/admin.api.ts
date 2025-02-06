/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";



const bookApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllUsers: builder.query({
         query: () => ({
            url: "/users/get-all-users",
            method: "GET",
         }),
         providesTags: ["allUsers"],
         transformResponse: (response: TResponseRedux<any>) => {
            console.log("from redux", response);
            return {
               data: response.data,
               meta: response.data.meta,
            };
         },
      }),
  
      blockUser: builder.mutation({
         query: (userId) => {
            console.log("Inside RTK mutation query function:", userId);
            return {
               url: `/admin/block-user/${userId}`,
               method: "PATCH",
            //    body: args.updatedBookData,
            };
         },
         
         invalidatesTags: ["allUsers"],
      }),

      deleteBook: builder.mutation({
         query: (id) => ({
            url: `/books/delete-book/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["allBooks"],
      }),
   }),
});

// Export the generated hooks and endpoints
export const {
   useGetAllUsersQuery,
   useBlockUserMutation,
   useDeleteBookMutation,

} = bookApi;
