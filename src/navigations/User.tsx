import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Activities, CreateRequest, Home} from '../container/User';
import {
  AssetDetails,
  DisplayProfile,
  Requests,
  Settings,
} from '../container/Common';
import {Forgot} from '../container/Auth';
import {NavigationAnime} from '../utils';

const Stack = createNativeStackNavigator();

export const User = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...NavigationAnime,
        // ...TransitionPresets.ModalTransition,
      }}>
      {/* TABS */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="Requests" component={Requests} />
      <Stack.Screen name="Settings" component={Settings} />
      {/* PROFILE */}
      <Stack.Screen name="DisplayProfile" component={DisplayProfile} />
      {/* OTHERS */}
      <Stack.Screen name="CreateRequest" component={CreateRequest} />
      <Stack.Screen name="AssetDetails" component={AssetDetails} />

      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
};
