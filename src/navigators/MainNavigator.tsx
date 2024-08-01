import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerNavigation from './DrawerNavigation'
import { EventDetail } from '../screens'

const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (


            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='EventDetail' component={EventDetail}/>
                <Stack.Screen name='Main' component={DrawerNavigation} />

            </Stack.Navigator>

    )
}

export default MainNavigator
