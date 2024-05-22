import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import store from './src/redux/store';
import {Provider} from 'react-redux'
import AppRouters from './src/navigators/AppRouters';

const App = () => {


  // Check whether use logged in or not
  // const { getItem, setItem } = useAsyncStorage('accessToken')

  // const [accessToken, setAccessToken] = useState('')

  // Setup how long to display Splash screen
  const [isShowSplash, setIsShowPlash] = useState(true);

  // Setup how long to display Splash screen
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShowPlash(false)
    }, 1500);

    return () => clearTimeout(timeOut)
  }, [])

  // useEffect(() => {
  //   checkLogin()
  // }, [])

  // const checkLogin = async () => {
  //   const token = await getItem()

  //   // console.log(token)
  //   token && setAccessToken(token)
  // }

  return (
    <>
      <StatusBar barStyle='dark-content'
        backgroundColor='transparent'
        translucent />
      <Provider store={store}>

        {isShowSplash ?
          <SplashScreen /> :
          <NavigationContainer>
            <AppRouters />
            {/* {accessToken ? <MainNavigator /> : <AuthNavigator />} */}
          </NavigationContainer>}
      </Provider>
    </>
  )
}

export default App
