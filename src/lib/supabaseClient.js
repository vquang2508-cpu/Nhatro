import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url';

if (!isConfigured) {
    console.warn('Supabase credentials missing! Please check your .env.local file.');
}

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => ({ eq: () => ({ single: () => ({ data: null, error: 'Missing Config' }), order: () => ({ data: [], error: 'Missing Config' }) }) }),
            update: () => ({ eq: () => ({ error: 'Missing Config' }) })
        }),
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Missing Config' } }),
            signOut: () => Promise.resolve({ error: null })
        }
    };
