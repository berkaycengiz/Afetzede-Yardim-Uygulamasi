import { create } from 'zustand';

interface RememberMe {
  rememberMe: boolean;
  setRememberMe: (status: boolean) => void;
}

export const useRememberMe = create<RememberMe>((set) => ({
  rememberMe: false,
  setRememberMe: (status: boolean) => set({ rememberMe: status }),
}));