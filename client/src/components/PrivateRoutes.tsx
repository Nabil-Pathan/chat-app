import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

interface PrivateRouteProps {
  element: React.ReactNode;
}

function PrivateRoute({ element }: PrivateRouteProps & RouteProps) {
  const { user } = useUserContext();  
  return user.token !== "" ? (element as React.ReactElement) : <Navigate to="/" />;
}

export default PrivateRoute;