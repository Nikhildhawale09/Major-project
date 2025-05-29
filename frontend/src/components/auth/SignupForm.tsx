import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import { SignupCredentials, LoginCredentials, User, AuthState } from "@/context/types";

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();
  const [formError, setLocalFormError] = useState<string | null>(null);

  const { values, handleChange, handleSubmit } = useForm<SignupCredentials>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setLocalFormError(null);

      console.log('Signup form values:', values);

      if (values.password !== values.confirmPassword) {
        setLocalFormError("Passwords do not match");
        return;
      }

      try {
        await signup({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        });

        // Navigate to dashboard on successful signup
        navigate('/dashboard');

      } catch (err) {
        console.error("Signup submission error:", err);
      }
    },
  });

  const displayError = error || formError;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {displayError && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
          {displayError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

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
          placeholder="Enter your email"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
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
          placeholder="Create a password"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/login"
            className="text-sm text-[#D4AF37] hover:text-[#B59020]"
          >
            Already have an account?
          </Link>
        </motion.div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B59020] text-white
          hover:from-[#B59020] hover:to-[#D4AF37] transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-white/70 bg-[#0c0c0c]">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
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
    </form>
  );
};

export default SignupForm;