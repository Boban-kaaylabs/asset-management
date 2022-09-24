import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AllUsers,
  AssetAdd,
  CreateAsset,
  Home,
  ListAsset,
} from '../container/Admin';
import {
  AssetDetails,
  DisplayProfile,
  Requests,
  Settings,
} from '../container/Common';
import {Forgot} from '../container/Auth';
import {NavigationAnime} from '../utils';

const Stack = createNativeStackNavigator();

export const Admin = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...NavigationAnime,
      }}>
      {/* TABS */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllUsers" component={AllUsers} />
      <Stack.Screen name="Requests" component={Requests} />
      <Stack.Screen name="Settings" component={Settings} />
      {/* PROFILE */}
      <Stack.Screen name="DisplayProfile" component={DisplayProfile} />
      {/* OTHERS */}
      <Stack.Screen name="CreateAsset" component={CreateAsset} />
      <Stack.Screen name="AssetAdd" component={AssetAdd} />
      <Stack.Screen name="ListAsset" component={ListAsset} />
      <Stack.Screen name="AssetDetails" component={AssetDetails} />

      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
};
