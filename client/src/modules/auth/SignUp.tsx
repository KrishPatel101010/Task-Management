import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Input } from "../../components";
import { useAuth } from "../../hooks";
import type { SignUpRequest } from "../../types";

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpRequest>({
    name: "",
    email: "",
    password: "",
  });
  const { response, loading, error, userSignUp } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await userSignUp(formData);
    if (result) {
      navigate("/login");
    }
  }
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <Button type="submit" className="w-full" variant="secondary">
            Sign Up
          </Button>
          <p>
            Already have an Account?{" "}
            <Button
            disabled={loading}
              type="button"
              variant="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </p>
        </form>
        {response && <Alert type="success" message={response} />}
        {error && <Alert type="error" message={error} />}
      </Card>
    </div>
  );
}
