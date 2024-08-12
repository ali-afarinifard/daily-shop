'use client'


import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react'
import Container from '../components/Container';
import Summary from '../components/userProfile/Summary';


const UserAccount = () => {


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;


    if (!user) {
        return <p>Please log in to view your wishlist.</p>;
    }

    return (
        <div>
            <Summary user={user._id} />
        </div>
    )
}

export default UserAccount