import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../../providers";

const PublicRoute = () => {
  const { user, loadingUser } = useAuthContext();
  const location = useLocation();

  if (loadingUser) return <div>Loading...</div>;

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} state={{ from: location }} replace />
  );
};

export default PublicRoute;
