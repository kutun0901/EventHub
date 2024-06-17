import { View, Text } from 'react-native'
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

interface Props {
    item: EventModel;
    type: 'card' | 'list';
}

const EventItem = (props: Props) => {
    const { item, type } = props;

    return (
        <CardComponent
            styles={{ width: appInfo.sizes.WIDTH * 0.6 }}
            onPress={() => { }}>
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
