import { View, Text, Modal, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../components';
import { SearchNormal1 } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import { LocationModel } from '../models/LocationModel';
import axios from 'axios';
import GeoLocation from '@react-native-community/geolocation';
import GeoCoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import { appInfo } from '../constants/appInfo';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: {
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }) => void;
}

const LocationModal = (props: Props) => {
  const { visible, onClose, onSelect } = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();

  useEffect(() => {
    GeoLocation.getCurrentPosition(position => {
      if (position.coords) {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  }, []);

  useEffect(() => {
    GeoCoder.from(addressSelected).then(res => {
      const position = res.results[0].geometry.location;

      setCurrentLocation({
        lat: position.lat,
        long: position.lng,
      });
    });
  }, [addressSelected]);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleClose = () => {
    onClose();
  };
  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&apiKey=${process.env.HERE_API_KEY}`;

    try {
      setIsLoading(true);
      const res = await axios.get(api);

      if (res && res.data && res.status === 200) {
        setLocations(res.data.items);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} style={{ flex: 1 }}>
      <View style={{ paddingVertical: 42 }}>
        <RowComponent
          justify="flex-end"
          styles={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              suffix={<SearchNormal1 size={20} color={appColors.gray} />}
              placeHolder="Search"
              value={searchKey}
              allowClear
              onChange={val => setSearchKey(val)}
              onEnd={handleSearchLocation}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 56,
              right: 10,
              left: 10,
              backgroundColor: appColors.white,
              zIndex: 5,
              padding: 20,
            }}>
            {isLoading ? (
              <ActivityIndicator />
            ) : locations.length > 0 ? (
              <FlatList
                data={locations}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ marginBottom: 12 }}
                    onPress={() => {
                      setAddressSelected(item.address.label);
                      setSearchKey('');
                    }}>
                    <TextComponent text={item.address.label} />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextComponent
                  text={searchKey ? 'Location not found' : 'Search location'}
                />
              </View>
            )}
          </View>
          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>
        {currentLocation && (
          <MapView
            style={{
              width: appInfo.sizes.WIDTH,
              height: 500,
              marginVertical: 40,
              zIndex: -1,
            }}
            showsMyLocationButton
            showsUserLocation
            initialRegion={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.001,
              longitudeDelta: 0.015,
            }}
            mapType="standard"
          />
        )}
        <ButtonComponent
          text="Confirm"
          onPress={() => {
            onSelect({
              address: addressSelected,
              position: currentLocation,
            });

            onClose();
          }}
          type="primary"
        />
      </View>
    </Modal>
  );
}

export default LocationModal
