import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // ✅ Use useRouter() instead of useNavigation()
import Toast from "react-native-toast-message";
import useAuthStore from "../../context/authStore"; // Zustand store

export default function HomeScreen() {
  const router = useRouter(); 
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace("/qsign-in");
    }
  }, [user]); // ✅ Runs when `user` changes

  const handleLogout = async () => {
    await logout(); // ✅ Calls Zustand logout function
    Toast.show({ type: "success", text1: "Logged Out", text2: "See you soon!",visibilityTime:1500 });
    router.replace("/qsign-in"); // ✅ Redirect to login
  };

  if (!user) return null; // ✅ Prevent rendering before redirect

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <View className="absolute top-10 right-6">
        <TouchableOpacity onPress={handleLogout} className="bg-red-500 px-4 py-2 rounded-full">
          <Text className="text-white text-lg">Logout</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white text-3xl">
        {user ? `Welcome ${user.phoneNumber}` : "Welcome to Home"}
      </Text>
    </View>
  );
}
