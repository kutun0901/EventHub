import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ForgotPassword, LoginScreen, SignupScreen, Verification } from '../screens'
import OnBoardingScreen from '../screens/auth/OnBoardingScreen'

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()

  return <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen  name='OnBoardingScreen' component={OnBoardingScreen}/>
    <Stack.Screen  name='LoginScreen' component={LoginScreen}/>
    <Stack.Screen  name='SignupScreen' component={SignupScreen}/>
    <Stack.Screen  name='ForgotPassword' component={ForgotPassword}/>
    <Stack.Screen  name='Verification' component={Verification}/>

  </Stack.Navigator>
}

export default AuthNavigator
