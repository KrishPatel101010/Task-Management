import { useState} from "react"; 
import { signUp } from "./auth.service";
import { type SignUpRequest } from "../../types/auth.types";

export default function SignUp() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    setIsLoading(true);
    setError("");
    setMessage("");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as SignUpRequest;

    try {
      await signUp(data);
      setMessage("Account created successfully!"); 
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
        <br />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
        <br />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </>
  );
}