import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    // const accessToken = localStorage.getItem('accessToken');

    // if (!accessToken) {
    //     // If the access token is not present, redirect to the login page
    //     return <Navigate to="/login" replace />;
    // }

    // // If the access token is present, render the children (the protected component)
    // return children;

    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
