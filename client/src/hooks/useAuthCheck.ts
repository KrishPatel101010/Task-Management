import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useAuthCheck = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        navigate("/login");
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, [navigate]);
};
export default useAuthCheck;
