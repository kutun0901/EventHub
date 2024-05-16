import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { TextComponent } from '../components'

interface Props {
    visible: boolean,
    mess?: string,
    onClose: () => void
}

const LoadingModal = (props: Props) => {

    const {visible, onClose, mess} = props;

  return (
   <Modal visible={visible}
   style={[globalStyles.container]}
   transparent
   statusBarTranslucent>
    <View style={{
        backgroundColor: 'coral',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <ActivityIndicator />
        <TextComponent text='loading' flex={0}/>
    </View>
   </Modal>
  )
}

export default LoadingModal
