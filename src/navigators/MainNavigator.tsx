import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import DrawerNavigation from './DrawerNavigation'

const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='Main' component={DrawerNavigation} />

    </Stack.Navigator>
}

export default MainNavigator
