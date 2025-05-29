import React, { useState } from 'react';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}

const BookingsList = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Mock data for demonstration
  const mockBookings: Booking[] = [
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
    {
      id: "4",
      service: "Event Coverage",
      date: "2024-01-25",
      time: "18:00",
      location: "Convention Center",
      status: "cancelled",
      price: 29999,
    },
  ];

  const filteredBookings = mockBookings.filter(booking => {
    if (activeFilter === 'all') return true;
    return booking.status === activeFilter;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Bookings</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-md ${
              activeFilter === 'all'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`px-4 py-2 rounded-md ${
              activeFilter === 'upcoming'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              activeFilter === 'completed'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveFilter('cancelled')}
            className={`px-4 py-2 rounded-md ${
              activeFilter === 'cancelled'
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{booking.service}</h3>
                <p className="text-gray-600">
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
                <p className="text-gray-600">{booking.location}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-800'
                      : booking.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <p className="mt-2 font-semibold">₹{booking.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;
