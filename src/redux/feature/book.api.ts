/** @format */

import { TResponseRedux } from "../../types/global";
import { baseApi } from "../api/baseApi";

const bookApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllBooks: builder.query({
         query: () => ({
            url: "/books/get-all-books",
            method: "GET",
         }),
         providesTags: ["allBooks"],
         transformResponse: (response: TResponseRedux<any>) => {
            console.log("from redux", response);
            return {
               data: response.data,
               meta: response.data.meta,
            };
         },
      }),
      AddBook: builder.mutation({
         query: (data) => ({
            url: "/books/create-book",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["allBooks"],
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
   useGetAllBooksQuery,
   useAddBookMutation,
   useDeleteBookMutation,
} = bookApi;
