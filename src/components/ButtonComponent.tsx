import { View, Text, ViewStyle, StyleProp, TextStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent'
import { globalStyles } from '../styles/globalStyles'
import { appColors } from '../constants/appColors'
import { fontFamily } from '../constants/fontFamily'

interface Props {
    icon?: ReactNode,
    text: string,
    type?: 'primary' | 'text' | 'link',
    color?: string,
    styles?: StyleProp<ViewStyle>, //define the style props for components that render views or containers
    textColor?: string,
    textFont?: string,
    textStyles?: StyleProp<TextStyle>, //used to define the style props for components that render text, such as <Text> components in React Native.
    onPress?: () => void,
    iconFlex?: 'right' | 'left'
}

const ButtonComponent = (props: Props) => {

    const { icon, text, type, color, styles, textColor, textFont, iconFlex, textStyles, onPress } = props

    return (

        type === "primary" ? (
            <TouchableOpacity
                onPress={onPress}
                style={[globalStyles.button,
                    globalStyles.shadow,
                {
                    backgroundColor: color ?? appColors.primary,
                    marginBottom: 17,
                },
                    styles]} >
                {icon && iconFlex === 'left' && icon}
                <TextComponent text={text}
                    color={textColor ?? appColors.white}
                    styles={[textStyles,
                        {
                            marginLeft: icon ? 12 : 0,
                            fontSize: 16,
                        }]}
                    font={textFont ?? fontFamily.medium}
                    flex={icon && iconFlex === 'right' ? 1 : 0}
                />
                {icon && iconFlex === 'right' && icon}
            </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={onPress}>
                <TextComponent text={text}
                color={type === 'link' ? appColors.link : appColors.text}
                />
            </TouchableOpacity>
        )

    )
}

export default ButtonComponent
