/** @format */

import { Link, NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../../../redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

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
                    
                     <li>
                        <Link
                           to={"/dashboard"}
                           className=" text-xl font-sans justify-between"
                        >
                           Profile
                        </Link>
                     </li>
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

export default Navbar;
