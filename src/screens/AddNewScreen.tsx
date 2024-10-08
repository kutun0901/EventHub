import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerComponent from '../components/ContainerComponent';
import { ButtonComponent, ButtonImagePicker, DateTimePicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { SelectModel } from '../models/SelectModel';
import DropdownPicker from '../components/DropDownPicker';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Validate } from '../utils/validate';
import { appColors } from '../constants/appColors';
import userAPI from '../apis/userApi';
import storage from '@react-native-firebase/storage';
import { EventModel } from '../models/EventModels';


const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  imageUrl: '',
  users: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });
  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();
  const [errorsMess, setErrorsMess] = useState<string[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const mess = Validate.EventValidation(eventData);

    setErrorsMess(mess);
  }, [eventData]);

  const handleChangeValue = (key: string, value: string) => {
    const items = { ...eventData };
    items[`${key}`] = value;

    setEventData(items);
  };

  const handleAddEvent = async () => {
    if (fileSelected) {
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${
        fileSelected.path.split('.')[1]
      }`;
      const path = `images/${filename}`;

      const res = storage().ref(path).putFile(fileSelected.path);

      res.on(
        'state_changed',
        snap => {
          console.log(snap.bytesTransferred);
        },
        error => {
          console.log(error);
        },
        () => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then(url => {
              eventData.photoUrl = url;

              handlePushEvent(eventData);
            });
        },
      );
    } else {
      handlePushEvent(eventData);
    }
  };

  const handlePushEvent = async (event: EventModel) => {
    const api = `/add-new`;
    try {
      const res = await eventAPI.HandleEvent(api, event, 'post');
      navigation.navigate('Explore', {
        screen: 'HomeScreen',
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleGetAllUsers = async () => {
    const api = `/get-all`;

    try {
      const res: any = await userAPI.HandleUser(api);

      if (res && res.data) {
        const items: SelectModel[] = [];

        res.data.forEach(
          (item: any) =>
            item.email &&
            items.push({
              label: item.email,
              value: item.id,
            }),
        );

        setUsersSelects(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
        {eventData.photoUrl || fileSelected ? (
          <Image
            source={{
              uri: eventData.photoUrl ? eventData.photoUrl : fileSelected.uri,
            }}
            style={{ width: '100%', height: 250, marginBottom: 12 }}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        <ButtonImagePicker
          onSelect={(val: any) =>
            val.type === 'url'
              ? handleChangeValue('photoUrl', val.value as string)
              : handleFileSelected(val.value)
          }
        />
        <InputComponent
          placeHolder="Title"
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />
        <InputComponent
          placeHolder="Description"
          multiline
          numberOfLines={3}
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />
        <DropdownPicker
          selected={eventData.category}
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
        />
        <RowComponent>
          <DateTimePicker
            label="Start at: "
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>

        <DateTimePicker
          label="Date:"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />

        <DropdownPicker
          label="Invited users"
          values={usersSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          selected={eventData.users}
          multiple
        />

        <InputComponent
          placeHolder="Title Address"
          multiline
          numberOfLines={3}
          allowClear
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', { ...eventData.location, title: val })
          }
        />
        <InputComponent
          placeHolder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>
      {errorsMess.length > 0 && (
        <SectionComponent>
          {errorsMess.map(mess => (
            <TextComponent
              text={mess}
              key={mess}
              color={appColors.danger}
              styles={{ marginBottom: 12 }}
            />
          ))}
        </SectionComponent>
      )}
      <SectionComponent>
        <ButtonComponent
          disable={errorsMess.length > 0}
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
}

export default AddNewScreen
