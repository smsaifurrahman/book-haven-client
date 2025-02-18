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
import ProtectedRoute from "./ProtectedRoute";
import AboutPage from "../pages/AboutPage/AboutPage";
import CheckoutPage from "../pages/Checkoutpage/CheckoutPage";

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
            path: "/about-us",
            element: <AboutPage />,
         },
         {
            path: "/register",
            element: <Register />,
         },
         {
            path: "/profile",
            element: (
               <ProtectedRoute role="user">
                  <Profile />
               </ProtectedRoute>
            ),
         },
         {
            path: "/book-details/:id",
            element: <BookDetails />,
         },
         {
            path: "/checkout",
            element: <CheckoutPage />,
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
      element: (
         // <ProtectedRoute role="user">
         //    <DashboardLayout />
         // </ProtectedRoute>
         <DashboardLayout />
      ),
      children: [
         {
            path: "create-book",
            element: (
               <ProtectedRoute role="admin">
                  <CreateBook />
               </ProtectedRoute>
            ),
         },
         {
            path: "view-all-books",
            element: <ViewAllBooks />,
         },
         {
            path: "view-all-users",
            element: (
               <ProtectedRoute role="admin">
                  <ViewAllUsers />
               </ProtectedRoute>
            ),
         },
         {
            path: "view-my-orders",
            element: (
               <ProtectedRoute role="user">
                  <ViewMyOrders />
               </ProtectedRoute>
            ),
         },
         {
            path: "view-all-orders",
            element: (
               <ProtectedRoute role="admin">
                  <ViewAllOrders />
               </ProtectedRoute>
            ),
         },
      ],
   },
]);

export default router;
