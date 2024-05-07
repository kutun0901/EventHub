import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, InputComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'

const LoginScreen = () => {
  return (
    <View style={[globalStyles.container, {
      justifyContent: 'center',
      alignItems: 'center'
    }]}>
      <InputComponent />
    </View>
  )
}

export default LoginScreen
