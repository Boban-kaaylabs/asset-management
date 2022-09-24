import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import {pull} from 'lodash';
import {COLORS} from '../../constants';
import {Mytext} from './Mytext';
interface Props {
  order?: number;
  data: any;
  title: string;
  value: any;
  onSelect?: any;
  setValue?: any;
}
export const Checkbox = (props: Props) => {
  const {order = 1, data = [], title, value = [], onSelect, setValue} = props;
  return (
    <View
      style={{
        zIndex: order,
        marginVertical: RFValue(5),
      }}>
      <Mytext>{title}</Mytext>
      {data.map((i: any, index: number) => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              hideBox={true}
              onCheckColor={COLORS.primary}
              tintColors={{
                true: COLORS.primary,
                false: COLORS.grey,
              }}
              style={{
                height: RFValue(25),
                width: RFValue(25),
                borderWidth: RFValue(1),
                margin: RFValue(5),
                marginLeft: 0,
              }}
              value={value.includes(i)}
              onValueChange={newValue => {
                newValue
                  ? setValue([...value, i], title)
                  : setValue(pull(value, i), title);
              }}
            />
            <Mytext>{i}</Mytext>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({});
