import { View, Text } from 'react-native'
import React from 'react'
import { DrawerCustom } from '../components';
import TabNavigator from './TabNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: 'left',
        }}
        drawerContent={props => <DrawerCustom {...props} />}>
        <Drawer.Screen name="HomeNavigator" component={TabNavigator} />
      </Drawer.Navigator>
    );
  };

export default DrawerNavigation
