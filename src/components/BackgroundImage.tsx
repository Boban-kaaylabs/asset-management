import React from 'react';
import {ImageBackground} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const BackgroundImage = () => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={{uri: 'https://picsum.photos/400/200'}}
      style={{width: '100%', height: RFValue(200)}}
    />
  );
};
