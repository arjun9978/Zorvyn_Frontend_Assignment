import { useTypedSelector } from "@/app/hook";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken, user } = useTypedSelector((state) => state.auth);

  if (accessToken && user)  return <Outlet />;
  
  // Redirect to demo login page
  return <Navigate to="/login" replace />;

};

export default ProtectedRoute;