import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import {Mytext} from './Mytext';
import {CURRENTDATE} from '../../constants';
interface DateProps {
  open: boolean;
  date: Date | string;
}
interface Props {
  date: DateProps;
  onPress: () => void;
  setDate(date: Date | string, t?: string): void;
  title: string;
}

export const Date = ({date, onPress, setDate, title}: Props) => {
  return (
    <View
      style={{
        zIndex: 1,
        marginVertical: RFValue(5),
      }}>
      <Mytext>{title}</Mytext>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={{
          borderBottomWidth: RFValue(1),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Mytext style={{textAlign: 'center', padding: RFValue(5)}}>
          {typeof date.date === 'string'
            ? date.date
            : moment(date.date).format('ll')}
        </Mytext>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={date.open}
        date={typeof date.date === 'string' ? CURRENTDATE : date.date}
        onConfirm={date => setDate(moment(date).format('L'), title)}
        onCancel={() => {
          setDate(date.date);
        }}
      />
    </View>
  );
};
