import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS, shadows} from '../../constants';
import {Mytext} from './Mytext';
interface Props {
  children?: any;
  onPress: () => void;
  title: string;
  stretch?: boolean;
  width?: number;
}

export const Button = (props: Props) => {
  const {children, onPress, title, stretch, width = 80} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.black,
        width: stretch ? '100%' : RFValue(width),
        alignItems: 'center',
        justifyContent: 'center',
        padding: RFValue(5),
        alignSelf: 'center',
        margin: RFValue(5),
        borderRadius: RFValue(5),
        ...shadows,
      }}>
      <Mytext style={{color: COLORS.white}}>{title}</Mytext>
    </TouchableOpacity>
  );
};
