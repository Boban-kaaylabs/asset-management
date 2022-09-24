import React from 'react';
import {Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface Props {}

export const Logo = ({}) => {
  return (
    <Image
      source={require('../assets/images/background.jpeg')}
      style={{
        width: RFValue(100),
        height: RFValue(100),
        resizeMode: 'cover',
        borderRadius: RFValue(20),
        // marginBottom: RFValue(10),
      }}
    />
  );
};
