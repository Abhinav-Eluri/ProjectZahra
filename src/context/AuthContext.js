'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Update loading state based on session status
        setLoading(status === 'loading');
    }, [status]);

    const login = async (email, password) => {
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const adminLogin = async (email, password) => {
        try {
            // First try the admin-specific endpoint
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Admin login failed');
            }

            // If admin login is successful, use NextAuth to create a session
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            return { ...result, ...data };
        } catch (error) {
            console.error('Admin login error:', error);
            throw error;
        }
    };

    const register = async (email, password, name) => {
        try {
            // Call the signup API
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Automatically log in after successful registration
            return login(email, password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ 
            user: session?.user || null, 
            login, 
            adminLogin,
            register, 
            logout, 
            loading,
            isAuthenticated: !!session?.user,
            isAdmin: !!session?.user?.isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
