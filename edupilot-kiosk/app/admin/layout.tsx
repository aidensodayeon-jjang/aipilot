'use client';

import Link from 'next/link';
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { profile, signOut } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-dlab-blue">D-LAB Admin</h1>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-dlab-blue rounded-lg transition-colors">
                            <LayoutDashboard size={20} />
                            <span>대시보드</span>
                        </Link>
                        <Link href="/admin/schedule" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-dlab-blue rounded-lg transition-colors">
                            <Calendar size={20} />
                            <span>시간표</span>
                        </Link>
                        <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-dlab-blue rounded-lg transition-colors">
                            <Users size={20} />
                            <span>수강생 관리</span>
                        </Link>
                        <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-dlab-blue rounded-lg transition-colors">
                            <Settings size={20} />
                            <span>설정</span>
                        </Link>
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full transition-colors"
                        >
                            <LogOut size={20} />
                            <span>로그아웃</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
                        <h2 className="text-lg font-medium text-gray-800">관리자 대시보드</h2>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                {profile?.full_name || 'Admin User'}
                                <span className="ml-2 text-xs text-gray-400">
                                    ({profile?.role === 'admin' ? '마스터 관리자' : '스태프'})
                                </span>
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {profile?.full_name?.[0] || 'A'}
                            </div>
                        </div>
                    </header>
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
