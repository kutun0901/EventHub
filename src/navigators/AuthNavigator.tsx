import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ForgotPassword, LoginScreen, SignupScreen, Verification } from '../screens'
import OnBoardingScreen from '../screens/auth/OnBoardingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthNavigator = () => {

  // const [isExistingUser, setIsExistingUser] = useState(false)

    const Stack = createNativeStackNavigator()

    // useEffect(() => {
    //   checkExistingUser();
    // }, [])

    // const checkExistingUser = async () => {
    //   const res = await AsyncStorage.getItem('auth');

    //   res && setIsExistingUser(true);
    // }

  return <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    {/* {!isExistingUser && (
      <Stack.Screen  name='OnBoardingScreen' component={OnBoardingScreen}/>
    )} */}
    <Stack.Screen  name='OnBoardingScreen' component={OnBoardingScreen}/>
    <Stack.Screen  name='LoginScreen' component={LoginScreen}/>
    <Stack.Screen  name='SignupScreen' component={SignupScreen}/>
    <Stack.Screen  name='ForgotPassword' component={ForgotPassword}/>
    <Stack.Screen  name='Verification' component={Verification}/>

  </Stack.Navigator>
}

export default AuthNavigator
