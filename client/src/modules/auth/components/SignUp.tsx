import React, { useState } from "react";
import { signUp } from "../api/authAPI";
import { type SignUpRequest } from "../../../types/auth";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Alert from "../../../components/Alert";
import Card from "../../../components/Card";

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpRequest>({
    name: "",
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
      const response = await signUp(formData);
      setMessage(response.message);
    } catch (err) {
      setErrorMessage((err as Error).message);
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
        </form>
        {message && <Alert type="success" message={message} />}
        {errorMessage && <Alert type="error" message={errorMessage} />}
      </Card>
    </div>
  );
}
