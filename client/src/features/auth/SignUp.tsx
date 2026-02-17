import React, { useState } from "react";
import { signUp } from "../../services/auth.service";
import { type SignUpRequest } from "../../types/auth.types";

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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} type="text" name="name" />
        <br />

        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="email" name="email" required />
        <br />

        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          required
        />
        <br />

        <button type="submit">Sign Up</button>
        {message ? <p>{message}</p> : <p>{errorMessage}</p>}
      </form>
    </>
  );
}
