/** @format */

import { Button,  Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useAppSelector } from "../../redux/hook";
import {  TUser, useCurrentToken } from "../../redux/feature/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { Link } from "react-router-dom";

const userRole = {
    ADMIN: "admin",
    USER:   "user",
 };

// Admin paths
export const adminPaths = [
  {
    name: "Book Management",
    children: [
        {
            name: "Create Book",
            path: "create-book",
         },
         {
            name: "View All Books",
            path: "view-all-books",
         },
         {
            name: "Manage Orders",
            path: "manage-orders",
         },
    ]
  }
 ];
 
 // User paths
 export const userPaths = [
    {
       name: "View My Orders",
       path: "my-orders",
    },
    {
       name: "Browse Products",
       path: "browse-products",
    },
 ];
 


const Sidebar = () => {


 const token = useAppSelector(useCurrentToken);
 let user;
 if (token) {
    user = verifyToken(token);
 }

 let sidebarItems;

 // Generate sidebar items based on role
 switch (( user as TUser)?.role ) {
    case userRole.ADMIN:
       sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
       break;
    case userRole.USER:
       sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
       break;
    default:
       break;
 }



   return (
      <Sider
         breakpoint="md"
         collapsedWidth="0"
         style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
         onBreakpoint={(broken) => {
            // console.log(broken);
         }}
         onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
         }}
      >
        <div className="text-white mt-4 flex justify-center items-center">
       <Link to={'/'}>   <Button> Home </Button></Link>
        </div>
         <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sidebarItems}
         />
      </Sider>
   );
};

export default Sidebar;
