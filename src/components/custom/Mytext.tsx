import React from 'react';
import {Text, TextStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS} from '../../constants';
interface Props {
  children?: any;
  style?: TextStyle;
  size?: 10 | 12 | 15 | 17 | 20 | 25 | 35;

  onPress?: () => void;
}

export const Mytext = (props: Props) => {
  const {children, style, size = 15, onPress, ...rest} = props;

  return (
    <TouchableOpacity activeOpacity={onPress ? 0.5 : 1} onPress={onPress}>
      <Text
        {...rest}
        style={[
          {
            color: COLORS.primary,
            fontSize: RFValue(size),
            fontFamily: 'Kanit-Regular',
          },
          style,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
