import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

interface PublicRouteProps {
  element: React.ReactNode;
}

function PublicRoute({ element }: PublicRouteProps & RouteProps) {
  const { user } = useUserContext();
  return user.token !== "" ? <Navigate to="/chats" /> : (element as React.ReactElement);
}

export default PublicRoute;