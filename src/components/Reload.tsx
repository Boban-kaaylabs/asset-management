import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {Refresh} from '../Store/actions';
import {Icon} from './Icon';

export const Reload = () => {
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(Refresh());
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        backgroundColor: 'white',
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
      <Icon name="reload" color="blue" />
    </TouchableOpacity>
  );
};
