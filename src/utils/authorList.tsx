/** @format */
import { useMemo } from "react";
import { useGetAllBooksQuery } from "../redux/feature/book.api"; // Adjust path if needed

export const useAuthorsList = () => {
   const { data, isFetching } = useGetAllBooksQuery(undefined);

   // Extract unique authors using useMemo for performance optimization
   const authors = useMemo(() => {
      if (!data?.data?.data) return [];
      const bookList = data.data.data;
      
      // Create a Set to store unique author names
      const uniqueAuthors = new Set<string>();

      bookList.forEach((book) => {
         if (book.author) uniqueAuthors.add(book.author);
      });

      return Array.from(uniqueAuthors);
   }, [data]);

   return { authors, isFetching };
};
