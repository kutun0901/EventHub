import { View, Text, Image, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import ContainerComponent from '../../components/ContainerComponent'
import { fontFamily } from '../../constants/fontFamily'
import SocialLogin from './components/SocialLogin'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import {useDispatch} from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingModal } from '../../modals'

const LoginScreen = ({ navigation }: any) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(true)
  const [isDisable, setIsDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch()
  const emailValidation = Validate.email(email)

  if (!email || ! password || !emailValidation){
    setIsDisable(true);
  } else {
    setIsDisable(false)
  }

  useEffect(() => {

  }, [email, password])

  const handleLogin = async () => {

    const emailValidation = Validate.email(email)

    if (emailValidation){
      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleAuthentication('/login', {
          email, password
        }, 'post')

        dispatch(addAuth(res.data))


        await AsyncStorage.setItem('auth',
        isRemember ? JSON.stringify(res.data) : email)

      } catch (error) {
          console.log(error)
      }
      setIsLoading(false)
    } else {
      Alert.alert('Email is not correct')
    }
  }

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75,
      }}>
        <Image source={require('../../assets/images/text-logo.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }} />
      </SectionComponent>

      <SectionComponent>

        <TextComponent text='Sign in' font={fontFamily.medium} size={24} />
        <SpaceComponent height={21} />

        <InputComponent value={email}
          onChange={val => setEmail(val)}
          placeHolder='Email'
          allowClear
          prefix={<Sms size={22} color={appColors.gray} />}
        />

        <InputComponent value={password}
          onChange={val => setPassword(val)}
          placeHolder='Password'
          isPassword
          allowClear
          prefix={<Lock size={22} color={appColors.gray} />}
        />

        <RowComponent justify='space-between'>
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)} />
            <TextComponent text='Remember me' />
          </RowComponent>
          <ButtonComponent type='text' text='Forgot Password' onPress={() => navigation.navigate('ForgotPassword')} />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent disable={isLoading || isDisable}
        onPress={handleLogin} text='SIGN IN'
        type='primary' />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify='center'>
          <TextComponent text="Don't have an account?" />
          <ButtonComponent text='Sign up' type='link' onPress={() => navigation.navigate('SignupScreen')} />
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default LoginScreen
