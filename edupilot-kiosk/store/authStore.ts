import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';
import { User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    initialized: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    profile: null,
    loading: false,
    initialized: false,

    initialize: async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Fetch profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                set({ user: session.user, profile: profile || null, initialized: true });
            } else {
                set({ user: null, profile: null, initialized: true });
            }

            // Listen for auth changes
            supabase.auth.onAuthStateChange(async (event, session) => {
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    set({ user: session.user, profile: profile || null });
                } else {
                    set({ user: null, profile: null });
                }
            });
        } catch (error) {
            console.error('Auth initialization error:', error);
            set({ initialized: true });
        }
    },

    signIn: async (email: string, password: string) => {
        set({ loading: true });
        try {
            // 1. Try real Supabase login first
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                // 2. Fallback: Check for Demo/Dev mode if Supabase fails
                // This allows testing without setting up a real backend
                if (email === 'admin@dlab.com' && password === 'pass1234') {
                    console.log('⚡️ Dev Mode: Logging in with demo account');

                    // Create mock user and profile
                    const mockUser = {
                        id: 'demo-user-id',
                        email: 'admin@dlab.com',
                        aud: 'authenticated',
                        created_at: new Date().toISOString(),
                        app_metadata: {},
                        user_metadata: {},
                    } as User;

                    const mockProfile: Profile = {
                        id: 'demo-user-id',
                        full_name: 'Master Admin (Demo)',
                        role: 'admin',
                        created_at: new Date().toISOString(),
                    };

                    // Simulate network delay
                    await new Promise(resolve => setTimeout(resolve, 500));

                    set({ user: mockUser, profile: mockProfile, loading: false });
                    return; // Login success
                }

                throw error; // Throw original error if not demo account
            }

            if (data.user) {
                // Fetch profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                set({ user: data.user, profile: profile || null, loading: false });
            }
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    signOut: async () => {
        set({ loading: true });
        try {
            await supabase.auth.signOut();
            set({ user: null, profile: null, loading: false });
        } catch (error) {
            // Even if Supabase signout fails (e.g. in dev mode), clear local state
            console.warn('Sign out error (ignoring in dev mode):', error);
            set({ user: null, profile: null, loading: false });
        }
    },
}));
