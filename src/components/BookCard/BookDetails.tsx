/** @format */

import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "antd";
import { formatDate } from "../../utils/formatDate";
import { useAppDispatch } from "../../redux/hook";
import { addToCart } from "../../redux/feature/cart/cartSlice";
import { useGetSingleBookQuery } from "../../redux/feature/book.api";

const BookDetails = () => {
const {id} = useParams();
const {data} = useGetSingleBookQuery(id);
const book = data?.data;

   const dispatch = useAppDispatch();

   const handleAddToCart = () => {
     dispatch(
       addToCart({
         product: book._id,
         name: book.title,
         price: book.price,
         quantity: 1,
         stock: book.quantity,
         imageUrl: book.imageUrl as string,
       })
     );
   };


   if (!book)
      return (
         <p className="text-center text-xl mt-10">No book details available.</p>
      );

   return (
      <div className=" py-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white  rounded-lg overflow-hidden p-2">
            {/* Left Section: Book Image */}
            <div className="flex justify-center">
               <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full max-w-md object-cover rounded-lg shadow-lg"
               />
            </div>

            {/* Right Section: Book Details */}
            <div className="flex flex-col ">
               <div>
                  <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                  <p className="text-gray-500 text-lg">
                     by{" "}
                     <span className="font-semibold">
                        {book.author || "Unknown Author"}
                     </span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                     {[...Array(5)].map((_, i) => (
                        <Star
                           key={i}
                           className={`h-5 w-5 ${
                              i < Math.round(book.rating || 4)
                                 ? "text-yellow-400"
                                 : "text-gray-300"
                           }`}
                        />
                     ))}
                     <span className="ml-2 text-gray-600">
                        ({book.reviews || 4} reviews)
                     </span>
                  </div>

                  <p className="text-gray-700 mt-4">{book.description}</p>

                  {/* Price & Stock */}
                  <p className="text-2xl font-semibold text-red-500 mt-4">
                     ${book.price}
                  </p>
                  <p className=" mt-3 text-gray-700">
                     Stock:{" "}
                     <span className="font-semibold">
                        {book.quantity} units available
                     </span>
                  </p>

                  {/* Book Category */}
                  <p className="text-gray-600 mt-2">
                     Category:{" "}
                     <span className="font-semibold">
                        {book.category || "General"}
                     </span>
                  </p>
                   <p className="text-gray-600 mt-2"> Added:  <span className="font-semibold">
                   {formatDate(book.createdAt)} 
                     </span></p>
                  {/* Action Buttons */}
                  <div className=" mt-6 flex flex-wrap gap-4">
                     <Button  onClick={() => handleAddToCart()} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-md shadow-md">
                        Add to Cart
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         {/* Reviews Section */}
         <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <p className="text-gray-600">
               ⭐⭐⭐⭐⭐ "Amazing book! Highly recommended!"
            </p>
            <p className="text-gray-600">
               ⭐⭐⭐⭐ "Great story, but a bit long."
            </p>
         </div>
      </div>
   );
};

export default BookDetails;
