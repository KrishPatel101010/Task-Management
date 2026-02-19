import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Input } from "../../components";
import {useAuth} from "../../hooks";
import type { LoginRequest } from "../../types/auth";

export default function Login() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const { response, loading, error, userLogin } = useAuth();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await userLogin(formData);
    if (result) {
      navigate("/tasks");
    }
  }
  function handleSignUp() {
    navigate("/sign-up");
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button disabled={loading} type="submit" className="w-full">
            Login
          </Button>
          <p>
            Don't have an Account?
            <Button type="button" variant="primary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </p>
        </form>
        {response && <Alert type="success" message={response} />}
        {error && <Alert type="error" message={error} />}
      </Card>
    </div>
  );
}
