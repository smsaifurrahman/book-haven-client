/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hook";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/feature/auth/authSlice";
import { useUpdateUserInfoMutation } from "../../redux/feature/user/user.api";
import { useCreateOrderMutation } from "../../redux/feature/order/order";
import { toast } from "sonner";

export const CheckoutPage = () => {
   const cartData = useAppSelector((state) => state.cart);
   const navigate = useNavigate();
   const user = useAppSelector(getCurrentUser);

   const [createOrder, { isLoading, isSuccess, data, isError, error }] =
      useCreateOrderMutation();
   const [updateUserInfo] = useUpdateUserInfoMutation();

   // React Hook Form setup
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         name: user?.userName || "",
         email: user?.userEmail || "",
         phone: user?.phone || "",
         address: user?.address || "",
         city: user?.city || "",
      },
   });

   // Handle proceed to payment
   const onSubmit = async (data) => {
      const userInfo = {
         phone: data?.phone,
         city: data?.city,
         address: data?.address,
      };
      console.log(userInfo);
      await updateUserInfo(userInfo);
      await createOrder({ products: cartData.items });
   };
   const toastId = "cart";
   useEffect(() => {
      if (isLoading) toast.loading("Processing ...", { id: toastId });

      if (isSuccess) {
         toast.success(data?.message, { id: toastId });
         if (data?.data) {
            setTimeout(() => {
               window.location.href = data.data;
            }, 1000);
         }
      }

      if (isError) console.log(error);
      // toast.error(JSON.stringify(error), { id: toastId });
   }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

   return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
         <h2 className="text-xl font-bold mb-4">Checkout</h2>

         <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
               type="text"
               placeholder="Full Name"
               {...register("name", { required: "Full name is required" })}
               className="w-full border p-2 rounded"
            />
            {errors.name && (
               <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
               type="email"
               placeholder="Email"
               {...register("email", { required: "Email is required" })}
               className="w-full border p-2 rounded"
            />
            {errors.email && (
               <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
               type="tel"
               placeholder="Phone Number"
               {...register("phone", { required: "Phone number is required" })}
               className="w-full border p-2 rounded"
            />
            {errors.phone && (
               <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            <input
               type="text"
               placeholder="Your City"
               {...register("city", { required: "City is required" })}
               className="w-full border p-2 rounded"
            />
            {errors.city && (
               <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}

            <textarea
               placeholder="Delivery Address"
               {...register("address", { required: "Address is required" })}
               className="w-full border p-2 rounded"
            />
            {errors.address && (
               <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
            {/* Order summary */}
            <div className="mt-6">
               <h3 className="text-lg font-semibold">Order Summary</h3>
               <p>Total Items: {cartData.totalQuantity}</p>
               <p>Total Price: ${cartData.totalPrice.toFixed(2)}</p>
            </div>

            <button
               type="submit"
               className="w-full btn bg-blue-500 text-white font-bold mt-4"
            >
               Proceed to Payment
            </button>
         </form>
      </div>
   );
};

export default CheckoutPage;
