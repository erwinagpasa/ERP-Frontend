import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  userEmail: string;
  removeAllEmail: () => void;
  updateEmail: (newEmail: string) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userEmail: '',
        removeAllEmail: () => set({ userEmail: '' }),
        updateEmail: (newEmail: string) => set({ userEmail: newEmail }),
      }),
      {
        name: 'user-storage', // Name for persisted state in localStorage
        partialize: (state) => ({ userEmail: state.userEmail }), // Save only the `userEmail` field
      }
    ),
    { name: 'UserStore' } // Optional name for the Redux DevTools instance
  )
);

export default useUserStore;
