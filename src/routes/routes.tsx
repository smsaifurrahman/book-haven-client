/** @format */

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Books from "../pages/Books/Books";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../components/layout/DashboardLayout";
import CreateBook from "../pages/Admin/CreateBook";
import ViewAllBooks from "../pages/Admin/ViewAllBooks";
import BookDetails from "../components/BookCard/BookDetails";
import VerifyOrder from "../pages/VerifyOrder";
import OrderDetails from "../pages/OrderDetails";
import ViewMyOrders from "../pages/User/ViewMyOrders";
import Profile from "../pages/User/Profile";
import ViewAllUsers from "../pages/Admin/ViewAllUsers";
import ViewAllOrders from "../pages/Admin/ViewAllOrders";


const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: "/books",
            element: <Books />,
         },
         {
            path: "/login",
            element: <Login />,
         },
         {
            path: "/register",
            element: <Register />,
         },
         {
            path: "/profile",
            element: <Profile />,
         },
         {
            path: "/book-details",
            element: <BookDetails />,
         },
         {
            path: "/order/verify",
            element: <VerifyOrder />,
         },
         {
            path: "/order/all-orders",
            element: <OrderDetails />,
         },
        
      ],
   },

   {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
         {
            path: "create-book",
            element: <CreateBook />,
         },
         {
            path: "view-all-books",
            element: <ViewAllBooks />,
         },
         {
            path: "view-all-users",
            element: <ViewAllUsers />,
         },
         {
            path: "view-my-orders",
            element: <ViewMyOrders />,
         },
         {
            path: "view-all-orders",
            element: <ViewAllOrders />,
         },
      ],
   },
]);

export default router;
