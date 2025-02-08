/** @format */

import { TQueryParams, TResponseRedux } from "../../types/global";
import { baseApi } from "../api/baseApi";

const bookApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllBooks: builder.query({
         query: (agrs) => {
            const params = new URLSearchParams();
            console.log( 'args', agrs);
            if (agrs) {
               agrs.forEach((item: TQueryParams) => {
                  params.append(item.name, item.value as string);
               });
            }
            return {
               url: `/books/get-all-books`,
               method: "GET",
               params: params
            }
         },
         providesTags: ["allBooks"],
         transformResponse: (response: TResponseRedux<any>) => {
            console.log("from redux", response);
            return {
               data: response.data,
               meta: response.data.meta,
            };
         },
      }),

      getSingleBook: builder.query({
         query: (id) => ({
            url: `/books/get-single-book/${id}`,
            method: "GET",
         }),
      }),
      AddBook: builder.mutation({
         query: (data) => ({
            url: "/books/create-book",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["allBooks"],
      }),
      updateBook: builder.mutation({
         query: (args) => {
            console.log("Inside RTK mutation query function:", args);
            return {
               url: `/books/update-book/${args.id}`,
               method: "PATCH",
               body: args.updatedBookData,
            };
         },

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
   useUpdateBookMutation,
   useGetSingleBookQuery
} = bookApi;
