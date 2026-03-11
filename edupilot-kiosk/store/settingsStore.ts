import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    notificationMode: 'alimtalk_priority' | 'sms_only';
    setNotificationMode: (mode: 'alimtalk_priority' | 'sms_only') => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            notificationMode: 'alimtalk_priority',
            setNotificationMode: (mode) => set({ notificationMode: mode }),
        }),
        {
            name: 'dlab-settings',
        }
    )
);
