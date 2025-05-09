import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
}));