/** @format */

import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout, useCurrentToken } from "../redux/feature/auth/authSlice";

type TProtectedRoute = {
   children: ReactNode;
   role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
   const token = useAppSelector(useCurrentToken);
   const dispatch = useAppDispatch();
   const location = useLocation(); // Capture the current location

   let user;
   if (token) {
      user = verifyToken(token);
   }

   if (role !== undefined && role !== user?.role) {
      dispatch(logout());
      console.log('from private', location);
      return <Navigate to="/login" state={{from: location}} replace></Navigate>
   }

   if (!token) {
      return <Navigate to="/login" state={{from: location}} replace></Navigate>
   }

   return children;
};

export default ProtectedRoute;
