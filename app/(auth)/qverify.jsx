import React, { useState, useRef,useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter} from "expo-router";
import auth from "@react-native-firebase/auth";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAuthStore from "../../context/authStore";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";


export default function Qverify() {

  const router = useRouter();

  const { setVerificationId,verificationId ,userMobile} = useGlobalContext();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    if (isNaN(text)) return; 

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (key, index) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const confirmOtp = async () => {

    const enteredOtp = otp.join("");
  
    if (enteredOtp.length !== 6) {
      console.log("I am here");
      setIsVerifying(false); // Ensure modal is hidden
      setTimeout(() => {
        Toast.show({ type: "error", text1: "Invalid OTP", text2: "Enter a 6-digit OTP",visibilityTime:1500 });
      }, 100); // Delay ensures modal disappears first
      return;
    }
  
    if (!verificationId) {
      setIsVerifying(false);
      setTimeout(() => {
        Toast.show({ type: "error", text1: "Error", text2: "Verification ID not found. Try again." });
      }, 100);
      return;
    }
  
    try {
      setIsVerifying(true);
      const credential = auth.PhoneAuthProvider.credential(verificationId, enteredOtp);
      const userCredential = await auth().signInWithCredential(credential);
      const user = userCredential.user;
  
      useAuthStore.getState().setUser(user);
      const userDoc = await firestore().collection("users").doc(user.uid).get();
  
      if (userDoc.exists) {

        setIsVerifying(false);

        setTimeout(() => {
          Toast.show({ type: "success", text1: "Welcome Back!", text2: "Feeling Qlueless ? Not now.",visibilityTime:1500 });
        }, 100);

        router.replace("/home");
      } else {
        setIsVerifying(false);
        setTimeout(() => {
          Toast.show({ type: "info", text1: "Complete Your Profile", text2: "Redirecting to setup.",visibilityTime:1500 });
        }, 100);
        router.replace("/add-details");
      }
    } catch (error) {
      setIsVerifying(false);
      setTimeout(() => {
        Toast.show({ type: "error", text1: "OTP Error", text2: "Incorrect OTP. Please try again." });
      }, 100);
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0].focus();
    }
  };
  
  const handleResendOTP = async () => {
    if (isResending) return;
    setIsResending(true);
  
    try {
      const phoneNumber = userMobile;
      if (!phoneNumber) {
        setIsResending(false);
        setTimeout(() => {
          Toast.show({ type: "error", text1: "Error", text2: "Phone number not found." });
        }, 100);
        return;
      }
  
      console.log("📩 Resending OTP to:", phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0].focus();
    } catch (error) {
      setIsResending(false);
      setTimeout(() => {
        Toast.show({ type: "error", text1: "Resend Failed", text2: "Could not resend OTP." });
      }, 100);
    } finally {
      setIsResending(false);
      console.log("Sent the otp");
      setTimeout(() => {
        Toast.show({ type: "success", text1: "OTP Resent", text2: "Check your SMS." });
      }, 100);
    }
  };

  return (
    <SafeAreaView className="w-full flex-1 bg-black justify-center px-4 mt-[-50%]">
      <Text className="text-white mb-6 font-gilroy text-5xl">Enter OTP</Text>
      <Text className="text-gray-300 mb-6 mt-[-5%] mx-1 font-gilroy text-sm">Type the 6-digit code sent to your mobile</Text>

      {/* OTP Input Boxes */}
      <View className="flex-row justify-between mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            className="border border-gray-500 text-white text-2xl font-gilroy text-center w-12 h-12 mx-2 rounded-md"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity onPress={confirmOtp} disabled={isVerifying}>
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
          <Text className="text-black text-lg font-semibold">
            Verify
          </Text>
        </View>
      </TouchableOpacity>

      <Text className="text-gray-300 relative right-[-40%] mt-3 mx-1 font-gilroy text-sm">
        Didn’t receive the code?{" "}
        <TouchableOpacity onPress={handleResendOTP} disabled={isResending}>
          <Text className={`${!isResending? 'text-blue-300':'text-white-200'} mt-1 text-sm text-underline font-gilroy`}>
            Resend
          </Text>
        </TouchableOpacity>
      </Text>

      {/* Overlay for OTP Verification */}
      {isVerifying && (
        <Modal transparent={true} animationType="fade">
          <View className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
            <ActivityIndicator size="large" color="#FBB809" />
            <Text className="text-white text-lg mt-4">Verifying OTP...</Text>
          </View>
        </Modal>
      )}

      {/* Overlay for Resending OTP */}
      {isResending && (
        <Modal transparent={true} animationType="fade">
          <View className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
            <ActivityIndicator size="large" color="#FBB809" />
            <Text className="text-white text-lg mt-4">Resending OTP...</Text>
          </View>
        </Modal>
      )}

 

    </SafeAreaView>
  );
}
