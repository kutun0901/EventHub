import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent } from '../../components'
import { globalStyles } from '../../styles/globalStyles'

const LoginScreen = () => {
  return (
    <View style={[globalStyles.container, {padding: 16}]}>
      <Text>LoginScreen</Text>

      <ButtonComponent text='LOGIN'
        onPress={() => console.log('login')}
        icon={
          <View>
            <Text>N</Text>
          </View>
        }

      />
    </View>
  )
}

export default LoginScreen
