import React from 'react';
import { useAuth } from '@/context/AuthContext';

const DemoLoginTest = () => {
  const { login, loading, error, isAuthenticated } = useAuth();

  const handleLoginTest = async () => {
    // Hardcoded credentials for testing - replace with actual test user credentials
    const testEmail = 'test@test.com'; // Replace with an email from your AWS table with a HASHED password
    const testPassword = 'tes@123'; // Replace with the RAW password that corresponds to the HASHED password in your DB

    try {
      console.log('Attempting login with hardcoded credentials...');
      await login({ email: testEmail, password: testPassword });
      console.log('Login test completed.');
    } catch (err) {
      console.error('Login test failed:', err);
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl mb-4">Login Demo Test</h1>
      <p>Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <button
        onClick={handleLoginTest}
        disabled={loading || isAuthenticated}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Logging In...' : 'Test Login'}
      </button>
    </div>
  );
};

export default DemoLoginTest; 