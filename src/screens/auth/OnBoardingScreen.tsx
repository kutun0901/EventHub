import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Swiper from 'react-native-swiper'
import { appInfo } from '../../constants/appInfo'
import { appColors } from '../../constants/appColors'
import { TextComponent } from '../../components'
import { fontFamily } from '../../constants/fontFamily'

const OnBoardingScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0)



  return (
    <View style={[globalStyles.container]}>

      {/* Swiper library is for onboarding design */}
      <Swiper style={{}} loop={false}
        onIndexChanged={num => {
          setIndex(num)
        }}
        index={index}
        activeDotColor={appColors.white}
      >
        <Image source={require('../../assets/images/onboarding-1.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image source={require('../../assets/images/onboarding-2.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image source={require('../../assets/images/onboarding-3.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
      </Swiper>
      <View style={[{
        paddingHorizontal: 16,
        paddingVertical: 20,
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }]}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextComponent text='Skip' color={appColors.gray2}
            font={fontFamily.medium}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')}>
          <TextComponent text='Next' color={appColors.white}
            font={fontFamily.medium}

          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OnBoardingScreen

// local style
const styles = StyleSheet.create({
  text: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '500'
  }
})
