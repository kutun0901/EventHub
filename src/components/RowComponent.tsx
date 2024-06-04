import { View, Text, StyleProp, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props {
  children: ReactNode
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined,
  styles?: StyleProp<ViewStyle>
  onPress?: () => void
}

const RowComponent = (props: Props) => {
  const { children, justify, styles, onPress } = props

  return onPress ? (<TouchableOpacity
    activeOpacity={1} //won't gray out the component when click on
    onPress={onPress}
    style={[globalStyles.row, {
    justifyContent: justify ?? 'center'
  }, styles]}>
    {children}
  </TouchableOpacity>
  ) : (
    <View style={[globalStyles.row, {
      justifyContent: justify
    }, styles]}>
      {children}
    </View>
  )
}

export default RowComponent
