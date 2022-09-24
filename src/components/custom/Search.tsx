import React from 'react';
import {TextInput, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS} from '../../constants';
import {Icon} from './Icon';
interface Props {
  placeholder: string;
  onPress: () => void;
  value: string;
  onChangeText: (t: string) => void;
}
export const Search = (props: Props) => {
  const {onPress, ...rest} = props;

  return (
    <View
      style={{
        marginHorizontal: RFValue(20),
        marginVertical: RFValue(3),
      }}>
      <View
        style={{
          borderBottomWidth: RFValue(1),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <TextInput
            placeholderTextColor={COLORS.grey}
            style={{
              fontSize: RFValue(15),
              color: COLORS.black,
              padding: RFValue(5),
            }}
            {...rest}
          />
        </View>
        <Icon
          style={{
            shadowColor: COLORS.transparent,
            backgroundColor: COLORS.transparent,
          }}
          name={'search'}
          padding={5}
          size={20}
          margin={5}
          radius={5}
          onPress={onPress}
        />
      </View>
    </View>
  );
};
