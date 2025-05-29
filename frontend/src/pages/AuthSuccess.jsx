// src/pages/AuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // ✅ Save the token
      navigate("/dashboard"); // ✅ Redirect to dashboard
    } else {
      navigate("/login?error=Invalid token");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">
      Logging you in...
    </div>
  );
};

export default AuthSuccess;
