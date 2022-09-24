import React from 'react';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {Icon} from '../custom/Icon';
interface Props {
  tabs: boolean;
  navigation: any;
  onPress?: () => void;
}
export const Header = (props: Props) => {
  const {tabs = false, onPress, navigation} = props;
  const {goBack} = navigation;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RFValue(20),
        margin: RFValue(15),
      }}>
      {tabs ? <Text /> : <Icon name="back" onPress={goBack} />}
      <Icon type="png" name="user" onPress={onPress} />
    </View>
  );
};
