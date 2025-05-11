import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'   
import Toast from 'react-native-toast-message'


const AuthLayout = () => {
  return (
    <>
    <Stack>
       <Stack.Screen 
         name='qsign-in'
         options={{
          headerShown: false
         }}
       />
        <Stack.Screen 
         name='qverify'
         options={{
          headerShown: false,
         }}
       />
        <Stack.Screen 
         name='add-details'
         options={{
          headerShown: false,
         }}
       />
      {/* <StatusBar backgroundColor='#161622' style='light'/>  */}
    </Stack>
    <Toast/>
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})