import React from 'react';
import {Modal, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export const Loader = ({visible}: {visible: boolean}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    </Modal>
  );
};
