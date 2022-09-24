import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
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

export const Forgot = (props: Props) => {
  const {navigation, route} = props;
  const {goBack} = navigation;
  const toast = useToast();
  const back = route?.params?.back || 'Sign In';
  const [codeSent, setCodeSent] = useState(false);
  const [value, setValue] = useState({
    emailAddress: '',
    resetAuthToken: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [apiParams, setApiParams]: any = useState({});

  const {response, loading, error}: any = useAxios(apiParams);

  useEffect(() => {
    if (response?.success) {
      codeSent ? goBack() : setCodeSent(true);
      toast.show(response?.data);
      return;
    }
    handleError({error, toast});
  }, [response, error]);

  const onChange = (key: string, val: string) =>
    setValue({...value, [key]: val});
  const onGetCode = () => {
    const {emailAddress} = value;
    if (!emailAddress) return toast.show('Please enter email address', ERROR);
    setApiParams({
      method: 'post',
      url: `auth/forget-password?emailAddress=${emailAddress}`,
      data: {},
    });
  };

  const onVerify = () => {
    const {emailAddress, resetAuthToken, newPassword, confirmPassword} = value;
    if (!emailAddress || !resetAuthToken || !newPassword || !confirmPassword)
      return toast.show('Please fill all fields', ERROR);
    if (newPassword !== confirmPassword)
      return toast.show("Passwords doesn't match", ERROR);
    setApiParams({
      method: 'post',
      url: `auth/update-password`,
      data: value,
    });
  };
  const showRemainingFields = () => {
    return (
      <View>
        <Input
          order={9}
          placeholder={'verification Code'}
          value={value.resetAuthToken}
          onChangeText={(t: string) => {
            onChange('resetAuthToken', t);
          }}
        />
        <Input
          order={9}
          placeholder={'Password'}
          value={value.newPassword}
          onChangeText={(t: string) => {
            onChange('newPassword', t);
          }}
        />
        <Input
          order={9}
          placeholder={'Confirm Password'}
          value={value.confirmPassword}
          onChangeText={(t: string) => {
            onChange('confirmPassword', t);
          }}
        />
      </View>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper auth={false} navigation={navigation}>
      <View>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Logo />
          <Mytext size={35}>Assist</Mytext>
        </View>
        <Mytext style={{textAlign: 'center'}}>Get the verification code</Mytext>

        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            margin: 10,
            borderRadius: 20,
            ...shadows,
          }}>
          <Input
            order={9}
            placeholder={'Email'}
            value={value.emailAddress}
            onChangeText={(t: string) => {
              onChange('emailAddress', t);
            }}
          />
          {codeSent ? showRemainingFields() : null}
          <Button
            stretch
            title={!codeSent ? 'GET CODE' : 'VERIFY'}
            onPress={() => (!codeSent ? onGetCode() : onVerify())}
          />
        </View>
      </View>
      <KeyValuePair leftText="Back to " rightText={back} onPress={goBack} />
    </Wrapper>
  );
};
