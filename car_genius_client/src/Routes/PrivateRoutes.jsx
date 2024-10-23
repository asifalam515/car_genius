import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <span className="loading loading-spinner text-error text-center"></span>
    );
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoutes;
