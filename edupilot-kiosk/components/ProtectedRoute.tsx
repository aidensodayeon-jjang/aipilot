'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, initialized, initialize } = useAuthStore();

    useEffect(() => {
        if (!initialized) {
            initialize();
        }
    }, [initialized, initialize]);

    useEffect(() => {
        if (initialized && !user) {
            router.push('/login');
        }
    }, [user, initialized, router]);

    if (!initialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">인증 확인 중...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    return <>{children}</>;
}
