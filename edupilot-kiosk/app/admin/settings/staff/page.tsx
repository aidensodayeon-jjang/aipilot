'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';
import { UserPlus, Trash2, Shield, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function StaffManagementPage() {
    const { profile: currentUser } = useAuthStore();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        role: 'staff' as 'admin' | 'staff',
    });

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProfiles(data || []);
        } catch (err) {
            console.warn('Error fetching profiles (using mock data for dev):', err);
            // Fallback mock data for development
            setProfiles([
                {
                    id: 'demo-user-id',
                    full_name: 'Master Admin (Demo)',
                    role: 'admin',
                    created_at: new Date().toISOString(),
                },
                {
                    id: 'staff-1',
                    full_name: '김선생',
                    role: 'staff',
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStaff = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Create auth user using Supabase Admin API
            // Note: This requires admin privileges
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.full_name,
                    },
                },
            });

            if (authError) throw authError;

            if (authData.user) {
                // Insert profile
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        full_name: formData.full_name,
                        role: formData.role,
                    });

                if (profileError) throw profileError;

                setSuccess('스태프가 성공적으로 추가되었습니다.');
                setShowAddModal(false);
                setFormData({ email: '', password: '', full_name: '', role: 'staff' });
                fetchProfiles();
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || '스태프 추가에 실패했습니다.');
            } else {
                setError('스태프 추가에 실패했습니다.');
            }
        }
    };

    const handleDeleteStaff = async (id: string) => {
        if (!confirm('정말로 이 스태프를 삭제하시겠습니까?')) return;

        try {
            // Note: Deleting from profiles will cascade delete from auth.users
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setSuccess('스태프가 삭제되었습니다.');
            fetchProfiles();
        } catch (err) {
            console.error('Error deleting staff:', err);
            setError('스태프 삭제에 실패했습니다.');
        }
    };

    if (currentUser?.role !== 'admin') {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <div>
                        <h3 className="font-semibold text-red-900">접근 권한 없음</h3>
                        <p className="text-sm text-red-700 mt-1">
                            이 페이지는 마스터 관리자만 접근할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">스태프 관리</h1>
                    <p className="text-gray-600 mt-1">관리자 및 스태프 계정을 관리합니다.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                    <UserPlus className="w-5 h-5" />
                    <span>스태프 추가</span>
                </button>
            </div>

            {/* Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-red-800 font-medium">오류</p>
                        <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-green-800 font-medium">성공</p>
                        <p className="text-sm text-green-600 mt-1">{success}</p>
                    </div>
                </div>
            )}

            {/* Staff List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    이름
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    역할
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    생성일
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    작업
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        로딩 중...
                                    </td>
                                </tr>
                            ) : profiles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        등록된 스태프가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                profiles.map((profile) => (
                                    <tr key={profile.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {profile.full_name[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{profile.full_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${profile.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}
                                            >
                                                {profile.role === 'admin' ? (
                                                    <>
                                                        <Shield className="w-3 h-3" />
                                                        마스터 관리자
                                                    </>
                                                ) : (
                                                    <>
                                                        <User className="w-3 h-3" />
                                                        스태프
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(profile.created_at).toLocaleDateString('ko-KR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            {profile.id !== currentUser?.id && (
                                                <button
                                                    onClick={() => handleDeleteStaff(profile.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Staff Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">스태프 추가</h2>
                        <form onSubmit={handleAddStaff} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    이름
                                </label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="홍길동"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    이메일
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="staff@dlab.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    비밀번호
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="최소 6자 이상"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    역할
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'staff' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                >
                                    <option value="staff">스태프</option>
                                    <option value="admin">마스터 관리자</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setFormData({ email: '', password: '', full_name: '', role: 'staff' });
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                                >
                                    추가
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
