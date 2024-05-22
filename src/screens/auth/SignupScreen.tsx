import { View, Text, Image, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms, User } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import ContainerComponent from '../../components/ContainerComponent'
import { fontFamily } from '../../constants/fontFamily'
import SocialLogin from './components/SocialLogin'
import { LoadingModal } from '../../modals'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import {useDispatch} from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Create form
const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignupScreen = ({ navigation }: any) => {

  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    if (values.email || values.password) {
      setError('')
    }
  }, [values.email, values.password])

  // handle when have many fields
  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values }

    data[`${key}`] = value;

    setValues(data)
  }

  const handleRegister = async () => {

    const { email, password, confirmPassword } = values;

    const emailValidation = Validate.email(email)
    const passwordValidation = Validate.Password(password)

    if (email && password && confirmPassword) {


      if (emailValidation && passwordValidation){
        setError('')
        setIsLoading(true)
        try {
          const res = await authenticationAPI.HandleAuthentication('/register',
           {
            fullName: values.username,
            email,
            password
           },
           'post')

          dispatch(addAuth(res.data));

          await AsyncStorage.setItem('auth', JSON.stringify(res.data))
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      } else {
        setError('Invalid email address')
      }
    } else {
      setError('Missing field')
    }
  }


  return (
    <>
      <ContainerComponent isImageBackground isScroll title='' back>

        <SectionComponent>

          <TextComponent text='Sign up' font={fontFamily.medium} size={24} />
          <SpaceComponent height={21} />

          <InputComponent value={values.username}
            onChange={val => handleChangeValue('username', val)}
            placeHolder='Full name'
            allowClear
            prefix={<User size={22} color={appColors.gray} />}
          />
          <InputComponent value={values.email}
            onChange={val => handleChangeValue('email', val)}
            placeHolder='abc@email.com'
            allowClear
            prefix={<Sms size={22} color={appColors.gray} />}
          />
          <InputComponent value={values.password}
            onChange={val => handleChangeValue('password', val)}
            placeHolder='Password'
            allowClear
            isPassword
            prefix={<Lock size={22} color={appColors.gray} />}
          />
          <InputComponent value={values.confirmPassword}
            onChange={val => handleChangeValue('confirmPassword', val)}
            placeHolder='Confirm password'
            allowClear
            isPassword
            prefix={<Lock size={22} color={appColors.gray} />}
          />
          {
            error && (
              <SectionComponent>
                <TextComponent text={error} color={appColors.alert} />
              </SectionComponent>)
          }
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent onPress={handleRegister} text='SIGN UP' type='primary' />
        </SectionComponent>
        <SocialLogin />
        <SectionComponent>
          <RowComponent justify='center'>
            <TextComponent text="Already have an account?" />
            <ButtonComponent text='Sign in'
              type='link'
              onPress={() => navigation.navigate('LoginScreen')} />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  )
}

export default SignupScreen
