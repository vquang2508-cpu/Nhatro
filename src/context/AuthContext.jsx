import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const isCheckingSession = useRef(false);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        // Check active session with abort capability
        const getSession = async () => {
            // Prevent multiple simultaneous session checks
            if (isCheckingSession.current) {
                console.log('Session check already in progress, skipping...');
                return;
            }

            isCheckingSession.current = true;

            try {
                console.log('Checking session...');
                const startTime = Date.now();

                // Create abort controller for this session check
                abortControllerRef.current = new AbortController();
                const signal = abortControllerRef.current.signal;

                // Set timeout to abort after 30 seconds
                const timeoutId = setTimeout(() => {
                    if (abortControllerRef.current) {
                        console.warn('Session check timeout after 30s - aborting request');
                        abortControllerRef.current.abort();
                    }
                }, 30000);

                let session = null;
                let error = null;

                try {
                    // Note: Supabase client doesn't support AbortSignal directly,
                    // but we can still use it to track if we should ignore the result
                    const result = await supabase.auth.getSession();

                    // Check if aborted before processing result
                    if (signal.aborted) {
                        console.log('Session check was aborted, ignoring result');
                        clearTimeout(timeoutId);
                        return;
                    }

                    session = result.data?.session;
                    error = result.error;
                } catch (err) {
                    error = err;
                } finally {
                    clearTimeout(timeoutId);
                }

                const endTime = Date.now();
                const duration = endTime - startTime;

                if (duration > 5000) {
                    console.warn(`Session check took ${duration}ms - connection may be slow`);
                }

                // Only update state if component is still mounted and not aborted
                if (!mounted || signal.aborted) {
                    console.log('Component unmounted or aborted, skipping state update');
                    return;
                }

                if (error) {
                    console.error('Session check error:', error);
                    setUser(null);
                    setRole(null);
                    return;
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
                if (mounted) {
                    setUser(null);
                    setRole(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
                isCheckingSession.current = false;
            }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!mounted) return;

            console.log('Auth state changed:', _event, session?.user?.email);

            // Don't update state if we're currently checking session
            if (isCheckingSession.current) {
                console.log('Session check in progress, deferring auth state change');
                return;
            }

            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchUserRole(session.user.id);
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => {
            mounted = false;
            // Abort any pending session check
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            subscription.unsubscribe();
        };
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
