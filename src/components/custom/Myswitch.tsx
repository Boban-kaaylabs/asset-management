import React from 'react';
import {Switch, Text, TextStyle, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS} from '../../constants';
import {Mytext} from './Mytext';

interface Props {
  isEnabled: boolean;
  toggleSwitch: (v: boolean) => void;
  leftText: string;
  rightText: string;
  order: number;
}

export const Myswitch = (props: Props) => {
  const {isEnabled, toggleSwitch, leftText, rightText, order} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: order,
        marginVertical: RFValue(5),
      }}>
      <Mytext>{leftText}</Mytext>
      <Switch
        trackColor={{true: COLORS.success}}
        ios_backgroundColor={COLORS.grey}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Mytext>{rightText}</Mytext>
    </View>
  );
};
