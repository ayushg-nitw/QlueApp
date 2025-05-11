import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Info, AlertCircle, RefreshCcw, Trash2 } from "lucide-react-native";
import { ToastConfigParams } from "react-native-toast-message";

const ToastConfig = {
  success: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View className="bg-[#1C1C1E] flex-row items-center p-4 rounded-lg border-l-4 border-green-500 shadow-lg w-[90%] self-center my-2">
      <CheckCircle color="green" size={24} />
      <View className="ml-3 flex-1">
        {text1 && <Text className="text-white text-base font-bold">{text1}</Text>}
        {text2 && <Text className="text-gray-400 text-sm">{text2}</Text>}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View className="bg-[#1C1C1E] flex-row items-center p-4 rounded-lg border-l-4 border-red-500 shadow-lg w-[90%] self-center my-2">
      <AlertCircle color="red" size={24} />
      <View className="ml-3 flex-1">
        {text1 && <Text className="text-white text-base font-bold">{text1}</Text>}
        {text2 && <Text className="text-gray-400 text-sm">{text2}</Text>}
      </View>
    </View>
  ),

  info: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View className="bg-[#1C1C1E] flex-row items-center p-4 rounded-lg border-l-4 border-blue-500 shadow-lg w-[90%] self-center my-2">
      <Info color="blue" size={24} />
      <View className="ml-3 flex-1">
        {text1 && <Text className="text-white text-base font-bold">{text1}</Text>}
        {text2 && <Text className="text-gray-400 text-sm">{text2}</Text>}
      </View>
    </View>
  ),

  update: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View className="bg-[#1C1C1E] flex-row items-center p-4 rounded-lg border-l-4 border-yellow-500 shadow-lg w-[90%] self-center my-2">
      <RefreshCcw color="yellow" size={24} />
      <View className="ml-3 flex-1">
        {text1 && <Text className="text-white text-base font-bold">{text1}</Text>}
        {text2 && <Text className="text-gray-400 text-sm">{text2}</Text>}
      </View>
      <TouchableOpacity className="ml-auto px-4 py-1 bg-blue-600 rounded-md">
        <Text className="text-white">Install</Text>
      </TouchableOpacity>
    </View>
  ),

  delete: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View className="bg-[#1C1C1E] flex-row items-center p-4 rounded-lg border-l-4 border-orange-500 shadow-lg w-[90%] self-center my-2">
      <Trash2 color="orange" size={24} />
      <View className="ml-3 flex-1">
        {text1 && <Text className="text-white text-base font-bold">{text1}</Text>}
        {text2 && <Text className="text-gray-400 text-sm">{text2}</Text>}
      </View>
      <TouchableOpacity className="ml-auto px-4 py-1 bg-gray-700 rounded-md">
        <Text className="text-white">Restore</Text>
      </TouchableOpacity>
    </View>
  ),
};

export default ToastConfig;
