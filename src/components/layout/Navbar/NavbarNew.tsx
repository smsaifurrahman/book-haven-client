/** @format */

import { Link, NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../../../redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { CartSheet } from "../../Cart/CartSheet";

const NavbarNew = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector(getCurrentUser);

   const handleLogOut = () => {
      dispatch(logout());
   };

   const navLinks = (
      <>
         <li>
            <NavLink
               to="/"
               className={({ isActive }) =>
                  isActive
                     ? "text-indigo-700 font-semibold text-lg px-4 py-2 border-b-2 border-indigo-700"
                     : "text-gray-600 hover:text-indigo-600 font-medium text-lg px-4 py-2 transition-colors duration-200"
               }
               style={{ outline: 'none', boxShadow: 'none' }} // Disable focus and active states that cause flickering
            >
               Home
            </NavLink>
         </li>
         <li>
            <NavLink
               to="/books"
               className={({ isActive }) =>
                  isActive
                     ? "text-indigo-700 font-semibold text-lg px-4 py-2 border-b-2 border-indigo-700"
                     : "text-gray-600 hover:text-indigo-600 font-medium text-lg px-4 py-2 transition-colors duration-200"
               }
               style={{ outline: 'none', boxShadow: 'none' }} // Disable focus and active states that cause flickering
            >
               All Books
            </NavLink>
         </li>
         <li>
            <NavLink
               to="/about-us"
               className={({ isActive }) =>
                  isActive
                     ? "text-indigo-700 font-semibold text-lg px-4 py-2 border-b-2 border-indigo-700"
                     : "text-gray-600 hover:text-indigo-600 font-medium text-lg px-4 py-2 transition-colors duration-200"
               }
               style={{ outline: 'none', boxShadow: 'none' }} // Disable focus and active states that cause flickering
            >
               About Us
            </NavLink>
         </li>
      </>
   );

   return (
      <div className="navbar bg-gray-50 shadow-sm">
         {/* Mobile menu button */}
         <div className="navbar-start lg:hidden">
            <div className="dropdown dropdown-bottom">
               <div tabIndex={0} role="button" className="btn btn-ghost">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                     />
                  </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1"
               >
                  {navLinks}
               </ul>
            </div>
         </div>

         <div className="navbar-start">
            <Link to="/" className="btn btn-ghost">
               <span className="text-2xl mr-4 lg:mr-0 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  BookHaven
               </span>
            </Link>
         </div>

         {/* Desktop menu */}
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
         </div>

         {/* Right side section */}
         <div className="navbar-end gap-4">
            <CartSheet />

            {user ? (
               <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="avatar online">
                     <div className="w-10 rounded-full ring-2 ring-indigo-600 ring-offset-2">
                        <img
                           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                           alt="User Avatar"
                        />
                     </div>
                  </div>
                  <ul className="dropdown-content z-[10] menu p-2 shadow bg-white rounded-box w-48 mt-4">
                     {user.role === "user" && (
                        <li>
                           <Link to="/profile" className="text-gray-700 hover:bg-indigo-50">
                              Profile
                           </Link>
                        </li>
                     )}
                     <li>
                        <Link to="/dashboard" className="text-gray-700 hover:bg-indigo-50">
                           Dashboard
                        </Link>
                     </li>
                     <li>
                        <button
                           onClick={handleLogOut}
                           className="text-red-600 hover:bg-red-50"
                        >
                           Logout
                        </button>
                     </li>
                  </ul>
               </div>
            ) : (
               <div className="flex gap-2">
                  <Link
                     to="/login"
                     className="btn btn-outline px-6 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
                  >
                     Login
                  </Link>
                  <Link
                     to="/register"
                     className="btn px-6 bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                     Register
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};

export default NavbarNew;
