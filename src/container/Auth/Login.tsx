import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';

import {
  Input,
  KeyValuePair,
  Loader,
  Logo,
  Mytext,
} from '../../components/custom';
import {Button} from '../../components/custom/Button';
import {Wrapper} from '../../components/shared';
import {COLORS, ERROR, shadows, STORAGEKEY} from '../../constants';
import {SetAuth} from '../../Store/actions';
import {getLS, handleError, setLS, useAxios} from '../../utils';
interface Props {
  navigation: any;
}

export const Login = (props: Props) => {
  const {navigation} = props;
  const {navigate} = navigation;
  const dispatch = useDispatch();
  const toast = useToast();
  const [value, setValue] = useState({email: '', password: ''});
  const [apiParams, setApiParams]: any = useState({});

  const {response, loading, error}: any = useAxios(apiParams);

  const onChange = (key: string, val: string) =>
    setValue({...value, [key]: val});

  useEffect(() => {
    if (response?.success) {
      const value = response.data;
      setLS({key: STORAGEKEY.user, value});
      dispatch(SetAuth(value));
      toast.show(response.data.message);
      return;
    }
    handleError({error, toast});
  }, [response, error]);

  useEffect(() => {
    validUser();
  }, []);

  const validUser = async () => {
    const user = await getLS({key: STORAGEKEY.user});
    if (user != null) {
      dispatch(SetAuth(user));
    }
  };

  const onSubmit = () => {
    const {email, password} = value;
    if (!email || !password)
      return toast.show('Please enter email and password', ERROR);
    setApiParams({
      method: 'post',
      url: 'auth/login',
      data: value,
    });
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
        <Mytext style={{textAlign: 'center'}}>Sign in to continue</Mytext>

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
            value={value.email}
            onChangeText={(t: string) => {
              onChange('email', t);
            }}
          />
          <Input
            order={8}
            placeholder={'Password'}
            value={value.password}
            onChangeText={(t: string) => {
              onChange('password', t);
            }}
          />
          <Mytext
            size={12}
            style={{textAlign: 'right'}}
            onPress={() => navigate('Forgot')}>
            Forgot Password?
          </Mytext>
          <Button stretch title="SIGN IN" onPress={onSubmit} />
        </View>
      </View>
      <KeyValuePair
        leftText="Don't have an account? "
        rightText="Sign Up"
        onPress={() => navigate('Signup')}
      />
    </Wrapper>
  );
};
