import { Routes, Route } from "react-router";
import LoginPage from "./components/login/Login";
import RegisterPage from "./components/register/Register";
import DashboardPage from "./components/dashboard/Dashboard";
import { AuthProvider } from "./providers/auth/auth-provider";
import PrivateRoute from "./components/auth/PrivateRoute";
import AppLayout from "./layouts/AppLayout";
import "./App.css";
import PublicRoute from "./components/auth/PublicRoute";

const Home = () => <div>Home</div>;

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
