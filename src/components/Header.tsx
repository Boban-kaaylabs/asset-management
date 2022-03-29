import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from './Icon';

export const Header = () => {
  const position = RFValue(10);

  return (
    <>
      <Icon
        style={{position: 'absolute', left: position, top: position}}
        name="arrow-left"
        size={30}
      />
      <Icon
        style={{position: 'absolute', right: position, top: position}}
        name="dots-vertical"
        size={30}
      />
    </>
  );
};
