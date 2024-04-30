import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {

  // Setup how long to display Splash screen
  const [isShowSplash, setIsShowPlash] = useState(true);

    // Setup how long to display Splash screen
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsShowPlash(false)
    }, 1500);

    return () => clearTimeout(timeOut)
  })

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App
