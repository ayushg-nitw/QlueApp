import { create } from "zustand";
import auth from "@react-native-firebase/auth";

const useAuthStore = create((set) => ({
  user: null, // Store user details
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await auth().signOut();
      set({ user: null });
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  },
}));

export default useAuthStore;
