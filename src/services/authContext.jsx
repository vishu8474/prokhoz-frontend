// src/services/authContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from './api.jsx';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await authAPI.getMe();
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    // In your authContext.jsx, add these logs:
const login = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    const { user: userData, token } = response.data;
    
    console.log('🟢 AUTH CONTEXT - Login successful, user role:', userData.role);
    console.log('🟢 AUTH CONTEXT - Full user data:', userData);
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    return userData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { user: newUser, token } = response.data;
            
            console.log('🟢 AUTH CONTEXT - Registration successful, user:', newUser);
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            
            // ✅ RETURN THE USER DATA FOR IMMEDIATE USE
            return newUser;
            
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    const updateUser = (updatedUserData) => {
        const updatedUser = { ...user, ...updatedUserData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};