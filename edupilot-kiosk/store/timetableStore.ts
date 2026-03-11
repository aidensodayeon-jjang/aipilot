import { create } from 'zustand';
import { TimetableData } from '@/lib/timetable';

interface TimetableState {
    timetableData: TimetableData;
    isLoading: boolean;
    error: string | null;
    initialize: (data: TimetableData) => void;
    syncWithGoogleSheets: () => Promise<void>;
}

export const useTimetableStore = create<TimetableState>((set, get) => ({
    timetableData: {},
    isLoading: false,
    error: null,
    initialize: (data) => {
        console.log('[TimetableStore] Initializing with data:', data);
        set({ timetableData: data });
    },
    syncWithGoogleSheets: async () => {
        console.log('[TimetableStore] Starting sync with Google Sheets...');
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/sheets', { cache: 'no-store' });
            const result = await response.json();

            if (result.success) {
                console.log('[TimetableStore] Sync successful. Updating data:', result.data);
                set({ timetableData: result.data, isLoading: false });
                alert('Google Sheets와 성공적으로 동기화되었습니다.');
            } else {
                throw new Error(result.error || 'Failed to sync with Google Sheets.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
            console.error('[TimetableStore] Sync error:', errorMessage);
            set({ error: errorMessage, isLoading: false });
            alert(`Error: ${errorMessage}`);
        }
    },
}));
