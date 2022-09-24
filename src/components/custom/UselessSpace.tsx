import React from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface Props {
  length?: number;
}

export const UselessSpace = (props: Props) => {
  const {length = 30} = props;

  return <View style={{height: RFValue(length)}} />;
};
