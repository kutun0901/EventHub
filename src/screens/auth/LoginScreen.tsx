import { View, Text, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import ContainerComponent from '../../components/ContainerComponent'
import { fontFamily } from '../../constants/fontFamily'
import SocialLogin from './components/SocialLogin'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(true)

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
          <ButtonComponent type='text' text='Forgot Password' onPress={() => { }} />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent text='SIGN IN' type='primary' />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
          <RowComponent justify='center'>
            <TextComponent text="Don't have an account?" />
            <ButtonComponent text='Sign up' type='link'/>
          </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginScreen
