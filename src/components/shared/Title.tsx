import React from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {Mytext} from '../custom';
interface Props {
  title: string;
  children?: any;
}
export const Title = (props: Props) => {
  const {title, children} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: RFValue(15),
        alignItems: 'center',
      }}>
      <Mytext size={25}>{title}</Mytext>
      {children}
    </View>
  );
};
