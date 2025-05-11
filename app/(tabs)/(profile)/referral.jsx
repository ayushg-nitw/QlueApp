import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import backbutton from "../../../assets/images/backbutton.png";

const ReferralScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black px-5">
      {/* Header */}
      <View className="flex-row items-center justify-between my-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backbutton} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-gilroy">REFERRALS</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      {/* Referral Earnings Box */}
      <View className="h-[15vh] border border-white border-[0.5px] rounded-3xl p-5 mt-4">
        <Text className="text-white text-lg font-gilroy">
          Referral earnings
        </Text>
        <Text className="text-white text-[35px] font-gilroy mt-2">₹2,000</Text>
      </View>

      {/* Refer & Earn Section */}
      <View className="mt-6">
        <View className="rounded-3xl overflow-hidden">
          <Svg height="230" width="100%">
            <Defs>
              <RadialGradient id="grad" cx="50%" cy="50%" r="70%">
                <Stop offset="0%" stopColor="#FBB809" stopOpacity="1" />
                <Stop offset="100%" stopColor="#8B590C" stopOpacity="1" />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="230" fill="url(#grad)" />
          </Svg>
        </View>

        <View className="absolute w-full mt-3 justify-center px-5">
          <Text className="text-white text-[40px] font-gilroy">
            Refer & Earn
          </Text>
          <View>
            <Text className="text-white text-md mt-2 font-gilroy">
              Ask your friends to use this code while signing up & earn up to{" "}
              <Text className="font-bold">₹500</Text>
            </Text>
          </View>

          {/* Referral Code and Share Button */}
          <View className="mt-[20%] flex-row items-start">
            <View className="w-[50vw] flex-row items-end bg-black/15 p-3 rounded-full justify-between">
              <Text className="text-white text-lg pl-4 font-gilroy">
                2101772
              </Text>
              <TouchableOpacity>
                <Ionicons name="copy-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="w-[25vw] h-full bg-black px-4 py-2 rounded-3xl ml-4">
              <Text className="text-white font-gilroy text-center mt-2">
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Users Referred */}
      <View>
        <Text className="text-white text-lg font-gilroy mt-7 ml-2">Users</Text>
      </View>
      <ScrollView>
        {[
          {
            name: "Jason Dan",
            amount: "+ ₹500",
            image:
              "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?q=80&w=2070&auto=format&fit=crop",
          },
          {
            name: "Humayun Mirza",
            amount: "+ ₹500",
            image:
              "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
          },
          {
            name: "Humayun Mirza",
            amount: "+ ₹500",
            image:
              "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?q=80&w=2070&auto=format&fit=crop",
          },
          {
            name: "Ayush Gupta",
            amount: "+ ₹500",
            image:
              "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
          },
        ].map((user, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between bg-transparent p-3 rounded-lg mt-2"
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: user.image }}
                className="w-12 h-12 rounded-full border border-white"
              />
              <Text className="text-white text-lg ml-3 font-gilroy">
                {user.name}
              </Text>
            </View>
            <Text className="text-green-400 font-gilroy">{user.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferralScreen;
