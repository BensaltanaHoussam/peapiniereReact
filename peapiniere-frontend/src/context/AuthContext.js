import React, { createContext, useState, useContext } from 'react';
import axios from '../utils/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/login', {
                email,
                password
            });
            
            console.log('API Response:', response.data);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
                return response.data;
            }
            throw new Error('No token received');
        } catch (error) {
            console.error('Auth Error:', error.response?.data || error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout');
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);