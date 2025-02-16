import { useAuthContext } from "../../providers";

const DashboardPage = () => {
  const { user, logout } = useAuthContext();

  return (
    <div>
      DashboardPage {user?.name}{" "}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default DashboardPage;
