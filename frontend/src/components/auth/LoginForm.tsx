import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import { LoginCredentials } from "@/types/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const { values, handleChange, handleSubmit } = useForm<LoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log('Attempting login with Email:', values.email);
      console.log('Password:', values.password);

      try {
        await login(values);
      } catch (err) {
        console.error("Login submission error:", err);
      }
    },
  });

  const displayError = error;

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10"
      >
        <h2 className="text-2xl font-playfair text-white mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          
          {displayError && (
            <div className="text-red-400 text-sm">{displayError}</div>
          )}
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] hover:bg-[#B59020] text-black"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-white/70 bg-[#0c0c0c]">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Facebook
            </Button>
          </div>
        </div>
        
        <p className="mt-6 text-center text-white/70">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#D4AF37] hover:text-[#B59020]">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
