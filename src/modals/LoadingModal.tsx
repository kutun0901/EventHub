import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { TextComponent } from '../components'

interface Props {
    visible: boolean,
    mess?: string,
}

const LoadingModal = (props: Props) => {

    const {visible, mess} = props;

  return (
   <Modal visible={visible}
   style={[{flex: 1}]}
   transparent
   statusBarTranslucent>
    <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <ActivityIndicator color={'#ffffff'}/>
        <TextComponent text='loading' flex={0} color='#ffffff'/>
    </View>
   </Modal>
  )
}

export default LoadingModal
