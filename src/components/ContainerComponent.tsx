import { View, Text, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import { ArrowLeft } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import TextComponent from './TextComponent';
import { fontFamily } from '../constants/fontFamily';

// this component for screen that use the same image background

interface Props {
    isImageBackground?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode,
    back?: boolean,
}

const ContainerComponent = (props: Props) => {

    const { isImageBackground, isScroll, title, children, back } = props;

    const navigation = useNavigation();

    const headerComponent = () => {
        return <View style={{ flex: 1, paddingTop: 30 }}>
            {(title || back) && (
                <RowComponent styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,

                }}  >
                    {back && (
                        <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{marginRight: 12}}
                        >
                            <ArrowLeft size={24} color={appColors.text} />
                        </TouchableOpacity>
                    )}
                    {title && (
                        <TextComponent
                        text={title}
                        font={fontFamily.medium}
                        size={16}
                        flex={1} />
                    )}
                </RowComponent>
            )}
            {returnContainer}
        </View>
    }

    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
            {children}
        </ScrollView>
    ) : (
        <View style={{ flex: 1 }}>
            {children}
        </View>
    )

    return isImageBackground ? (
        <ImageBackground source={require('../assets/images/splash-img.png')}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {headerComponent()}
            </SafeAreaView>
        </ImageBackground >
    ) : (
        <SafeAreaView style={[globalStyles.container]}>
            {headerComponent()}
        </SafeAreaView>
    )
}

export default ContainerComponent
