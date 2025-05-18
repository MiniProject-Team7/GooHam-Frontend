import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      name: "",
      isLoggedIn: false,
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      clear: () => set({ email: null, name: "", isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
