import { Navigate } from "react-router-dom";

const OwnerProtectedRoute = ({ children }) => {
  const ownerToken = localStorage.getItem("ownerToken");

  if (!ownerToken) {
    return <Navigate to="/owner/login" replace />;
  }

  return children;
};

export default OwnerProtectedRoute;