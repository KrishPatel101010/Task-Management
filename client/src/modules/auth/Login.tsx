import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Input } from "../../components";
import { useAuth, useForm } from "../../hooks";
import type { LoginRequest } from "../../types/auth";
export default function Login() {
  const { formData, handleChange } = useForm<LoginRequest>({
    email: "",
    password: "",
  });
  const { response, loading, error, userLogin } = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await userLogin(formData);
    if (response.token) {
      localStorage.setItem("auth-token", response.token);
      navigate("/tasks");
    }
  };
  const handleSignUp = () => {
    navigate("/sign-up");
  };

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
