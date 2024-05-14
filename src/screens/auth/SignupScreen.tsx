import { View, Text, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import ContainerComponent from '../../components/ContainerComponent'
import { fontFamily } from '../../constants/fontFamily'
import SocialLogin from './components/SocialLogin'

const SignupScreen = ({navigation}: any) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(true)

  return (
    <ContainerComponent isImageBackground isScroll title='' back>

      <SectionComponent>

        <TextComponent text='Sign up' font={fontFamily.medium} size={24} />
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


      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
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
