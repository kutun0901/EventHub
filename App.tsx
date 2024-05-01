import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  // Setup how long to display Splash screen
  const [isShowSplash, setIsShowPlash] = useState(true);

  // Setup how long to display Splash screen
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShowPlash(false)
    }, 1500);

    return () => clearTimeout(timeOut)
  })

  return (
    <>
      <StatusBar barStyle='dark-content'
      backgroundColor='transparent'
      translucent />
      {!isShowSplash ? <SplashScreen /> : <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>}
    </>
  )
}

export default App
