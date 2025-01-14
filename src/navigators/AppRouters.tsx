import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { addAuth, addFollowedEvent, authSelector, AuthState } from '../redux/reducers/authReducer'
import {useSelector, useDispatch} from 'react-redux'
import { SplashScreen } from '../screens'
import userAPI from '../apis/userApi'
import { UserHandle } from '../utils/userHandlers'

const AppRouters = () => {

    const {getItem} = useAsyncStorage('auth');
    const dispatch = useDispatch()
    // Setup how long to display Splash screen
    const [isShowSplash, setIsShowPlash] = useState(true);

    const auth: AuthState = useSelector(authSelector)

  // Setup how long to display Splash screen
  useEffect(() => {
    handleGetData()
    // checkLogin();

    // const timeOut = setTimeout(() => {
    //   setIsShowPlash(false)
    // }, 1500);

    // return () => clearTimeout(timeOut)
  }, [])

  useEffect(() => {
    UserHandle.getFollowersById(auth.id, dispatch)
  }, [auth.id])

  const handleGetData = async () => {
    await checkLogin()
    // await getFollowersById()

    setIsShowPlash(false)
  }



    const checkLogin = async () => {
        const res = await getItem()

        console.log(res)

        res && dispatch(addAuth(JSON.parse(res)))
    }



  return (
    <View>
      {isShowSplash ? <SplashScreen /> : auth.accessToken ? <MainNavigator /> : <AuthNavigator />}
    </View>
  )
}

export default AppRouters
