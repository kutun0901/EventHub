import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContainerComponent from '../components/ContainerComponent';
import { ButtonComponent, DateTimePicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { SelectModel } from '../models/SelectModel';
import DropdownPicker from '../components/DropDownPicker';


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

const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });
  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleChangeValue = (key: string, value: string) => {
    const items = { ...eventData };
    items[`${key}`] = value;

    setEventData(items);
  };

  const handleAddEvent = async () => {
    console.log(eventData);
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

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
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
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
}

export default AddNewScreen
