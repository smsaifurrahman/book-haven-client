/** @format */

import { Star } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { Button } from "antd";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
   return (
      <div className="card card-side bg-base-100 shadow-xl flex h-full lg:h-72 transition-transform transform hover:scale-105 hover:shadow-2xl">
         <figure className="w-1/2 rounded-xl">
            <img src={book.imageUrl} className="w-full h-full object-cover" />
         </figure>
         <div className="card-body w-1/2 p-4">
            <h2 className="card-title font-bold text-xl">{book.title}  </h2>
            <p className="text-gray-500 text-lg">
                     by{" "}
                     <span className="font-semibold">
                        {book.author || "Unknown Author"}
                     </span>
                  </p>
            <p className="text-xl font-semibold"> ${book?.price}</p>
       
            <p className=""> {book?.description.slice(0, 50)}..</p>
            <p className="">
               {" "}
               Category:{" "}
               <span className="font-semibold">{book.category}</span>
            </p>
            <p className=""> Added: {formatDate(book.createdAt)}</p>

            <div className=" ">
               <Link to={`/book-details/${book?._id}`}>
                  <Button className=" border-indigo-600 border-2 font-semibold"> View Details </Button>
               </Link>
            </div> 
            {/* <div className=" ">
               <Link to={`/book-details`} state={{ book }}>
                  <Button className="bg-red-50"> View Details </Button>
               </Link>
            </div> */}
         </div>
      </div>
   );
};

export default BookCard;
