import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Add a request interceptor to add admin password to admin routes
api.interceptors.request.use(
  (config) => {
    // Get the admin password from session storage
    const adminPassword = sessionStorage.getItem('adminPassword');
    
    // If it's an admin route and we have an admin password, add it to headers
    if (config.url?.startsWith('/admin') && adminPassword) {
      config.headers['adminPassword'] = adminPassword;
    }
    
    // Get the auth token from localStorage (if your app stores it there)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Log outgoing requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`, 
        config.params || config.data || '');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling common responses
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📥 API Response: ${response.status} ${response.config.url}`, 
        response.data);
    }
    return response;
  },
  (error) => {
    // Log error responses in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ API Error: ${error.response?.status || 'Network Error'} ${error.config?.url || ''}`, 
        error.response?.data || error.message);
    }
    
    // Handle unauthorized admin requests (missing or invalid admin password)
    if (error.response?.status === 403 && 
        error.response?.data?.requiresPassword && 
        error.config?.url?.startsWith('/admin')) {
      // Redirect to admin verify page if admin password is required
      window.location.href = '/admin/verify';
      return Promise.reject(error);
    }
    
    // Handle 401 unauthorized responses (expired token, etc.)
    if (error.response?.status === 401) {
      // Clear token from storage
      localStorage.removeItem('token');
      sessionStorage.removeItem('adminPassword');
      
      // Redirect to login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper functions for common API operations
const apiService = {
  // Auth endpoints
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { email: string; password: string; firstName: string; lastName: string }) =>
    api.post('/auth/register', userData),
  
  logout: () => api.get('/auth/logout'),
  
  getMe: () => api.get('/auth/me'),
  
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/change-password', data),

  // Service endpoints
  getServices: () => api.get('/services'),
  
  getService: (id: string) => api.get(`/services/${id}`),
  
  createService: (data: any) => api.post('/services', data),
  
  updateService: (id: string, data: any) => api.put(`/services/${id}`, data),
  
  deleteService: (id: string) => api.delete(`/services/${id}`),

  // Additional services endpoints
  getAdditionalServices: () => api.get('/additional-services'),
  
  getAdditionalService: (id: string) => api.get(`/additional-services/${id}`),
  
  createAdditionalService: (data: any) => api.post('/additional-services', data),
  
  updateAdditionalService: (id: string, data: any) => api.put(`/additional-services/${id}`, data),
  
  deleteAdditionalService: (id: string) => api.delete(`/additional-services/${id}`),

  // Booking endpoints
  getBookings: () => api.get('/bookings'),
  
  getBooking: (id: string) => api.get(`/bookings/${id}`),
  
  createBooking: (data: any) => api.post('/bookings', data),
  
  updateBooking: (id: string, data: any) => api.put(`/bookings/${id}`, data),
  
  deleteBooking: (id: string) => api.delete(`/bookings/${id}`),

  calculateBookingPrice: (data: any) => api.post('/bookings/calculate', data),

  // Admin endpoints
  getDashboardStats: () => api.get('/admin/dashboard'),
  
  getUsers: () => api.get('/admin/users'),
  
  getUser: (id: string) => api.get(`/admin/users/${id}`),
  
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),

  getBookingAnalytics: () => api.get('/admin/analytics/bookings'),
  
  getRevenueAnalytics: () => api.get('/admin/analytics/revenue'),

  // Photographer endpoints
  getPhotographers: () => api.get('/photographers'),
  
  getPhotographer: (id: string) => api.get(`/photographers/${id}`),
  
  createPhotographer: (data: any) => api.post('/photographers', data),
  
  updatePhotographer: (id: string, data: any) => api.put(`/photographers/${id}`, data),
  
  deletePhotographer: (id: string) => api.delete(`/photographers/${id}`)
};

export { api, apiService };
export default api; 