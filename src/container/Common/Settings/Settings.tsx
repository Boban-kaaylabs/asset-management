import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

import {
  Loader,
  Mytext,
  TitleArrow,
  UselessSpace,
} from '../../../components/custom';
import {Wrapper} from '../../../components/shared';
import {STORAGEKEY} from '../../../constants';
import {SetAuth, SetLogin} from '../../../Store/actions';
import {setLS} from '../../../utils/Storage';
interface Props {
  navigation: any;
  route: any;
}
export const Settings = (props: Props) => {
  const {navigation} = props;
  const {navigate} = navigation;
  const dispatch = useDispatch();
  const isLoading = useSelector((states: any) => states.GENERAL.isLoading);
  useEffect(() => {}, []);

  const onLogout = () => {
    setLS({key: STORAGEKEY.user, value: ''});
    dispatch(SetAuth(''));
  };
  return isLoading ? (
    <Loader />
  ) : (
    <Wrapper tabs navigation={navigation}>
      <View style={{paddingHorizontal: RFValue(20)}}>
        <Mytext size={25}>Settings</Mytext>
      </View>
      <ScrollView>
        <TitleArrow title="Edit Profile" onPress={() => {}} />
        <TitleArrow
          title="Change Password"
          onPress={() => navigate('Forgot', {back: 'Settings'})}
        />
        <UselessSpace />
        <TitleArrow title="Help" onPress={() => {}} />
        <UselessSpace />
        <TitleArrow title="Logout" onPress={onLogout} />
      </ScrollView>

      <Mytext style={{textAlign: 'center'}}>App Version 1.0.0</Mytext>
    </Wrapper>
  );
};
