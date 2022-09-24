import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS, shadows} from '../../constants';
import {svg, png} from '../assets';

interface Props {
  name?: string;
  type?: 'svg' | 'png';
  onPress?: () => void;
  size?: number;
  padding?: number;
  margin?: number;
  radius?: number;
  backgroundColor?: string;
  iconColor?: string;
  style?: any;
}
export const Icon = (props: Props) => {
  const {
    name = 'home',
    type = 'svg',
    onPress,
    size = 20,
    padding = 15,
    margin = 10,
    radius = 50,
    backgroundColor = COLORS.white,
    iconColor = COLORS.primary,
    style,
  } = props;
  const renderItem = () => {
    if (type === 'svg') {
      let IconValue = svg[name as keyof typeof svg].default;
      return (
        <IconValue
          fill={iconColor}
          height={RFValue(size)}
          width={RFValue(size)}
        />
      );
    }
    if (type === 'png')
      return (
        <Image
          source={png[name as keyof typeof png]}
          style={{
            height: RFValue(size),
            width: RFValue(size),
            resizeMode: 'contain',
          }}
        />
      );
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        padding: RFValue(padding),
        margin: RFValue(margin),
        borderRadius: RFValue(radius),
        ...shadows,
        ...style,
      }}
      activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}>
      {renderItem()}
    </TouchableOpacity>
  );
};
