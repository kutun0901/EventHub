import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import ContainerComponent from '../../components/ContainerComponent'
import { ButtonComponent } from '../../components'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { removeAuth } from '../../redux/reducers/authReducer'

const ProfileScreen = () => {

  const dispatch = useDispatch()


  return (
   <ContainerComponent back>
    <Text>
      Profile Screen
    </Text>
    <ButtonComponent
    type='primary'
    text='Logout'
    onPress={async () => {
      await GoogleSignin.signOut();

      dispatch(removeAuth({}))
    }}
    />

   </ContainerComponent>
  )
}

export default ProfileScreen
