import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { AnalysisResult } from '../services/ai';

interface PrescriptionHistory extends AnalysisResult {
  id: string;
  createdAt: string;
}

interface PrescriptionState {
  history: PrescriptionHistory[];
  addPrescription: (prescription: AnalysisResult) => void;
  removePrescription: (id: string) => void;
  clearHistory: () => void;
}

const secureStorage = {
  getItem: (name: string) => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

export const usePrescriptionStore = create<PrescriptionState>()(
  persist(
    (set) => ({
      history: [],
      addPrescription: (prescription) => set((state) => ({
        history: [
          {
            ...prescription,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString(),
          },
          ...state.history,
        ],
      })),
      removePrescription: (id) => set((state) => ({
        history: state.history.filter((p) => p.id !== id),
      })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'sumpyo-prescription-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
