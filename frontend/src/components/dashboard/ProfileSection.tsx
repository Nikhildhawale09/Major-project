import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";
import { User } from "@/types/auth";
import { Camera } from "lucide-react";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfileSection = () => {
  const { user } = useAuth();
  const [avatarHover, setAvatarHover] = React.useState(false);

  const { values, handleChange, handleSubmit, isSubmitting } = useForm<ProfileFormData>({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    onSubmit: async (values) => {
      // TODO: Implement profile update
      console.log("Profile update:", values);
    },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8">
          <div
            className="relative group"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt="Profile"
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div
              className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? "opacity-100" : "opacity-0"}`}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
            <Button
              size="sm"
              className="absolute bottom-0 right-0 bg-[#D4AF37] hover:bg-[#B59020] rounded-full w-8 h-8 p-0 shadow-lg"
            >
              <span className="sr-only">Change avatar</span>+
            </Button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-playfair text-white mb-2">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-white/70">{user?.email}</p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-sm rounded-full">
                Premium Client
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
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
                  className="bg-white/10 border-white/20 text-white"
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
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#D4AF37] hover:bg-[#B59020] text-white min-w-[120px]"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
