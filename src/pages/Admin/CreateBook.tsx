/** @format */

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddBookMutation } from "../../redux/feature/book.api";
import { handleImageUpload } from "../../UploadImageToBB";

// Define the type for the book form inputs
type Inputs = {
   title: string;
   author: string;
   price: number;
   category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
   description: string;
   quantity: number;
   inStock: boolean;
   imageUrl?: string;
};

const CreateBook: React.FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<Inputs>();
   const [addBook, { isLoading }] = useAddBookMutation();
   const [image, setImage] = useState<File | null>(null);

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const toastId = toast.loading("Creating book...");
      let uploadedImageUrl;
      uploadedImageUrl = await handleImageUpload(image);
      console.log(uploadedImageUrl);
      if (!uploadedImageUrl) {
         uploadedImageUrl = "";
      }

      try {
         await addBook({ ...data, imageUrl: uploadedImageUrl }).unwrap();
         toast.success("Book created successfully", { id: toastId });
         reset();
         setImage(null);
      } catch (error) {
         console.error(error);
         toast.error("Failed to create book", { id: toastId });
      }
   };

   return (
      <div>
          <h1 className="text-2xl text-center mb-3">Enter Book info </h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-md rounded-md"
         >
            <div>
               <label>Title</label>
               <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 border rounded"
               />
               {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
               )}
            </div>

            <div>
               <label>Author</label>
               <input
                  type="text"
                  {...register("author", { required: "Author is required" })}
                  className="w-full p-2 border rounded"
               />
               {errors.author && (
                  <p className="text-red-500 text-sm">
                     {errors.author.message}
                  </p>
               )}
            </div>

            <div>
               <label>Price</label>
               <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className="w-full p-2 border rounded"
               />
               {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
               )}
            </div>

            <div>
               <label>Category</label>
               <select
                  {...register("category", {
                     required: "Category is required",
                  })}
                  className="w-full p-2 border rounded"
               >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="SelfDevelopment">Self Development</option>
                  <option value="Poetry">Poetry</option>
                  <option value="Religious">Religious</option>
               </select>
               {errors.category && (
                  <p className="text-red-500 text-sm">
                     {errors.category.message}
                  </p>
               )}
            </div>

            <div className="md:col-span-2">
               <label>Description</label>
               <textarea
                  {...register("description", {
                     required: "Description is required",
                  })}
                  className="w-full p-2 border rounded"
               ></textarea>
               {errors.description && (
                  <p className="text-red-500 text-sm">
                     {errors.description.message}
                  </p>
               )}
            </div>

            <div>
               <label>Quantity</label>
               <input
                  type="number"
                  {...register("quantity", {
                     required: "Quantity is required",
                     min: 0,
                  })}
                  className="w-full p-2 border rounded"
               />
               {errors.quantity && (
                  <p className="text-red-500 text-sm">
                     {errors.quantity.message}
                  </p>
               )}
            </div>

            <div>
               <label>In Stock</label>
               <select
                  {...register("inStock", {
                     required: "Stock status is required",
                  })}
                  className="w-full p-2 border rounded"
               >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
               </select>
               {errors.inStock && (
                  <p className="text-red-500 text-sm">
                     {errors.inStock.message}
                  </p>
               )}
            </div>

            <div className="md:col-span-2">
               <label>Upload Image</label>
               <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="w-full p-2 border rounded"
               />
            </div>

            <div className="md:col-span-2">
               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
               >
                  {isLoading ? "Creating..." : "Create Book"}
               </button>
            </div>
         </form>
      </div>
   );
};

export default CreateBook;
