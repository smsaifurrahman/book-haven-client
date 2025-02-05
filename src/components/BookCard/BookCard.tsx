/** @format */

import { Star } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { Button } from "antd";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
   return (
      <div className="card card-side bg-base-100 shadow-xl flex h-72">
         <figure className="w-1/2 rounded-xl">
            <img src={book.imageUrl} className="w-full h-full object-cover" />
         </figure>
         <div className="card-body w-1/2 p-4">
            <h2 className="card-title font-bold text-xl">{book.title}</h2>
            <p className="text-xl font-semibold"> ${book?.price}</p>
            {/* Rating */}
            <div className=" flex items-center">
               {[...Array(5)].map((_, i) => (
                  <Star
                     key={i}
                     className={`h-5 w-5 ${
                        i < Math.round(3) ? "text-yellow-400" : "text-gray-300"
                     }`}
                  />
               ))}
               <span className="ml-2 text-sm text-gray-500">({4} reviews)</span>
            </div>
            <p className=""> {book?.description.slice(0, 50)}..</p>
            <p className="">
               {" "}
               In Stock:{" "}
               <span className="font-semibold">{book.quantity} units</span>
            </p>
            <p className=""> Added: {formatDate(book.createdAt)}</p>
{/* 
            <div className=" ">
               <Link to={`/book-details/${book?._id}`}>
                  <Button className="bg-red-50"> View Details </Button>
               </Link>
            </div> */}
            <div className=" ">
               <Link to={`/book-details`} state={{ book }}>
                  <Button className="bg-red-50"> View Details </Button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default BookCard;
