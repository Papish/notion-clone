import { useState } from "react";
import { httpClient } from "../../utils";
import { useNavigate } from "react-router";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "admin@admin.com",
    password: "Admin@123",
    remember: false,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { status } = await httpClient.post("auth/login", form);
    if (status === 200) {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, remember: e.target.checked }))
            }
          />
          Remember Me
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
