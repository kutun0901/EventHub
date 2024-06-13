import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';
import TextComponent from './TextComponent';
import { fontFamily } from '../constants/fontFamily';
import { appColors } from '../constants/appColors';

interface Props {
    onPress: () => void;
    label: string;
    icon?: ReactNode;
    textColor?: string;
    bgColor?: string;
    styles?: StyleProp<ViewStyle>;
  }


const TagComponent = () => {
    const {onPress, label, icon, textColor, bgColor, styles} = props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          globalStyles.row,
          globalStyles.tag,
          {
            backgroundColor: bgColor ? bgColor : appColors.white,
          },
          styles,
        ]}>
        {icon && icon}
        <TextComponent
          font={fontFamily.medium}
          text={label}
          styles={{marginLeft: icon ? 8 : 0}}
          color={
            textColor ? textColor : bgColor ? appColors.white : appColors.gray
          }
        />
      </TouchableOpacity>
    );
}

export default TagComponent
