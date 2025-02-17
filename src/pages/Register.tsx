/** @format */

import { SubmitHandler, useForm } from "react-hook-form";
 // Assuming you have a register mutation hook
import { useAppDispatch } from "../redux/hook";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/api/authApi";
import { Link } from "react-router-dom";


type Inputs = {
   name: string;
   email: string;
   password: string;
};

const Register = () => {
   const [register] = useRegisterMutation(); // Hook for register mutation
   const disPatch = useAppDispatch();
   const {
      register: formRegister,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();

   // Submit handler
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const toastId = toast.loading("Registering");

      try {
         const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
         };

         const res = await register(userInfo).unwrap();
         console.log(res);

         // Optionally handle login after successful registration
         // const user = verifyToken(res.data.token);
         // dispatch(setUser({ user: user, token: res.data.token }));

         toast.success("Registered successfully", {
            id: toastId,
            duration: 1000,
         });
      } catch (err) {
         console.error(err);
         toast.error("Something went wrong", { id: toastId, duration: 1000 });
      }
   };

   return (
      <div className="flex justify-center items-center ">
         <div className="flex flex-col max-w-md rounded-md sm:p-6 dark:bg-gray-50 dark:text-gray-800 shadow-lg">
            <div className="mb-8 text-center">
               <h1 className="my-3 text-4xl font-bold">Register</h1>
               <p className="text-sm dark:text-gray-600">
                  Create your account
               </p>
            </div>
            {/* Handle form submission */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                     <label htmlFor="name" className="block mb-2 text-sm">
                        Name
                     </label>
                     <input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        className={`w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 ${
                           errors.name ? "border-red-800" : ""
                        }`}
                        {...formRegister("name", {
                           required: "Name is required",
                        })}
                     />
                     {/* Error message */}
                     {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.name.message}
                        </p>
                     )}
                  </div>
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
                        {...formRegister("email", {
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
                     <label htmlFor="password" className="block mb-2 text-sm">
                        Password
                     </label>
                     <input
                        type="password"
                        id="password"
                        placeholder="*****"
                        className={`w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 ${
                           errors.password ? "border-red-800" : ""
                        }`}
                        {...formRegister("password", {
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
                        className="w-full bg-indigo-500 text-white px-8 btn py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50 hover:bg-violet-500"
                     >
                        Register
                     </button>
                  </div>
                  <p className="px-6 text-sm text-center dark:text-gray-600">
                     Already have an account?{" "}
                     <Link to={'/login'}
                        rel="noopener noreferrer"
                   
                        className="hover:underline dark:text-violet-600"
                     >
                        Sign In here
                     </Link>
                     .
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Register;
