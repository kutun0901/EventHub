import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamily } from '../../../constants/fontFamily'
import { Facebook, Google } from '../../../assets/svgs'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux'
import { addAuth } from '../../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage'
import authenticationAPI from '../../../apis/authApi'

GoogleSignin.configure({
  webClientId: '1066130933252-ichsah6efi0ti4lrpagqkbfph07dvqlh.apps.googleusercontent.com',
});

const SocialLogin = () => {

  const [isLoading, setIsLoading] = useState(false);

  const api = `/google-signin`;
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;

      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      dispatch(addAuth(res.data));

      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };


  return (
   <SectionComponent>
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
        onPress={handleLoginWithGoogle}
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
