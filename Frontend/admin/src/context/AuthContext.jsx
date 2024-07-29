// ** React
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// ** Create Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken'));

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        // setIsAuthenticated(!!token && !!refreshToken);

        if (token && refreshToken) {
            setIsAuthenticated(true);
            fetchUser(token);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/user', {
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

    const login = (accessToken, refreshToken) => {
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


    const updateUserInContext = (updatedUser) => {
        setUser(updatedUser);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, updateUserInContext, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
