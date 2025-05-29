import React from 'react';

const DashboardOverview = () => {
  // Mock data for demonstration
  const mockStats = {
    totalBookings: 12,
    upcomingBookings: 3,
    completedBookings: 8,
    cancelledBookings: 1,
  };

  const mockRecentActivity = [
    {
      id: 1,
      type: 'booking',
      message: 'New booking: Wedding Photography on April 15, 2024',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received for Portrait Session',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'gallery',
      message: 'New photos uploaded to Wedding Gallery',
      time: '2 days ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">{mockStats.totalBookings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">Upcoming Bookings</h3>
          <p className="text-3xl font-bold mt-2">{mockStats.upcomingBookings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">Completed Bookings</h3>
          <p className="text-3xl font-bold mt-2">{mockStats.completedBookings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-500 text-sm">Cancelled Bookings</h3>
          <p className="text-3xl font-bold mt-2">{mockStats.cancelledBookings}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
              <div>
                <p className="text-gray-800">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
