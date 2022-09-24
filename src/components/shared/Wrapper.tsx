import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import {COLORS} from '../../constants';
import {Header} from './Header';
import {Trailer} from './Trailer';
interface Props {
  children: any;
  tabs?: boolean | undefined;
  navigation?: any;
  auth?: boolean;
  onPress?: () => void;
}
export const Wrapper = (props: Props) => {
  const {children, tabs = false, navigation, onPress, auth = true} = props;
  const {navigate} = navigation;
  const {id} = useSelector((states: any) => states.GENERAL.auth);

  const defaultPress = () => {
    navigate('DisplayProfile', {id});
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        {auth && (
          <Header
            tabs={tabs}
            navigation={navigation}
            onPress={onPress || defaultPress}
          />
        )}
        {children}
        {auth && <Trailer navigation={navigation} />}
      </SafeAreaView>
    </View>
  );
};
