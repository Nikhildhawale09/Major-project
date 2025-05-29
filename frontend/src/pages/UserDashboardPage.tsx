import React, { useState } from 'react';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import BookingsList from '../components/dashboard/BookingsList';
import ProfileSection from '../components/ProfileSection';

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const mockBookings = [
    {
      id: "1",
      service: "Wedding Photography",
      date: "2024-04-15",
      time: "14:00",
      location: "Grand Plaza Hotel",
      status: "upcoming",
      price: 89999,
    },
    {
      id: "2",
      service: "Portrait Session",
      date: "2024-03-20",
      time: "10:00",
      location: "Studio One",
      status: "completed",
      price: 14999,
    },
    {
      id: "3",
      service: "Product Photography",
      date: "2024-02-10",
      time: "13:30",
      location: "PixelFlare Studio",
      status: "completed",
      price: 19999,
    },
  ];

  const mockGalleries = [
    {
      id: "1",
      title: "Wedding Day",
      date: "2024-03-15",
      imageCount: 250,
      thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    },
    {
      id: "2",
      title: "Portrait Session",
      date: "2024-02-20",
      imageCount: 45,
      thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    },
  ];

  const mockPayments = [
    {
      id: "1",
      service: "Wedding Photography",
      date: "2024-03-10",
      amount: 89999,
      status: "paid",
      method: "Credit Card",
    },
    {
      id: "2",
      service: "Portrait Session",
      date: "2024-02-15",
      amount: 14999,
      status: "paid",
      method: "Bank Transfer",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-[#1A1A1A] rounded-lg p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-2xl font-bold">
                {/* Placeholder for user icon */}
              </div>
              <div>
                <h2 className="text-xl font-semibold">User Name</h2>
                <p className="text-gray-400">user@example.com</p>
              </div>
            </div>
            <nav>
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2 rounded-md mb-2 transition-colors ${
                  activeTab === "overview"
                    ? "bg-[#D4AF37] text-black"
                    : "hover:bg-[#2A2A2A]"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full text-left px-4 py-2 rounded-md mb-2 transition-colors ${
                  activeTab === "bookings"
                    ? "bg-[#D4AF37] text-black"
                    : "hover:bg-[#2A2A2A]"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-md mb-2 transition-colors ${
                  activeTab === "profile"
                    ? "bg-[#D4AF37] text-black"
                    : "hover:bg-[#2A2A2A]"
                }`}
              >
                Profile Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && <DashboardOverview />}
            {activeTab === "bookings" && <BookingsList />}
            {activeTab === "profile" && <ProfileSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage; 