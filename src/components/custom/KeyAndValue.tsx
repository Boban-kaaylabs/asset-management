import React from 'react';
import {TextStyle, View} from 'react-native';

import {Mytext} from './Mytext';
interface Props {
  children?: any;
  leftText: string;
  rightText: string;
  style?: TextStyle;
  size?: 10 | 12 | 15 | 17 | 20 | 25 | 35;
  justifyContent?: 'center' | 'space-between' | 'space-around';
  onPress?: () => void;
}

export const KeyValuePair = (props: Props) => {
  const {
    children,
    style,
    size = 12,
    leftText,
    rightText,
    onPress,
    justifyContent = 'center',
  } = props;

  return (
    <View style={{flexDirection: 'row', justifyContent}}>
      <Mytext size={size}>{leftText}</Mytext>
      <Mytext size={size} onPress={onPress}>
        {rightText}
      </Mytext>
    </View>
  );
};
