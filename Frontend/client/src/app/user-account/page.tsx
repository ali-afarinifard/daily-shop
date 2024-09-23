'use client'


// ** React
import React, { useContext } from 'react'

// ** Auth Context
import { AuthContext } from '@/context/AuthContext';

// ** Components
import Summary from '../components/userProfile/user-account/Summary';
import { Box } from '@mui/material';


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
        <Box
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            <Summary user={user} updateUserInContext={updateUserInContext} />
        </Box>
    )
}

export default UserAccount