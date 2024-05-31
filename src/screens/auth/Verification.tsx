import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamily } from '../../constants/fontFamily'
import { LoadingModal } from '../../modals'
import { globalStyles } from '../../styles/globalStyles'
import { ArrowRight } from 'iconsax-react-native'

const Verification = ({ navigation, route }: any) => {

  const { code, email, password } = route.params

  const [codeValues, setCodeValues] = useState<string[]>([]); //store value from each input
  const [newCode, setNewCode] = useState(''); //combine values from input to string

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    let item = ``;

    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);


  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;

    setCodeValues(data);
  };

  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <SpaceComponent height={12} />
        <TextComponent
          text={`We’ve send you the verification code to ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
        <SpaceComponent height={26} />
        <RowComponent justify='space-around'>
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            value={codeValues[0]}
            style={[styles.input]}
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
            placeholder="-"
          />
          <TextInput
            ref={ref2}
            value={codeValues[1]}
            keyboardType="number-pad"
            onChangeText={val => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
            style={[styles.input]}
            maxLength={1} //only input 1 number
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            value={codeValues[2]}
            ref={ref3}
            onChangeText={val => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            value={codeValues[3]}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{ marginTop: 40 }}>
        <ButtonComponent
          disable={newCode.length !== 4}
          onPress={handleVerification}
          text="Continue"
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    newCode.length !== 4 ? appColors.gray : appColors.primary,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            styles={{ textAlign: 'center' }}
            text={errorMessage}
            color={appColors.alert}
          />
        </SectionComponent>
      )}
      <SectionComponent>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Re-send code in  " flex={0} />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}:${limit - (limit - (limit % 60))
                }`}
              flex={0}
              color={appColors.link}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text="Resend email verification"
              onPress={handleResendVerification}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verification

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
  },
});
