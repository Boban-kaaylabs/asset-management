import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS, shadows} from '../../constants';
import {Icon} from './Icon';
import {Mytext} from './Mytext';
interface Props {
  title: string;
  onPress?: () => void;
}

export const TitleArrow = (props: Props) => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        padding: RFValue(5),
        marginHorizontal: RFValue(10),
        borderBottomWidth: RFValue(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shadows,
      }}
      activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}>
      <Mytext>{title}</Mytext>
      <Icon
        style={{shadowColor: COLORS.white}}
        name="right"
        size={15}
        margin={5}
        padding={5}
        radius={5}
      />
    </TouchableOpacity>
  );
};
