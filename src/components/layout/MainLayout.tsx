/** @format */

import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar/Navbar";

const MainLayout = () => {
   return (
    <div className=" mx-2 flex flex-col min-h-screen"> 
    {/* Navbar at the top */}
    <Navbar />

    {/* Main content that expands */}
    <main className="flex-grow mx-2 mt-2 px-2 md:px-2 lg:px-0">
       <Outlet />
    </main>

    {/* Footer at the bottom */}
    <Footer />
 </div>
   );
};

export default MainLayout;
