// ** React
import React, { createContext, useState, useEffect } from 'react';
import api from '../config/api';

// ** Create Context
const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken'));

    const [admin, setAdmin] = useState(null);



    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token && refreshToken) {
            setIsAuthenticated(true);
            fetchAdmin(token);
        }
    }, []);

    const fetchAdmin = async (token) => {
        try {
            const res = await api.get('/auth/admin', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAdmin(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error fetching user:', error);
            setIsAuthenticated(false);
        }
    };

    const register = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        fetchAdmin(accessToken);
    };

    const login = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        fetchAdmin(accessToken);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setAdmin(null);
    };


    const updateAdminInContext = (updatedAdmin) => {
        setAdmin(updatedAdmin);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, updateAdminInContext, admin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
