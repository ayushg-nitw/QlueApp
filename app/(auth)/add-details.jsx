import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import useAuthStore from "../../context/authStore";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";


export default function AddDetails() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameCheckTrigger, setUsernameCheckTrigger] = useState("");

  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // Function to validate username rules
  const validateUsername = useCallback((text) => {
    setUsername(text);

    if (text.length < 6) {
      setValidationMessage("Qlue: Username must be at least 6 characters");
      setUsernameAvailable(null);
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(text)) {
      setValidationMessage("Qlue: Only letters, numbers, and underscores allowed");
      setUsernameAvailable(null);
      return false;
    }
    if (text.includes(" ")) {
      setValidationMessage("Qlue: Username cannot contain spaces");
      setUsernameAvailable(null);
      return false;
    }
    if (!/^[a-zA-Z]/.test(text)) {
      setValidationMessage("Qlue: Username must start with a letter");
      setUsernameAvailable(null);
      return false;
    }
    if (/__/.test(text)) {
      setValidationMessage("Qlue: Avoid multiple underscores in a row");
      setUsernameAvailable(null);
      return false;
    }
    if (/^\d+$/.test(text)) {
      setValidationMessage("Qlue: Username cannot be only numbers");
      setUsernameAvailable(null);
      return false;
    }

    setValidationMessage("");
    setUsernameCheckTrigger(text);
    return true;
  }, []);

  // Debounced username availability check
  useEffect(() => {
    if (!usernameCheckTrigger) return;

    const checkAvailability = async () => {
      setCheckingUsername(true);
      const snapshot = await firestore()
        .collection("users")
        .where("username", "==", usernameCheckTrigger)
        .get();

      setUsernameAvailable(snapshot.empty);
      setCheckingUsername(false);
    };

    const debounceTimeout = setTimeout(checkAvailability, 500);
    return () => clearTimeout(debounceTimeout);
  }, [usernameCheckTrigger]);

  // Function to save details
  const handleSaveDetails = async () => {
    if (!fullName || !username) {
      Toast.show({ type: "error", text1: "Please fill all details", text2: "All fields are required.",visibilityTime:1500 });
      return;
    }
    if (!usernameAvailable) {
      Toast.show({ type: "error", text1: "Username not available", text2: "Please choose another username.",visibilityTime:1500 });
      return;
    }

    try {
      setLoading(true);

      await firestore().collection("users").doc(user.uid).set({
        fullName,
        username,
        phoneNumber: user.phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      
      router.replace("/home");
      setTimeout(()=>{
        Toast.show({ type: "success", text1: "Success", text2: "Profile updated!" ,visibilityTime:1500})
      }
      ,500)
     
    } catch (error) {
      Toast.show({ type: "error", text1: "Error", text2: "Could not save details.",visibilityTime:1500 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black justify-center px-6">
      <Text className="text-white mb-6 font-gilroy text-5xl mt-[-40%]">Add your details</Text>

      {/* Full Name Input */}
      <View className="border border-gray-500 rounded-full p-4 flex-row items-center mb-4">
        <Text className="text-yellow-500 text-lg mr-3 font-gilroy">👤</Text>
        <TextInput
          placeholder="Full name"
          placeholderTextColor="gray"
          onChangeText={setFullName}
          className="text-white flex-1 text-lg font-gilroy"
        />
      </View>

      {/* Username Input */}
      <View className="border border-gray-500 rounded-full p-4 flex-row items-center">
        <Text className="text-white text-lg mr-3 font-gilroy">@</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="gray"
          onChangeText={validateUsername}
          className="text-white flex-1 text-lg font-gilroy"
        />
      </View>

      {/* Username Validation Message */}
      {validationMessage ? (
        <Text className="text-yellow-500 text-[12px] mt-2 mx-2 font-gilroy">{validationMessage}</Text>
      ) : null}

      {/* Username Availability Indicator */}
      {username.length >= 6 && (
        <Text className={`text-sm mt-1 font-gilroy mx-2 ${usernameAvailable ? "text-green-500" : "text-red-500"}`}>
          {checkingUsername ? "Checking..." : usernameAvailable ? "✔ Available" : "✖ Not Available"}
        </Text>
      )}

      {/* Terms & Conditions */}
      <Text className="text-gray-400 text-sm text-center mb-4 mt-3 font-gilroy">
        By clicking Continue, I agree to "Qlueless" Terms of Service and acknowledge the Privacy Policy.
      </Text>

      {/* Continue Button */}
      <TouchableOpacity onPress={handleSaveDetails} disabled={loading} className="mb-6">
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
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text className="text-black text-lg font-semibold">Continue</Text>
          )}
        </View>
      </TouchableOpacity>
 
    </SafeAreaView>
  );
}
