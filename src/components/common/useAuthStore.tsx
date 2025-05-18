import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
  userId: number | null;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  setUserId: (id: number) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      name: "",
      isLoggedIn: false,
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      clear: () => set({ email: null, name: "", isLoggedIn: false }),
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: "auth-storage",
    }
  )
);
