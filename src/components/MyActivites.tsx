import React from 'react';
import {View, TextInput} from 'react-native';
// import {TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {EndDate, StartDate} from '../Store/actions';
import {Date} from './Date';
import {Mytext} from './Mytext';
import {Reload} from './Reload';

export const MyActivites = () => {
  const dispatch = useDispatch();
  const startdate = useSelector((states: any) => states.GENERAL.startdate);
  const enddate = useSelector((states: any) => states.GENERAL.enddate);

  const openStartDatePicker = (open: boolean, date: Date | string) => {
    dispatch(StartDate({open: open, date: date}));
  };
  const openEndDatePicker = (open: boolean, date: Date | string) => {
    dispatch(EndDate({open: open, date: date}));
  };

  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        top: RFValue(40),
        width: '90%',
      }}>
      <Mytext
        style={{
          fontSize: RFValue(15),
          fontWeight: '500',
          color: 'white',
        }}>
        My activities
      </Mytext>
      <TextInput
        // mode="outlined"
        // outlineColor="white"
        // activeOutlineColor="white"
        // selectionColor="black"
        placeholder="What are you looking for?"
        placeholderTextColor={'grey'}
        style={{
          backgroundColor: 'white',
          fontSize: RFValue(12),
          height: RFValue(35),
          padding: 0,
          width: '70%',
          textAlign: 'center',
          margin: RFValue(15),
          borderRadius: RFValue(3),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderWidth: 0,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
        }}>
        <Date
          date={startdate}
          onPress={() => openStartDatePicker(true, startdate.date)}
          setDate={(date: Date | string) => openStartDatePicker(false, date)}
        />
        <Date
          date={enddate}
          onPress={() => openEndDatePicker(true, enddate.date)}
          setDate={(date: Date | string) => openEndDatePicker(false, date)}
        />
        <Reload />
      </View>
    </View>
  );
};
