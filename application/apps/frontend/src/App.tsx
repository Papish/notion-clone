import { Routes, Route, Link } from "react-router";
import LoginPage from "./components/login/Login";
import RegisterPage from "./components/register/Register";
import DashboardPage from "./components/dashboard/Dashboard";
import { AuthProvider } from "./providers/auth/auth-provider";
import PrivateRoute from "./components/PrivateRoute";

const Home = () => <div>Home</div>;

const App = () => {
  return (
    <AuthProvider>
      <div>App</div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
