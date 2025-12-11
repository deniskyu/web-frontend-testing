import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../../context/Context";
const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole, loadingUser } = useContext(Context);

  if (loadingUser)
    return;

  // Not logged in => redirect to home
  if (!userRole) return <Navigate to="/" replace />;

  // Role not allowed => redirect to home
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
