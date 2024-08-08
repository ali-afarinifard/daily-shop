'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface User {
    username: string;
    email: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { accessToken, refreshToken, user } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(user);
    };

    const register = async (username: string, email: string, password: string) => {
        await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user', error);
            setUser(null);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchUser();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, fetchUser  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
