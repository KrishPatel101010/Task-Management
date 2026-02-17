import { useState } from "react";
import type { LoginRequest } from "../../types/auth.types";
import { login } from "./auth.service";

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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input onChange={handleChange} type="email" name="email" />
        <br />
        <label htmlFor="password">Password : </label>
        <input onChange={handleChange} type="password" name="password" />
        <br />
        <button type="submit">Login</button>
        {message ? <p>{message}</p> : <p>{errorMessage}</p>}
      </form>
    </>
  );
}
