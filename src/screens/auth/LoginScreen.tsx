import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import ContainerComponent from '../../components/ContainerComponent'
import { fontFamily } from '../../constants/fontFamily'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      </SectionComponent>

    </ContainerComponent>
  )
}

export default LoginScreen
