import { useAuthContext } from "../../providers";

const DashboardPage = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="mt-10">
      DashboardPage {user?.name}{" "}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default DashboardPage;
