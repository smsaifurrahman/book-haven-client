/** @format */

import { Button, Skeleton } from "antd";
import { useGetAllBooksQuery } from "../../redux/feature/book.api";
import { TBook } from "../../types/book.type";
import BookCard from "../BookCard/BookCard";
import { Link } from "react-router-dom";

const FeaturedBooks = () => {
   const { data, isFetching } = useGetAllBooksQuery([
      { name: "limit", value: 6 },
   ]);
   const books = data?.data?.data;
   console.log("from featuredBooks", books);
   return (
      <div>
         <h3 className="text-3xl font-bold text-center text-indigo-600 my-6 ">
            {" "}
            Featured Books
         </h3>
         {isFetching ? (
            <Skeleton />
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {books?.map((book: TBook) => (
                  <BookCard key={book._id} book={book} />
               ))}
            </div>
         )}
         <div className="text-center my-6">
          <Link to={'/books'}>
          <Button  className="btn bg-indigo-700 text-white"> View All </Button>
          </Link>
         </div>
      </div>
   );
};

export default FeaturedBooks;
