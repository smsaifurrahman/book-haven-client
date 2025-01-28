import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Books from "../pages/Books/Books";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SidebarLayout from "../components/layout/DashboardLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import CreateBook from "../pages/Admin/CreateBook";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          index:true,
          element: <Home />
        },
        {
          path: "/books",
          element: <Books />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
      ]
    },

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'create-book',
          element: <CreateBook />
        }
      ]
    }

  ]);

  export default router