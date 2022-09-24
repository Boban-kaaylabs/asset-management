import React from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

import {TabChange} from '../../Store/actions';
import {Icon} from '../custom/Icon';
interface Props {
  navigation: any;
}
export const Trailer = (props: Props) => {
  const {navigation} = props;
  const {navigate} = navigation;
  const dispatch = useDispatch();
  const tabs = useSelector((states: any) => states.GENERAL.tabs);

  return (
    <View
      style={{
        paddingHorizontal: RFValue(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {tabs.map((i: any) => {
        const {key, active, inActive, focused} = i;

        return (
          <Icon
            key={key}
            name={focused ? active : inActive}
            onPress={() => {
              dispatch(TabChange(key));
              navigate(key);
            }}
          />
        );
      })}
    </View>
  );
};
