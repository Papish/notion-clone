import { useEffect } from "react";
import { httpClient } from "../../utils";

const DashboardPage = () => {
  useEffect(() => {
    const getProfile = async () => {
      const { data } = await httpClient.get("/user/profile");
			console.log(data)
    };

    getProfile();
  }, []);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
