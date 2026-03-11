'use client';

import { useTimetableStore } from '@/store/timetableStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { MessageSquare, Smartphone, Users, Shield, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    const { syncWithGoogleSheets, isLoading } = useTimetableStore();
    const { notificationMode, setNotificationMode } = useSettingsStore();
    const { profile } = useAuthStore();

    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">설정 (Settings)</h1>
                <p className="text-gray-600">시스템 설정 및 관리자 계정을 관리합니다.</p>
            </div>

            {/* Quick Access Cards */}
            {profile?.role === 'admin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/admin/settings/staff">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">스태프 관리</h3>
                                    <p className="text-sm text-indigo-100">관리자 계정 추가 및 관리</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">마스터 관리자</h3>
                                <p className="text-sm text-blue-100">전체 시스템 권한 보유</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Settings */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">알림 발송 설정</h2>
                    <p className="text-sm text-gray-500">학부모님께 발송되는 등원 알림 방식을 설정합니다.</p>
                </div>

                <div className="p-6 space-y-4">
                    <div
                        onClick={() => setNotificationMode('alimtalk_priority')}
                        className={`
              flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
              ${notificationMode === 'alimtalk_priority' ? 'border-dlab-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${notificationMode === 'alimtalk_priority' ? 'bg-dlab-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">알림톡 우선 발송 (권장)</p>
                                <p className="text-sm text-gray-500">카카오 알림톡을 먼저 시도하고, 실패 시 문자로 발송합니다.</p>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${notificationMode === 'alimtalk_priority' ? 'border-dlab-blue' : 'border-gray-300'}`}>
                            {notificationMode === 'alimtalk_priority' && <div className="w-3 h-3 rounded-full bg-dlab-blue" />}
                        </div>
                    </div>

                    <div
                        onClick={() => setNotificationMode('sms_only')}
                        className={`
              flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
              ${notificationMode === 'sms_only' ? 'border-dlab-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${notificationMode === 'sms_only' ? 'bg-dlab-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <Smartphone size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">문자(SMS) 전용</p>
                                <p className="text-sm text-gray-500">알림톡 시도 없이 바로 문자로 발송합니다.</p>
                            </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${notificationMode === 'sms_only' ? 'border-dlab-blue' : 'border-gray-300'}`}>
                            {notificationMode === 'sms_only' && <div className="w-3 h-3 rounded-full bg-dlab-blue" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Management Settings */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">데이터 동기화</h2>
                    <p className="text-sm text-gray-500">Google Sheets의 최신 데이터를 가져와 시간표를 업데이트합니다.</p>
                </div>

                <div className="p-6">
                    <button
                        onClick={syncWithGoogleSheets}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                <span>동기화 중...</span>
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-5 h-5" />
                                <span>Google Sheets와 동기화</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
