import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { Navigate, useLocation } from "react-router";
const index = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (!user && isLoading === false) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default index;
