import React from 'react';
import {Modal, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export const Loader = () => {
  return (
    <Modal transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // backgroundColor: COLORS.transparent_white,
        }}>
        <ActivityIndicator />
      </View>
    </Modal>
  );
};
