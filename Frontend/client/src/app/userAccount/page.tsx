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

    const { user, updateUserInContext } = authContext;


    if (!user) {
        return;
    }

    return (
        <div className='w-full h-full'>
            <Summary user={user} updateUserInContext={updateUserInContext} />
        </div>
    )
}

export default UserAccount