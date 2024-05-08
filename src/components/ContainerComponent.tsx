import { View, Text, ImageBackground, ScrollView, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';

// this component for screen that use the same image background

interface Props {
    isImageBackground?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode
}

const ContainerComponent = (props: Props) => {

    const { isImageBackground, isScroll, title, children } = props;

    const returnContainer = isScroll ? (
        <ScrollView style={{flex: 1}}>
            {children}
        </ScrollView>
    ) : (
        <View style={{flex: 1}}>
            {children}
        </View>
    )

    return isImageBackground ? (
        <ImageBackground source={require('../assets/images/splash-img.png')}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}>
            <SafeAreaView style={{flex: 1}}>
                {returnContainer}
            </SafeAreaView>
        </ImageBackground >
    ) : (
        <SafeAreaView style={[globalStyles.container]}>
            {returnContainer}
        </SafeAreaView>
    )
}

export default ContainerComponent
