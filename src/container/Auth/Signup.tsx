import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useToast} from 'react-native-toast-notifications';

import {
  Input,
  KeyValuePair,
  Loader,
  Logo,
  Mytext,
} from '../../components/custom';
import {Button} from '../../components/custom/Button';
import {Wrapper} from '../../components/shared';
import {COLORS, ERROR, shadows} from '../../constants';
import {handleError, useAxios} from '../../utils';
interface Props {
  navigation: any;
  route: any;
}

export const Signup = (props: Props) => {
  const {navigation, route} = props;
  const {goBack} = navigation;
  const toast = useToast();
  const back = route?.params?.back || 'Sign In';
  const [value, setValue] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [apiParams, setApiParams]: any = useState({});

  const {response, loading, error}: any = useAxios(apiParams);

  useEffect(() => {
    if (response?.success) {
      goBack();
      toast.show(response?.data);
      return;
    }
    handleError({error, toast});
  }, [response, error]);

  const onChange = (key: string, val: string) =>
    setValue({...value, [key]: val});

  const onSignUp = () => {
    const {email, password, firstName, lastName} = value;
    if (!email || !password || !firstName || !lastName)
      return toast.show('Please fill all fields', ERROR);
    setApiParams({
      method: 'post',
      url: `auth/signup`,
      data: value,
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper auth={false} navigation={navigation}>
      <View>
        <View style={{alignItems: 'center', marginTop: RFValue(50)}}>
          <Logo />
          <Mytext size={35}>Assist</Mytext>
        </View>
        <Mytext style={{textAlign: 'center'}}>
          Get started with Assist, YO!
        </Mytext>

        <View
          style={{
            backgroundColor: COLORS.white,
            padding: RFValue(20),
            margin: RFValue(10),
            borderRadius: RFValue(10),
            ...shadows,
          }}>
          <Input
            order={9}
            placeholder={'Firstname'}
            value={value.firstName}
            onChangeText={(t: string) => {
              onChange('firstName', t);
            }}
          />
          <Input
            order={9}
            placeholder={'Lastname'}
            value={value.lastName}
            onChangeText={(t: string) => {
              onChange('lastName', t);
            }}
          />
          <Input
            order={9}
            placeholder={'Email'}
            value={value.email}
            onChangeText={(t: string) => {
              onChange('email', t);
            }}
          />

          <Input
            order={9}
            placeholder={'Password'}
            value={value.password}
            onChangeText={(t: string) => {
              onChange('password', t);
            }}
          />

          <Button stretch title={'SIGN UP'} onPress={onSignUp} />
        </View>
      </View>
      <KeyValuePair leftText="Back to " rightText={back} onPress={goBack} />
    </Wrapper>
  );
};
