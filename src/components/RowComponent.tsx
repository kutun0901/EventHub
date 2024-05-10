import { View, Text, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    children: ReactNode
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined ,
    styles?: StyleProp<ViewStyle>
    onPress?: () => void
}

const RowComponent = (props: Props) => {
    const {children, justify, styles} = props

  return (
    <View style={[globalStyles.row, {
        justifyContent: justify
    }, styles]}>
      {children}
    </View>
  )
}

export default RowComponent
