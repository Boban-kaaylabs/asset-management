import React from 'react';
import {Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Mytext = ({children, style, ...props}: any) => {
  return (
    <Text {...props} style={[{color: 'black', fontSize: RFValue(11)}, style]}>
      {children}
    </Text>
  );
};
