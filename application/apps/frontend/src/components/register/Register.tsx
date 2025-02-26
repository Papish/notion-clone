import { useState } from "react";
import { httpClient } from "../../utils";

interface LoginForm {
  name: string;
  email: string;
  password: string;
  repassword: string;
}

const RegisterPage = () => {
  const [form, setForm] = useState<LoginForm>({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await httpClient.post("auth/register", form);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Username</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
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
              setForm((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="password">Re-enter Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.repassword}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                repassword: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
