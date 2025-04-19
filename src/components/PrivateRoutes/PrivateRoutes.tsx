import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface IPrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes = ({ children }: IPrivateRoutesProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default PrivateRoutes;
