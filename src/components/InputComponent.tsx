import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EyeSlash } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
    value: string,
    onChange: (val: string) => void,
    prefix?: ReactNode,  //a component (element) in React is called reactNode like <View></View>
    placeHolder?: string,
    suffix?: ReactNode,
    isPassword?: boolean,
    allowClear?: boolean,

}


const InputComponent = (props: Props) => {

    const {value, onChange, prefix, suffix, placeHolder, isPassword, allowClear} = props;

    // to make show password work
    const [isShowPass, setIsShowPass] = useState(isPassword ?? false)

  return (
    <View style={styles.inputContainer}>
        {prefix ?? prefix}

        <TextInput
        value={value}
        placeholder={placeHolder}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass} //hide the password input
        />

        {suffix ?? suffix}
        <TouchableOpacity onPress={isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')} >

        {isPassword ? (
            <EyeSlash size={22} color={appColors.gray} />
        ) : (
            value.length > 0 && (
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
        borderColor: appColors.gray,
        width: '100%',
    }
})
