import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import { ButtonComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { Validate } from '../../utils/validate'
import authenticationAPI from '../../apis/authApi'
import { LoadingModal } from '../../modals'

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckEmail = () => {
        const isValidEmail = Validate.email(email);
        setIsDisable(!isValidEmail);
    };

    const handleForgotPassword = async () => {
        const api = `/forgotPassword`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email },
                'post',
            );

            console.log(res);

            Alert.alert('Send email', 'We sended an email includes new password!!!');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(`Can not create new password api forgot password, ${error}`);
        }
    };

    return <ContainerComponent back isImageBackground isScroll>
        <SectionComponent>
            <TextComponent text='Reset Password' title />
            <SpaceComponent height={12} />
            <TextComponent text='Please enter your email address to request a password reset' />
            <SpaceComponent height={26} />
            <InputComponent value={email}
                onChange={val => setEmail(val)}
                prefix={<Sms size={20} color={appColors.gray} />}
                placeHolder='abc@email.com'
            />
        </SectionComponent>
        <SectionComponent>
            <ButtonComponent
                onPress={handleForgotPassword}
                type='primary'
                disable={!isDisable}
                text='Send'
                icon={<ArrowRight size={20} color={appColors.white} />}
                iconFlex='right'
            />
        </SectionComponent>
        <LoadingModal visible={isLoading} />
    </ContainerComponent>
}

export default ForgotPassword
