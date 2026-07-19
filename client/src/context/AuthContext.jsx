import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('userInfo');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.token) {
      localStorage.removeItem('userInfo');
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem('userInfo');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      if (user?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) logout();
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    if (!data?.success || !data?.data?.token) {
      throw new Error(data?.message || 'Login failed');
    }
    setUser(data.data);
    localStorage.setItem('userInfo', JSON.stringify(data.data));
    return data;
  };

  const signup = async (firstName, lastName, email, password) => {
    const { data } = await api.post('/api/auth/signup', { firstName, lastName, email, password });
    if (!data?.success) throw new Error(data?.message || 'Registration failed');
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
