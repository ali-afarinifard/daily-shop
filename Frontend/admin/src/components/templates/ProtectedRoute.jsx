import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        // If the access token is not present, redirect to the login page
        return <Navigate to="/register" replace />;
    }

    // If the access token is present, render the children (the protected component)
    return children;
};

export default ProtectedRoute;
