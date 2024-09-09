'use client'


// ** Next
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

// ** Store - RTK-Q
import { useFetchUserQuery } from "@/store/apiSlice";


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
    register: (accessToken: string, refreshToken: string) => void;
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

    const router = useRouter();


    const accessToken = localStorage.getItem('accessToken');
    const { data: fetchedUser, error } = useFetchUserQuery(accessToken || '', {
        skip: !accessToken, // Only fetch if the token exists
    });


    useEffect(() => {
        if (fetchedUser) {
            setUser(fetchedUser);
            setIsAuthenticated(true);
        }
        if (error) {
            setIsAuthenticated(false);
        }
    }, [fetchedUser, error]);


    const register = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
    };


    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
    };


    const updateUserInContext = (updatedUser: User | null) => {
        setUser(updatedUser);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, updateUserInContext, user }}>
            {children}
        </AuthContext.Provider>
    );

};


export { AuthContext, AuthProvider };