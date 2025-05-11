import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";

export default function QsignIn() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const { setVerificationId, setUserMobile } = useGlobalContext();

  const sendOTP = async () => {
    if (phoneNumber.length !== 10) {
      Toast.show({
        type: "error",
        text1: "Invalid Phone Number",
        text2: "Enter a valid 10-digit number.",
        visibilityTime: 1500,
      });
      return;
    }
    setIsSendingOTP(true);
    try {
      console.log("📩 Sending OTP to:", `+91${phoneNumber}`);
      let confirmation;

      if (Platform.OS === "android") {
        confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      } else {
        // For iOS, use reCAPTCHA
        const recaptchaVerifier = new auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
        confirmation = await auth().signInWithPhoneNumber(
          `+91${phoneNumber}`,
          recaptchaVerifier
        );
      }

      console.log("✅ Firebase OTP Response:", confirmation.verificationId);
      setVerificationId(confirmation.verificationId);
      setUserMobile(`+91${phoneNumber}`);
      router.replace("qverify");
      Toast.show({
        type: "success",
        text1: "OTP sent",
        text2: "A 6-digit code sent to Your mobile",
        visibilityTime: 1500,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "OTP Error",
        text2: error.message,
        visibilityTime: 2000,
      });
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <SafeAreaView className="w-full flex-1 bg-black justify-center px-6">
      <View className="flex mt-[-50%]">
        <Text className="text-white mb-6 font-gilroy text-5xl">
          Enter your mobile
        </Text>

        <View className="border border-gray-500 rounded-full flex-row items-center px-4 py-2 mb-6">
          <Text className="text-white text-xl font-gilroy mr-2">+91 |</Text>

          {/* Conditionally Render Different Inputs */}
          {phoneNumber.length > 0 ? (
            <TextInput
              className="flex-1 w-full h-[40px] text-white text-xl px-2 py-2 font-gilroy tracking-[3px]"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          ) : (
            <TextInput
              className="flex-1 w-full h-[40px] text-white text-xl px-2 py-2 font-gilroy"
              keyboardType="phone-pad"
              maxLength={10}
              placeholder="Enter your phone number"
              placeholderTextColor="#888"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          )}
        </View>

        <TouchableOpacity onPress={sendOTP} disabled={isSendingOTP}>
          <View className="rounded-full overflow-hidden">
            <Svg height="50" width="100%">
              <Defs>
                <RadialGradient id="grad" cx="50%" cy="50%" r="70%">
                  <Stop offset="0%" stopColor="#FBB809" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#8B590C" stopOpacity="1" />
                </RadialGradient>
              </Defs>
              <Rect width="100%" height="50" fill="url(#grad)" />
            </Svg>
          </View>
          <View className="absolute w-full h-full justify-center items-center">
            <Text className="text-white text-lg font-gilroy text-bold">
              {isSendingOTP ? "Sending..." : "Continue"}
            </Text>
          </View>
        </TouchableOpacity>

        <Text className="text-gray-400 relative right-[-38%] mt-3 mx-1 font-gilroy text-sm">
          *Standard text rates may apply
        </Text>
      </View>

      <View id="recaptcha-container" />

      {/* Loading Overlay when Sending OTP */}
      {isSendingOTP && (
        <Modal transparent={true} animationType="fade">
          <View className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
            <ActivityIndicator size="large" color="#FBB809" />
            <Text className="text-white text-lg mt-4">Sending OTP...</Text>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
