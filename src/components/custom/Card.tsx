import React from 'react';
import {TextStyle, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS, shadows} from '../../constants';
import {Mytext} from './Mytext';
interface Props {
  children?: any;
  style?: TextStyle;
  size?: 10 | 12 | 15 | 20 | 25 | 35;
  onPress?: () => void;
  item: any;
  onPressTrack?: () => void;
}

export const Card = (props: Props) => {
  const {
    children,
    style,
    size = 15,
    onPress,
    item,
    onPressTrack,
    ...rest
  } = props;
  const {values, assetStatus, status, username, assetCategoryName} = item;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        padding: RFValue(5),
        borderRadius: RFValue(5),
        margin: RFValue(10),
        marginTop: RFValue(0),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...shadows,
      }}
      // activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}>
      <View>
        <Mytext onPress={onPress} size={20}>
          {values?.[1].value || username}
        </Mytext>
        <Mytext onPress={onPress}>
          {values?.[0].value || assetCategoryName}
        </Mytext>
      </View>
      <Mytext onPress={onPressTrack}>{assetStatus || status}</Mytext>
    </TouchableOpacity>
  );
};
