import { useEffect, useRef, useState } from "react";
import { SelectModel } from "../models/SelectModel";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { appColors } from "../constants/appColors";
import SpaceComponent from "./SpaceComponent";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { fontFamily } from "../constants/fontFamily";
import { ArrowDown2, SearchNormal1 } from "iconsax-react-native";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';


interface Props {
    label?: string;
    values: SelectModel[];
    selected?: string | string[];
    onSelect: (val: string | string[]) => void;
    multiple?: boolean;
  }

  const DropdownPicker = (props: Props) => {
    const {onSelect, selected, values, label, multiple} = props;
    const [searchKey, setSearchKey] = useState('');
    const [isVisibleModalize, setIsVisibleModalize] = useState(false);
    const modalizeRef = useRef<Modalize>();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
      if (isVisibleModalize) {
        modalizeRef.current?.open();
      }
    }, [isVisibleModalize]);

    useEffect(() => {
      if (isVisibleModalize && selected) {
        setSelectedItems(multiple ? (selected as string[]) : []);
      }
    }, [isVisibleModalize, selected, multiple]);

    const handleSelectItem = (id: string) => {
      if (selectedItems.includes(id)) {
        const data = [...selectedItems];

        const index = selectedItems.findIndex(element => element === id);

        if (index !== -1) {
          data.splice(index, 1);
        }

        setSelectedItems(data);
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    };

    const renderSelectedItem = (id: string) => {
      const item = values.find(element => element.value === id);

      return item ? (
        <RowComponent key={id} styles={[localStyles.selectedItem]}>
          <TextComponent
            text={`${
              item.label.includes('@') ? item.label.split('@')[0] : item.label
            }`}
            color={appColors.primary}
          />
          <SpaceComponent width={8} />
          <TouchableOpacity
            onPress={() => {
              handleSelectItem(id);
              onSelect(selectedItems);
            }}>
            <AntDesign name="close" size={18} color={appColors.text} />
          </TouchableOpacity>
        </RowComponent>
      ) : (
        <></>
      );
    };

    const renderSelectItem = (item: SelectModel) => {
      return (
        <RowComponent
          onPress={
            multiple
              ? () => handleSelectItem(item.value)
              : () => {
                  onSelect(item.value);
                  modalizeRef.current?.close();
                }
          }
          key={item.value}
          styles={[localStyles.listItem]}>
          <TextComponent
            text={item.label}
            flex={1}
            font={
              selectedItems?.includes(item.value)
                ? fontFamily.medium
                : fontFamily.regular
            }
            color={
              selectedItems?.includes(item.value)
                ? appColors.primary
                : appColors.text
            }
          />
          {selectedItems.includes(item.value) && (
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={22}
              color={appColors.primary}
            />
          )}
        </RowComponent>
      );
    };

    return (
      <View style={{marginBottom: 8}}>
        {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
        <RowComponent
          styles={[globalStyles.inputContainer, {alignItems: 'flex-start'}]}
          onPress={() => setIsVisibleModalize(true)}>
          <RowComponent styles={{flex: 1, flexWrap: 'wrap'}}>
            {selected ? (
              selectedItems.length > 0 ? (
                selectedItems.map(item => renderSelectedItem(item))
              ) : (
                <TextComponent
                  text={
                    values.find(element => element.value === selected)?.label ??
                    ''
                  }
                />
              )
            ) : (
              <TextComponent text="Select" />
            )}
          </RowComponent>
          <ArrowDown2 size={22} color={appColors.gray} />
        </RowComponent>
        <Portal>
          <Modalize
            handlePosition="inside"
            ref={modalizeRef}
            FooterComponent={
              multiple && (
                <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
                  <ButtonComponent
                    text="Agree"
                    type="primary"
                    onPress={() => {
                      onSelect(selectedItems);
                      modalizeRef.current?.close();
                    }}
                  />
                </View>
              )
            }
            scrollViewProps={{showsVerticalScrollIndicator: false}}
            HeaderComponent={
              <RowComponent
                styles={{
                  marginBottom: 12,
                  paddingHorizontal: 20,
                  paddingTop: 30,
                }}>
                <View style={{flex: 1}}>
                  <InputComponent
                    styles={{marginBottom: 0}}
                    placeHolder="Search..."
                    value={searchKey}
                    onChange={val => setSearchKey(val)}
                    allowClear
                    suffix={<SearchNormal1 size={22} color={appColors.text} />}
                  />
                </View>
                <SpaceComponent width={20} />
                <ButtonComponent
                  type="link"
                  text="Cancel"
                  onPress={() => modalizeRef.current?.close()}
                />
              </RowComponent>
            }
            onClose={() => setIsVisibleModalize(false)}>
            <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
              {values.map(item => renderSelectItem(item))}
            </View>
          </Modalize>
        </Portal>
      </View>
    );
  };

  export default DropdownPicker;

  const localStyles = StyleSheet.create({
    listItem: {
      marginBottom: 20,
    },
    selectedItem: {
      borderWidth: 0.5,
      borderColor: appColors.gray,
      padding: 4,
      marginBottom: 8,
      marginRight: 8,
      borderRadius: 8,
    },
  });
