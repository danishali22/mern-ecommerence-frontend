import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  redirect?: string,
  adminRoute?: boolean,
  isAdmin?: boolean
};

const ProtectedRoute = ({children, isAuthenticated, redirect="/", adminRoute, isAdmin}: Props) => {
  if(!isAuthenticated) return <Navigate to={redirect} />
  if(adminRoute && !isAdmin) return <Navigate to={redirect} />
    return children ? children: <Outlet />;
}

export default ProtectedRoute