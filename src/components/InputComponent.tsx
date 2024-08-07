import { View, Text, TextInput, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { appColors } from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { globalStyles } from '../styles/globalStyles';

interface Props {
    value: string,
    onChange: (val: string) => void,
    prefix?: ReactNode,  //a component (element) in React is called reactNode like <View></View>
    placeHolder?: string,
    suffix?: ReactNode,
    isPassword?: boolean,
    allowClear?: boolean,
    type?: KeyBoardType,
    onEnd?: () => void,
    multiline?: boolean,
    numberOfLines?: number,
    styles?: StyleProp<ViewStyle>
}


const InputComponent = (props: Props) => {

    const { multiline, value,
        onChange, prefix, suffix,
        placeHolder, isPassword, type,
        numberOfLines,
        allowClear, onEnd, styles
    } = props;

    // to make show password work
    const [isShowPass, setIsShowPass] = useState(isPassword ?? false)

    return (
        <View style={[globalStyles.inputContainer, {
            alignItems: multiline ? 'flex-start' : 'center'
        }, styles]}>
            {prefix ?? prefix}

            <TextInput style={[styles.input, globalStyles.text, { paddingHorizontal: prefix || suffix ? 12 : 0 }]}
                value={value}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholder={placeHolder}
                placeholderTextColor={'#747688'}
                onChangeText={val => onChange(val)}
                keyboardType={type ?? 'default'}
                autoCapitalize='none'
                onEndEditing={onEnd}
                secureTextEntry={isShowPass} //hide the password input
            />

            {suffix ?? suffix}
            <TouchableOpacity onPress={isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')} >

                {isPassword ? (
                    <FontAwesome name={isShowPass ? 'eye-slash' : 'eye'}
                        size={22}
                        color={appColors.gray} />
                ) : (
                    value && value.length > 0 && allowClear && (
                        <AntDesign name='close' size={22} color={appColors.text} />
                    )
                )}
            </TouchableOpacity>
        </View>
    )
}

export default InputComponent

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray3,
        width: '100%',
        minHeight: 56,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: appColors.white,
        marginBottom: 19
    },

    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        // paddingHorizontal: 14
    }
})
