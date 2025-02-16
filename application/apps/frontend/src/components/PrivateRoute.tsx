import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../providers";
import { useEffect, useState } from "react";
import { httpClient } from "../utils";

const PrivateRoute = () => {
  const { user, login } = useAuthContext();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const getProfile = async () => {
        try {
          const { data } = await httpClient.get("/user/profile");
          login(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      getProfile();
    }
  }, [login, user]);

  if (isLoading) return <div>Loading...</div>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
