/** @format */

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Button } from "antd";
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "../ui/sheet";
import { ShoppingBagIcon } from "lucide-react";
import { useCreateOrderMutation } from "../../redux/feature/order/order";
import { useEffect } from "react";
import { toast } from "sonner";
import {
   removeFromCart,
   updateQuantity,
} from "../../redux/feature/cart/cartSlice";
import { Badge } from "../ui/badge";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";

import { useNavigate } from "react-router-dom";

export const CartSheet = () => {
   const dispatch = useAppDispatch();

    const token = useAppSelector(useCurrentToken);
    const navigate = useNavigate();
      

   const cartData = useAppSelector((state) => state.cart);
   console.log(cartData.totalQuantity);

   const [createOrder, { isLoading, isSuccess, data, isError, error }] =
      useCreateOrderMutation();
  

   const handlePlaceOrder = async () => {

      if(!token) {
       
         return navigate('/login')
         // return <Navigate to={"/login"} replace={true} />;
      }

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

      if (isError) toast.error(JSON.stringify(error), { id: toastId });
   }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="link" className="relative">
               <ShoppingBagIcon className="h-6 w-6" />
               <Badge className="absolute right-0 top-0 bg-red-600 text-white rounded-full text-xs p-1">
                  {cartData?.totalQuantity}
               </Badge>
            </Button>
         </SheetTrigger>

         <SheetContent className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg max-w-md">
            <SheetHeader className="border-b pb-4">
               <SheetTitle className="text-xl font-semibold">
                  Your Cart
               </SheetTitle>
               <SheetDescription className="text-sm text-gray-500">
                  Review your items and proceed to checkout.
               </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto">
               {cartData.items.length > 0 ? (
                  <ul className="space-y-4">
                     {cartData.items.map((item) => (
                        <li
                           key={item.product}
                           className="flex items-center gap-4"
                        >
                           <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-16 w-16 rounded object-cover"
                           />
                           <div className="flex-1">
                              <h4 className="text-sm font-medium">
                                 {item.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                 <button
                                    onClick={() =>
                                       dispatch(
                                          updateQuantity({
                                             id: item.product,
                                             quantity: Number(
                                                Math.max(item.quantity - 1, 1)
                                             ),
                                          })
                                       )
                                    }
                                    className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                                 >
                                    -
                                 </button>
                                 <span className="text-sm font-medium">
                                    {item.quantity}
                                 </span>
                                 <button
                                    onClick={() => {
                                       dispatch(
                                          updateQuantity({
                                             id: item.product,
                                             quantity: Math.min(
                                                item.quantity + 1,
                                                item.stock
                                             ),
                                          })
                                       );
                                    }}
                                    className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                                 >
                                    +
                                 </button>
                              </div>
                           </div>
                           <p className="text-sm font-semibold text-gray-800">
                              ${(item.quantity * item.price).toFixed(2)}
                           </p>
                           <button
                              onClick={() =>
                                 dispatch(removeFromCart(item.product))
                              }
                              className="text-red-600 text-sm hover:underline"
                           >
                              Remove
                           </button>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <p className="text-center text-gray-500">
                     Your cart is empty.
                  </p>
               )}

               <div className="border-b my-3"></div>

               <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-700">
                     Total Quantity:
                  </span>
                  <span className="text-lg font-bold">
                     {cartData.totalQuantity}
                  </span>
               </div>
               <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-700">
                     Total Price:
                  </span>
                  <span className="text-lg font-bold">
                     ${cartData.totalPrice.toFixed(2)}
                  </span>
               </div>
            </div>

            <SheetFooter className="border-t pt-4">
               <SheetClose asChild>
                  <Button className="w-full" onClick={handlePlaceOrder}>
                     Order Now
                  </Button>
               </SheetClose>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   );
};
