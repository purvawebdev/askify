import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper to handle API calls
  const handleAuth = async (apiFunc, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFunc(data);
      
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/chat'); // Redirect on success
      }
    } catch (err) {
      // Extract the error message safely
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Exposed functions for the UI
  const login = (data) => handleAuth(loginUser, data);
  const register = (data) => handleAuth(registerUser, data);

  return { login, register, loading, error };
};