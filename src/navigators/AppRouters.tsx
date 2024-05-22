import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { addAuth, authSelector } from '../redux/reducers/authReducer'
import {useSelector, useDispatch} from 'react-redux'

const AppRouters = () => {

    const {getItem} = useAsyncStorage('auth');
    const dispatch = useDispatch()

    const auth = useSelector(authSelector)

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {
        const res = await getItem()

        console.log(res)

        res && dispatch(addAuth(JSON.parse(res)))
    }

  return (
    <View>
      {auth ? <MainNavigator /> : <AuthNavigator />}
    </View>
  )
}

export default AppRouters
