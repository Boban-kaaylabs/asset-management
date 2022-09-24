import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Forgot, Login, Signup} from '../container/Auth';

const Stack = createNativeStackNavigator();

export const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
