import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
  setEmail: (email: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      isLoggedIn: false,
      setEmail: (email) => set({ email }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      clear: () => set({ email: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
