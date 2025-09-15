import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SurveyState } from '../types/survey';
import { createJSONStorage } from 'zustand/middleware';

const initialUser = { name: '', age: '', job: '' };

const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      step: 'user',
      currentQuestion: 0,
      user: initialUser,
      answer: {},
      timeLeft: 1 * 60,

      setStep: (step) => set({ step }),

      setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),

      setUser: (data) => set({ user: data }),

      setAnswer: (key, value) =>
        set((state) => ({
          answer: { ...state.answer, [key]: value },
        })),
      setTimeLeft: (timeLeft: number) => set({ timeLeft }),

      resetAll: () =>
        set({
          step: 'user',
          currentQuestion: 0,
          user: initialUser,
          answer: {},
          timeLeft: 1 * 60,
        }),
    }),
    {
      name: 'survey-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        step: state.step,
        currentQuestion: state.currentQuestion,
        user: state.user,
        answer: state.answer,
        timeLeft: state.timeLeft,
      }),
    }
  )
);
export default useSurveyStore;
