import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={[globalStyles.container, {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }]}>
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
    </View>
  )
}

export default LoginScreen
