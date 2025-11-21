import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            try {
                console.log('Checking session...');
                const startTime = Date.now();

                // Add timeout that returns null session instead of throwing error
                const timeoutPromise = new Promise((resolve) =>
                    setTimeout(() => {
                        console.warn('Session check timeout after 15s - continuing as logged out');
                        resolve({ data: { session: null }, error: null });
                    }, 15000)
                );

                const { data: { session }, error } = await Promise.race([
                    supabase.auth.getSession(),
                    timeoutPromise
                ]);

                const endTime = Date.now();
                const duration = endTime - startTime;

                if (duration > 5000) {
                    console.warn(`Session check took ${duration}ms - connection may be slow`);
                }

                if (error) {
                    console.error('Session check error:', error);
                    throw error;
                }

                if (session?.user) {
                    console.log('Session found for user:', session.user.email);
                    setUser(session.user);
                    await fetchUserRole(session.user.id);
                } else {
                    console.log('No active session found');
                    setUser(null);
                    setRole(null);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                // If session check fails, continue as logged out user
                // This allows the app to continue working even if session check fails
                setUser(null);
                setRole(null);
            } finally {
                // ALWAYS set loading to false, even if there's an error
                setLoading(false);
            }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchUserRole(session.user.id);
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserRole = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            if (data) {
                setRole(data.role);
            }
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    const register = async (email, password, fullName, dob, phone) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    dob: dob,
                    phone_number: phone,
                    role: 'user', // Default role
                },
            },
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setRole(null);
    };

    console.log('AuthContext render. Loading:', loading, 'User:', user?.email);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-blue-600 font-medium">Đang tải dữ liệu đăng nhập...</span>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, role, login, register, logout, loading, isAdmin: role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
