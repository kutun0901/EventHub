import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import ContainerComponent from '../../components/ContainerComponent'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <ContainerComponent>
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
    </ContainerComponent>
  )
}

export default LoginScreen
