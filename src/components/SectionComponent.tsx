import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children: ReactNode,
    styles?: StyleProp<ViewStyle> //ViewStyle doesn't have text props like font weight, font height... only view props
}

const SectionComponent = (props: Props) => {

    const {children, styles} = props

  return (
    <View style={[globalStyles.section, styles]}>
      {children}
    </View>
  )
}

export default SectionComponent
