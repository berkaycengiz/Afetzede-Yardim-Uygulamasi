import { create } from "zustand";

interface LoginState {
  firstName: string | null;
  lastName: string | null;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  clearFirstName: () => void;
  clearLastName: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (firstName) => {
    localStorage.setItem('firstName', firstName);
    set({ firstName });
  },
  setLastName: (lastName) => {
    localStorage.setItem('lastName', lastName);
    set({ lastName });
  },
  clearFirstName: () => {
    localStorage.removeItem('firstName');
    set({ firstName: null });
  },
  clearLastName: () => {
    localStorage.removeItem('lastName');
    set({ lastName: null });
  }
}));

