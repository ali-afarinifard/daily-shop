'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface UserContextProps {
    user: any;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setAccessToken(response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setUser(jwtDecode(response.data.accessToken)); // Decode the JWT token
            router.push('/'); // Navigate to the home page
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            setAccessToken(response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setUser(jwtDecode(response.data.accessToken)); // Decode the JWT token
            router.push('/'); // Navigate to the home page
        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('refreshToken');
        router.push('/login'); // Navigate to the login page
    };

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) return;

            const response = await axios.post('http://localhost:5000/api/auth/refresh-token', { token: refreshToken });
            setAccessToken(response.data.accessToken);
            setUser(jwtDecode(response.data.accessToken)); // Decode the new access token
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        }
    };

    useEffect(() => {
        const checkTokenExpiry = () => {
            if (accessToken) {
                const decodedToken: any = jwtDecode(accessToken);
                if (decodedToken.exp * 1000 < Date.now()) {
                    refreshAccessToken();
                }
            }
        };

        const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000); // Check every 5 minutes
        return () => clearInterval(interval);
    }, [accessToken]);

    return (
        <UserContext.Provider value={{ user, accessToken, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
