import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "expo-router";

export default function Qlogout() {
  const router = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Toast.show({ type: "success", text1: "Logged Out", text2: "See you soon!" });

      router.replace("/qsignIn"); // Redirect to login screen after logout
    } catch (error) {
      console.error("❌ Logout Failed:", error);
      Toast.show({ type: "error", text1: "Logout Error", text2: error.message });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      <Text className="text-white text-2xl font-semibold mb-6">Are you sure you want to log out?</Text>

      <TouchableOpacity onPress={handleLogout} className="bg-red-500 rounded-full py-3 w-40 mb-4">
        <Text className="text-white text-lg font-semibold text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
