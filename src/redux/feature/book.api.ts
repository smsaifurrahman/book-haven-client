/** @format */

import { TResponse, TResponseRedux } from "../../types/global";
import { baseApi } from "../api/baseApi";

const bookApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllBooks: builder.query({
         query: () => ({
            url: "/books/get-all-books",
            method: "GET",
         }),
         transformResponse: (response: TResponseRedux<any>  ) => {
            console.log( 'from redux', response);
            return {
               data: response.data,
               meta: response.data.meta
            }
         }
      }),
   }),
});

// Export the generated hooks and endpoints
export const { useGetAllBooksQuery } = bookApi;
