import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import { ButtonComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    return <ContainerComponent back isImageBackground>
        <SectionComponent>
            <TextComponent text='Reset Password' title />
            <TextComponent text='Please enter your email address to request a password reset' />
            <SpaceComponent height={26}/>
            <InputComponent value={email}
            onChange={val => setEmail(val)}
            prefix={<Sms size={20} color={appColors.gray} />}
            placeHolder='abc@email.com'
            />
        </SectionComponent>
        <SectionComponent>
            <ButtonComponent type='primary'
            text='Send'
            icon={<ArrowRight size={20} color={appColors.white} />}
            iconFlex='right'
             />
        </SectionComponent>

    </ContainerComponent>
}

export default ForgotPassword
