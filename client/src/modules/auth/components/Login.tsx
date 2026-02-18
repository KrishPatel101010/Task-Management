import { useState } from "react";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import type { LoginRequest } from "../../../types/auth";
import { login } from "../api/authAPI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");
    try {
      const response = await login(formData);
      setMessage(response.message);
      navigate("/tasks");
    } catch (err) {
      setErrorMessage((err as Error).message);
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
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p>
            Don't have an Account?
            <Button type="button" variant="primary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </p>
        </form>
        {message && <Alert type="success" message={message} />}
        {errorMessage && <Alert type="error" message={errorMessage} />}
      </Card>
    </div>
  );
}
