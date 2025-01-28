import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Books from "../pages/Books/Books";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
  ]);

  export default router