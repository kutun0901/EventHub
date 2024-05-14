import { View, Text, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms, User } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import ContainerComponent from '../../components/ContainerComponent'
import { fontFamily } from '../../constants/fontFamily'
import SocialLogin from './components/SocialLogin'


// Create form
const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignupScreen = ({navigation}: any) => {

  const [values, setValues] = useState(initialValues)


  // handle when have many fields
  const handleChangeValue = (key: string, value: string) => {
      const data: any = {...values}

      data[`${key}`] = value;

      setValues(data)
  }

  return (
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

      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent text='SIGN UP' type='primary' />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
          <RowComponent justify='center'>
            <TextComponent text="Already have an account?" />
            <ButtonComponent text='Sign in'
            type='link'
            onPress={() => navigation.navigate('LoginScreen')}/>
          </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default SignupScreen
