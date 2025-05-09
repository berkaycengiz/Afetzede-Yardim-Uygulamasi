import { create } from "zustand";

interface LoginState {
  nickname: string | null;
  email: string | null;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  clearNickname: () => void;
  clearEmail: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  nickname: "",
  email: "",
  setNickname: (nickname) => {
    localStorage.setItem('nickname', nickname);
    set({ nickname });
  },
  setEmail: (email) => {
    localStorage.setItem('email', email);
    set({ email });
  },
  clearNickname: () => {
    localStorage.removeItem('nickname');
    set({ nickname: null });
  },
  clearEmail: () => {
    localStorage.removeItem('email');
    set({ email: null });
  }
}));

