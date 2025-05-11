import React from "react";
import { SplashScreen, Stack } from "expo-router";
import "../../../global.css";
import GlobalProvider from "../../../context/GlobalProvider";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const ProfileLayout = () => {
  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          animation: "fade",
          presentation: "transparentModal",
          contentStyle: { backgroundColor: "#000000" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="referral" options={{ headerShown: false }} />
        <Stack.Screen name="wallet" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#000000" style="light" />
    </GlobalProvider>
  );
};

export default ProfileLayout;
