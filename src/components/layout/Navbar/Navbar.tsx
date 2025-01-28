/** @format */

import { NavLink } from "react-router-dom";

const Navbar = () => {
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
               to={"/products"}
               className={({ isActive }) =>
                  isActive
                     ? " font-bold text-2xl text-gray-600 p-2 text-rounded-xl "
                     : "font-bold p-2 text-2xl text-orange-500 rounded-xl "
               }
            >
               Books
            </NavLink>
         </li>
      </>
   );

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
                  </div>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
               >
                  <li>
                     <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                     </a>
                  </li>
                  <li>
                     <a>Settings</a>
                  </li>
                  <li>
                     <a>Logout</a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
