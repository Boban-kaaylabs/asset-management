import React from 'react';
import {ImageBackground} from 'react-native';

import {png} from '../assets';
export const BackgroundImage = ({children}: any) => {
  return (
    <ImageBackground
      source={png.background}
      blurRadius={10}
      style={{
        width: '100%',
        flex: 1,
      }}>
      {children}
    </ImageBackground>
  );
};
