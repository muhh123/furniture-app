"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Save user to localStorage when changed
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      console.log('Attempting login with:', { email });
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      
      console.log('Response status:', res.status);
      
      let data;
      try {
        data = await res.json().catch(() => ({}));
        console.log('Response data:', data);
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        throw new Error('Invalid response from server');
      }
      
      if (!res.ok) {
        const errorMsg = data?.message || `Login failed with status ${res.status}`;
        console.error('Login error:', { 
          status: res.status, 
          statusText: res.statusText,
          error: errorMsg,
          responseData: data
        });
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      if (!data || !data.token) {
        const errorMsg = 'Invalid response from server: Missing token';
        console.error(errorMsg, data);
        throw new Error(errorMsg);
      }
      
      setUser(data);
      return data;
    } catch (err: any) {
      console.error('Login caught error:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      const errorMsg = err.message || 'Failed to connect to the server';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        throw new Error(data.message || "Registration failed");
      }
      setUser(data);
    } catch (err: any) {
      setError(err.message || "Network error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError("");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
} 