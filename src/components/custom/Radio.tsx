import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS} from '../../constants';
import {Mytext} from './Mytext';
interface Props {
  onSelect: (s: any, t: string) => void;
  order?: number;
  data: any;
  title: string;
  value?: string;
}
export const Radio = (props: Props) => {
  const {onSelect, order = 1, data = [], title, value} = props;
  return (
    <View
      style={{
        zIndex: order,
        marginVertical: RFValue(5),
      }}>
      <Mytext>{title}</Mytext>
      {data.map((i: any, index: number) => {
        const {name, selected} = i;
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelect(i, title)}
            style={styles.contentWrapper}>
            <View style={styles.rbStyle}>
              {value == i ? <View style={styles.selected} /> : null}
            </View>
            <Mytext style={styles.text}>{name || i}</Mytext>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rbStyle: {
    height: RFValue(18),
    width: RFValue(18),
    borderRadius: RFValue(110),
    borderWidth: RFValue(1),
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: RFValue(5),
    marginLeft: 0,
  },
  selected: {
    width: RFValue(12),
    height: RFValue(12),
    borderRadius: RFValue(55),
    backgroundColor: COLORS.primary,
  },
  text: {
    fontWeight: 'bold',
    fontSize: RFValue(15),
  },
});
