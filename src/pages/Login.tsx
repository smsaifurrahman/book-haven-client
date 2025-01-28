/** @format */

import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/hook";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/feature/auth/authSlice";

type Inputs = {
   email: string;
   password: string;
};

const Login = () => {
   const [login] = useLoginMutation();
   const disPatch = useAppDispatch();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();

   // Submit handler
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const toastId = toast.loading("Logging in");
      try {
         const userInfo = {
            email: data.email,
            password: data.password,
         };

         const res = await login(userInfo).unwrap();
         console.log(res);

         const user = verifyToken(res.data.token);
       
         disPatch(setUser({user: user, token: res.data.token}))

         toast.success("logged in successfully", {
            id: toastId,
            duration: 1000,
         });
      } catch (err) {
         console.log(err);
         toast.error("Something went wrong", { id: toastId, duration: 1000 });
      }
   };

   return (
      <div className="flex justify-center items-center min-h-screen  ">
         <div className="flex flex-col max-w-md  rounded-md sm:p-6 dark:bg-gray-50 dark:text-gray-800 shadow-lg">
            <div className="mb-8 text-center">
               <h1 className="my-3 text-4xl font-bold">Sign in</h1>
               <p className="text-sm dark:text-gray-600">
                  Sign in to access your account
               </p>
            </div>
            {/* Handle form submission */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                     <label htmlFor="email" className="block mb-2 text-sm">
                        Email address
                     </label>
                     <input
                        type="email"
                        id="email"
                        placeholder="leroy@jenkins.com"
                        className={`w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 ${
                           errors.email ? "border-red-800" : ""
                        }`}
                        {...register("email", {
                           required: "Email is required",
                           pattern: {
                              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Enter a valid email address",
                           },
                        })}
                     />
                     {/* Error message */}
                     {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.email.message}
                        </p>
                     )}
                  </div>
                  {/* Password Field */}
                  <div>
                     <div className="flex justify-between mb-2">
                        <label htmlFor="password" className="text-sm">
                           Password
                        </label>
                        <a
                           rel="noopener noreferrer"
                           href="#"
                           className="text-xs hover:underline dark:text-gray-600"
                        >
                           Forgot password?
                        </a>
                     </div>
                     <input
                        type="password"
                        id="password"
                        placeholder="*****"
                        className={`w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 ${
                           errors.password ? "border-red-500" : ""
                        }`}
                        {...register("password", {
                           required: "Password is required",
                           minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                           },
                        })}
                     />
                     {/* Error message */}
                     {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.password.message}
                        </p>
                     )}
                  </div>
               </div>
               {/* Submit Button */}
               <div className="space-y-2">
                  <div>
                     <button
                        type="submit"
                        className="w-full px-8 btn py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50 hover:bg-violet-500"
                     >
                        Sign in
                     </button>
                  </div>
                  <p className="px-6 text-sm text-center dark:text-gray-600">
                     Don't have an account yet?{" "}
                     <a
                        rel="noopener noreferrer"
                        href="#"
                        className="hover:underline dark:text-violet-600"
                     >
                        Sign up
                     </a>
                     .
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
