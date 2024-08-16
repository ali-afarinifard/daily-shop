'use client'

import api from "@/libs/api";
import { createContext, useEffect, useState } from "react";


export interface User {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    refreshToken?: string;
    city: string;
    phoneNumber: string;
    postalCode: string;
    address: string
}


interface AuthContextType {
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    updateUserInContext: (updatedUser: User | null) => void;
    user: User | null;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
    children: React.ReactNode;
}


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken'));
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token && refreshToken) {
            setIsAuthenticated(true);
            fetchUser(token);
        }
    }, []);


    const fetchUser = async (token: string) => {
        try {
            const res = await api.get('/auth/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error fetching user:', error);
            setIsAuthenticated(false);
        }
    };



    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        fetchUser(accessToken);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUser(null);
    };


    const updateUserInContext = (updatedUser: User | null) => {
        setUser(updatedUser);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, updateUserInContext, user }}>
            {children}
        </AuthContext.Provider>
    );

};


export {AuthContext, AuthProvider};