import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfo } from '../constants/appInfo'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashScreen = () => {
  return (
    <ImageBackground source={require('../assets/images/splash-img.png')}

    // style property is for the container not the img
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}

    imageStyle={{flex: 1}}
    >
      <Image source={require('../assets/images/logo.png')}
      style={{width: appInfo.sizes.WIDTH * 0.8 , //resize width at 80%
      resizeMode: 'contain'

      }}
      />

      <SpaceComponent height={16}/>

      {/* Loading indicator */}
      <ActivityIndicator color={appColors.gray} size={22}/>
    </ImageBackground>
  )
}

export default SplashScreen
