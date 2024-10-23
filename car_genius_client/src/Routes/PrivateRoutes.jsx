import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <span className="loading loading-spinner text-error text-center"></span>
    );
  }
  if (user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoutes;
