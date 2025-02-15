/** @format */

import { Link, NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../../../redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { SVGProps } from "react";
import { CartSheet } from "../../Cart/CartSheet";

const Navbar = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector(getCurrentUser);
   console.log(user);
   const authLinks = (
      <>
         <li>
            <NavLink
               to={"/login"}
               className={({ isActive }) =>
                  isActive
                     ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                     : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
               }
            >
               Login
            </NavLink>
         </li>
         <li>
            <NavLink
               to={"/register"}
               className={({ isActive }) =>
                  isActive
                     ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                     : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
               }
            >
               Register
            </NavLink>
         </li>
         <li>
            <NavLink
               to={"/books"}
               className={({ isActive }) =>
                  isActive
                     ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                     : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
               }
            ></NavLink>
         </li>
      </>
   );

   const navLinks = (
      <>
         <li>
            <NavLink
               to={"/"}
               className={({ isActive }) =>
                  isActive
                     ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                     : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
               }
            >
               Home
            </NavLink>
         </li>
         <li>
            <NavLink
               to={"/books"}
               className={({ isActive }) =>
                  isActive
                     ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                     : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
               }
            >
               All Books
            </NavLink>
         </li>
         <li>
            <NavLink
               to={"/books"}
               className={({ isActive }) =>
                  isActive
                     ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                     : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
               }
            ></NavLink>
         </li>
      </>
   );

   const handleLogOut = () => {
      dispatch(logout());
   };

   return (
      <div className="navbar bg-green-100">
         <div className="navbar-start">
            <div className="dropdown">
               <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
               >
                  {navLinks}
               </ul>
            </div>
            <a className="btn btn-ghost text-xl">Book-Haven</a>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
     
         </div>
      
         <div className="navbar-end">
         <CartSheet />
            {user ? (
               <div className="dropdown dropdown-end">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost btn-circle avatar"
                  >
                     <div className="w-10 rounded-full">
                        <img
                           alt="Tailwind CSS Navbar component"
                           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                        ;
                     </div>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-48"
                  >
                    
                    {
                     user?.role == 'user' &&  <li>
                     <Link
                        to={"/profile"}
                        className=" text-xl font-sans justify-between"
                     >
                        Profile
                     </Link>
                  </li>
                    }
                     <li>
                        <Link
                           to={"/dashboard"}
                           className=" text-xl font-sans justify-between"
                        >
                           Dashboard
                        </Link>
                     </li>

                     <li onClick={handleLogOut}>
                        <a className=" text-xl font-sans justify-between">
                           Logout
                        </a>
                     </li>
                  </ul>
               </div>
            ) : (
               <>
                  {" "}
                  <Link to={"/login"}>
                     {" "}
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold mr-2">
                        Login
                     </button>{" "}
                  </Link>
                  <Link to={"/register"}>
                     {" "}
                     <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold">
                        Register
                     </button>{" "}
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

function CarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
       <circle cx="7" cy="17" r="2" />
       <path d="M9 17h6" />
       <circle cx="17" cy="17" r="2" />
     </svg>
   );
 }

export default Navbar;


