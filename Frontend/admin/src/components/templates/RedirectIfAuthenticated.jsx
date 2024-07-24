import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        // Redirect to the home page or any other page when the user is authenticated
        return <Navigate to="/" />;
    }

    // Render the children (login or register component) if not authenticated
    return children;
};

export default RedirectIfAuthenticated;
