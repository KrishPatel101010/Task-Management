import { useState } from "react";
import type { LoginRequest } from "../../../types/auth";
import { login } from "../api/authAPI";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Alert from "../../../components/Alert";
import Card from "../../../components/Card";

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

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await login(formData);
      setMessage(response.message);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
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
        </form>
        {message && <Alert type="success" message={message} />}
        {errorMessage && <Alert type="error" message={errorMessage} />}
      </Card>
    </div>
  );
}
