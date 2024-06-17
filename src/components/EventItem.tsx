import { View, Text } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent';
import CardComponent from './CardComponent';
import { appInfo } from '../constants/appInfo';
import { EventModel } from '../models/EventModels';

interface Props {
    item: EventModel;
    type: 'card' | 'list';
  }

  const EventItem = (props: Props) => {
    const {item, type} = props;

    return (
      <CardComponent
        styles={{width: appInfo.sizes.WIDTH * 0.6}}
        onPress={() => {}}>
        <TextComponent
          numOfLine={1}
          text={item.title}
          title
          size={18}
        />
      </CardComponent>
    );
  };

export default EventItem
