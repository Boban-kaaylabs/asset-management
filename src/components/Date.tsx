import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from './Icon';
import {Mytext} from './Mytext';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {CURRENTDATE} from '../constants';
interface DateProps {
  open: boolean;
  date: Date | string;
}
interface Props {
  date: DateProps;
  onPress: () => void;
  setDate(date: Date | string): void;
}

export const Date: React.FC<Props> = ({date, onPress, setDate}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
        width: '40%',
        borderRadius: RFValue(3),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <View style={{width: '75%'}}>
        <Mytext style={{textAlign: 'center'}}>
          {typeof date.date === 'string'
            ? date.date
            : moment(date.date).format('ll')}
        </Mytext>
      </View>

      <Icon
        name="calendar-month-outline"
        color="red"
        style={{paddingHorizontal: 0}}
      />
      <DatePicker
        modal
        mode="date"
        open={date.open}
        date={typeof date.date === 'string' ? CURRENTDATE : date.date}
        onConfirm={date => setDate(date)}
        onCancel={() => {
          setDate(date.date);
        }}
      />
    </TouchableOpacity>
  );
};
