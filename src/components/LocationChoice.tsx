import { View, Text } from 'react-native'
import React, { useState } from 'react'
import RowComponent from './RowComponent';
import { globalStyles } from '../styles/globalStyles';
import { ArrowRight2, Location } from 'iconsax-react-native';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import { appColors } from '../constants/appColors';
import LocationModal from '../modals/LocationModal';

const LocationChoice = () => {
    const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);

    return (
      <>
        <RowComponent
          onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
          styles={[globalStyles.inputContainer]}>
          <Location variant="Bold" size={22} color={`${appColors.primary}80`} />

          <SpaceComponent width={12} />
          <TextComponent text="Newyork, USA" flex={1} />
          <ArrowRight2 color={appColors.primary} size={22} />
        </RowComponent>

        <LocationModal
          visible={isVisibleModalLocation}
          onClose={() => setIsVisibleModalLocation(false)}
          onSelect={val => console.log(val)}
        />
      </>
    );
}

export default LocationChoice
