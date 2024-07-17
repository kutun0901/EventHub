import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import DrawerNavigation from './DrawerNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <GestureHandlerRootView style={{flex: 1}}>

            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='Main' component={DrawerNavigation} />

            </Stack.Navigator>
        </GestureHandlerRootView>
    )
}

export default MainNavigator
