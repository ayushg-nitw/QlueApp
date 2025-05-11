import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Changed to match ReferralScreen
import { useRouter } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import useAuthStore from "../../../context/authStore"; // Zustand store
import { images } from "../../../constants";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

var defaultProfileImage =
  "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";

const ProfileScreen = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUsername = async () => {
        try {
          const userDoc = await firestore()
            .collection("users")
            .where("phoneNumber", "==", user.phoneNumber)
            .get();

          if (!userDoc.empty) {
            setUsername(userDoc.docs[0].data().username);
          } else {
            setUsername("User");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsername();
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-black px-5 pt-3">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View className="w-[60px] h-[60px]">
          <Image
            source={images.qlue}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        {/* <Icon name="bell" size={24} color="#fff" /> */}
      </View>

      {/* Profile Info */}
      <View className="mt-10">
        <Text className="text-gray-400 text-lg font-gilroy">Hey there,</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-[35px] font-gilroy">{username}</Text>
        )}
        <Image
          source={{ uri: defaultProfileImage }} // Replace with actual user profile image
          className="w-20 h-20 rounded-full self-end mt-[-20%] border border-white"
        />
      </View>

      {/* Wallet and Referral Earnings */}

      <View className="flex-row justify-between mt-[15%]">
        {/* Referral Earnings Button */}
        <TouchableOpacity
          className="w-[48%]"
          onPress={() => router.push("/referral")}
        >
          <View className="rounded-3xl overflow-hidden relative">
            {/* Gradient Background */}
            <Svg height="180" width="110%">
              <Defs>
                <RadialGradient id="grad" cx="50%" cy="50%" r="70%">
                  <Stop offset="0%" stopColor="#FBB809" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#8B590C" stopOpacity="1" />
                </RadialGradient>
              </Defs>
              <Rect width="110%" height="180" rx="20" fill="url(#grad)" />
            </Svg>

            {/* Content (Icon + Text) */}
            <View className="absolute top-4 left-4 flex-row items-center">
              <Ionicons name="people-outline" size={20} color="white" />
              <Text className="text-white text-md ml-2 font-gilroy">
                Referral Earnings
              </Text>
            </View>

            <View className="absolute bottom-4 left-4">
              <Text className="text-white text-[30px] font-gilroy">
                ₹ 0<Text className="text-[20px] font-gilroy">.00</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Wallet Button */}
        <TouchableOpacity
          className="w-[48%] p-4 h-180 bg-black border border-white rounded-3xl"
          onPress={() => router.push("/wallet")}
        >
          <View className="absolute top-4 left-4 flex-row items-center">
            <Ionicons name="wallet-outline" size={20} color="white" />
            <Text className="text-white text-md ml-2 font-gilroy">Wallet</Text>
          </View>
          <View className="absolute bottom-4 left-4">
            <Text className="text-white text-[30px] font-gilroy">
              ₹ 2800
              <Text className="text-[20px] font-gilroy">.00</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* My Account Section */}
      <View className="flex-row flex-wrap justify-between mt-8 px-2">
        <Text className="font-gilroy text-xl text-white w-[100%] mt-2">
          My account
        </Text>

        <TouchableOpacity className="w-[48%] bg-black p-4 flex-row items-center mb-3 mt-4  rounded-full  border border-white">
          <AntDesign name="shoppingcart" size={20} color="white" />
          <Text className="text-white text-xl ml-2 font-gilroy">Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[48%] bg-black p-4  flex-row items-center mb-3 mt-4 rounded-full border border-white">
          <Ionicons name="flash-outline" size={20} color="white" />
          <Text className="text-white text-xl ml-2 font-gilroy">Buy Again</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[48%] bg-black p-4  flex-row items-center mb-3 rounded-full border border-white">
          <Ionicons name="heart-outline" size={20} color="white" />
          <Text className="text-white text-xl ml-2 font-gilroy">Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[48%] bg-black p-4 flex-row items-center mb-3 rounded-full border border-white">
          <Ionicons name="bag-outline" size={20} color="white" />
          <Text className="text-white text-xl ml-2 font-gilroy">Bag</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
