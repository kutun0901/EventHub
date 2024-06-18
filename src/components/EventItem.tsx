import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent';
import CardComponent from './CardComponent';
import { appInfo } from '../constants/appInfo';
import { EventModel } from '../models/EventModels';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import { Location } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import { fontFamily } from '../constants/fontFamily';
import { globalStyles } from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';


interface Props {
    item: EventModel;
    type: 'card' | 'list';
}

const EventItem = (props: Props) => {
    const { item, type } = props;

    return (
        <CardComponent
            isShadow
            styles={{ width: appInfo.sizes.WIDTH * 0.7 }}
            onPress={() => { }}>
            <ImageBackground
                style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
                source={require('../assets/images/event-image.png')}
                imageStyle={{
                    resizeMode: 'cover',
                    borderRadius: 12,
                }}>
                <RowComponent justify="space-between">
                    <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
                        <TextComponent
                            color={appColors.danger2}
                            font={fontFamily.bold}
                            size={18}
                            text="10"
                        />
                        <TextComponent
                            color={appColors.danger2}
                            font={fontFamily.semiBold}
                            size={10}
                            text="JUNE"
                        />
                    </CardComponent>
                    <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
                        <MaterialIcons
                            name="bookmark"
                            color={appColors.danger2}
                            size={22}
                        />
                    </CardComponent>
                </RowComponent>

            </ImageBackground>
            <TextComponent
                numOfLine={1}
                text={item.title}
                title
                size={18}
            />
            <AvatarGroup />
            <RowComponent>
                <Location size={18} color={appColors.text3} variant="Bold" />
                <SpaceComponent width={8} />
                <TextComponent
                    flex={1}
                    numOfLine={1}
                    text={item.location.address}
                    size={12}
                    color={appColors.text2}
                />
            </RowComponent>
        </CardComponent>
    );
};

export default EventItem
