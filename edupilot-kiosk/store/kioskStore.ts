import { create } from 'zustand';
import { Student } from '@/types';

interface KioskState {
    input: string;
    setInput: (input: string) => void;
    appendInput: (char: string) => void;
    deleteInput: () => void;
    resetInput: () => void;

    matchedStudents: Student[];
    setMatchedStudents: (students: Student[]) => void;

    selectedStudent: Student | null;
    setSelectedStudent: (student: Student | null) => void;

    status: 'idle' | 'searching' | 'selection' | 'success' | 'error';
    setStatus: (status: 'idle' | 'searching' | 'selection' | 'success' | 'error') => void;

    message: string;
    setMessage: (msg: string) => void;
}

export const useKioskStore = create<KioskState>((set) => ({
    input: '',
    setInput: (input) => set({ input }),
    appendInput: (char) => set((state) => {
        if (state.input.length >= 4) return state;
        return { input: state.input + char };
    }),
    deleteInput: () => set((state) => ({ input: state.input.slice(0, -1) })),
    resetInput: () => set({ input: '' }),

    matchedStudents: [],
    setMatchedStudents: (matchedStudents) => set({ matchedStudents }),

    selectedStudent: null,
    setSelectedStudent: (selectedStudent) => set({ selectedStudent }),

    status: 'idle',
    setStatus: (status) => set({ status }),

    message: '',
    setMessage: (message) => set({ message }),
}));
