import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, Lock, LogIn } from "lucide-react";
import { apiService } from "@/services/api";

const AdminVerifyPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If not authenticated or not an admin, redirect to login
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call the API with the admin password in headers
      const response = await apiService.verifyAdminPassword(adminPassword);

      if (response.data.success) {
        // Store admin password in session storage for future API calls
        sessionStorage.setItem("adminPassword", adminPassword);
        navigate("/admin/dashboard");
      } else {
        setError(response.data.message || "Verification failed");
      }
    } catch (err: any) {
      console.error("Admin verification error:", err);
      setError(
        err.response?.data?.message || 
        "Verification failed. Please check your password and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-playfair text-white">Admin Verification</h2>
          <p className="mt-2 text-sm text-white/70">
            Additional verification required for admin access
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-lg border border-white/10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-red-500/20 text-red-400">
              <Shield className="h-8 w-8" />
            </div>
          </div>

          {user?.googleId && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-md">
              <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Google Authentication Successful
              </h3>
              <p className="text-sm text-white/80 mt-2">
                You've successfully logged in with Google, but need to verify your admin password to access the admin dashboard.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="text-center mb-6">
              <p className="text-white/80 text-sm font-medium">
                {user?.email ? `Logged in as: ${user.email}` : ""}
              </p>
              <p className="text-white/70 text-xs mt-1">
                Please enter your admin password to access the dashboard
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword" className="text-white">
                Admin Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <p className="text-xs text-white/50 mt-1">
                This is required even when logging in with Google OAuth
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Access Admin Dashboard"}
            </Button>

            <div className="text-center mt-4">
              <Button
                type="button"
                variant="link"
                className="text-white/70 hover:text-white"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Cancel and log out
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminVerifyPage; 