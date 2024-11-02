"use client";
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, facebookProvider } from '@/app/firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [auth_user, setAuthUser] = useState(null);

    useEffect(() => {
        const token_user = localStorage.getItem('token-user');
        const token_admin = localStorage.getItem('token-admin');
        if (token_user) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token_user}`;
            // fetch current user
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/current-user`)
                .then(response => {
                    setRole(response.data.data.user.role.id);
                    setAuthUser(response.data.data);
                })
                .catch(() => {
                    setRole(null);
                    localStorage.removeItem('token-user');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (token_admin) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token_admin}`;
            // fetch current admin user
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/current-user`)
                .then(response => {
                    setRole(response.data.data.user.role.id);
                    setAuthUser(response.data.data);
                })
                .catch(() => {
                    setRole(null);
                    localStorage.removeItem('token-admin');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, credentials);
        // console.log('Login successful:', response.data.data);
        const { access_token } = response.data.data;
        // console.log('Login successful:', user);
        localStorage.setItem('token-user', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setRole(response.data.data.user.role.id);
        setAuthUser(response.data.data);
    };
    const userLoginGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const { user } = result;
        const idToken = await user.getIdToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sso-login`, { idToken });
        console.log('Login successful:', response.data.data);
        const { access_token } = response.data.data;
        localStorage.setItem('token-user', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setRole(response.data.data.user.role.id);
        setAuthUser(response.data.data);
    };
    const userLoginFacebook = async () => {
        const result = await signInWithPopup(auth, facebookProvider);
        const { user } = result;
        const idToken = await user.getIdToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sso-login`, { idToken });
        console.log('Login successful:', response.data.data);
        const { access_token } = response.data.data;
        localStorage.setItem('token-user', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setRole(response.data.data.user.role.id);
        setAuthUser(response.data.data);
    };
    const logout = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`);
        localStorage.removeItem('token-user');
        delete axios.defaults.headers.common['Authorization'];
        setRole(null);
    };

    const adminLogin = async (credentials) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, credentials);
        // console.log('Login successful:', response.data.data);
        const { access_token, user } = response.data.data;
        // console.log('Login successful:', user);
        localStorage.setItem('token-admin', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setRole(response.data.data.user.role.id);
        setAuthUser(response.data.data);
    };

    const adminLogout = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`);
        localStorage.removeItem('token-admin');
        delete axios.defaults.headers.common['Authorization'];
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ auth_user, role, loading, login, logout, adminLogin, adminLogout, userLoginGoogle, userLoginFacebook }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};