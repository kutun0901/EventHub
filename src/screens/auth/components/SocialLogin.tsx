import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamily } from '../../../constants/fontFamily'
import { Facebook, Google } from '../../../assets/svgs'

const SocialLogin = () => {
  return (
   <SectionComponent styles={{alignItems: 'center'}}>
        <TextComponent
        styles={{textAlign: 'center'}}
        text='OR'
        color={appColors.gray4}
        size={16}
        font={fontFamily.medium}
        />
        <SpaceComponent height={16}/>
        <ButtonComponent
        type='primary'
        color={appColors.white}
        textColor={appColors.text}
        text='Login with Google'
        iconFlex='left'
        textFont={fontFamily.regular}
        icon={<Google />}
        />
        <ButtonComponent
        type='primary'
        color={appColors.white}
        textColor={appColors.text}
        text='Login with Google'
        iconFlex='left'
        textFont={fontFamily.regular}
        icon={<Facebook />}
        />
   </SectionComponent>
  )
}

export default SocialLogin
