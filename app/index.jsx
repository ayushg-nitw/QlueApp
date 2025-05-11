import { View, Animated, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "../components/SplashScreen";
import { StatusBar } from "expo-status-bar";
import useAuthStore from "@/context/authStore";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function Index() {
  const strokeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthChecked(true);

      // Wait for 2 seconds before navigating
      setTimeout(() => {
        router.replace(user ? "/(tabs)/home" : "/(auth)/qsign-in");
      }, 2000);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(strokeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  if (!isAuthChecked) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#FBB809" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full flex justify-center items-center">
      {/* Show SplashScreen for 2 seconds before navigating */}
      <SplashScreen />
      <StatusBar backgroundColor="#000000" style="light" />
    </SafeAreaView>
  );
}
