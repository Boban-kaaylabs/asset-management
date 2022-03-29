import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {View} from 'react-native';
import {ListView} from './ListView';
export const Tabbar = () => {
  return (
    <Tabs
      defaultIndex={1}
      uppercase={false}
      style={{
        backgroundColor: '#fff',
        width: '60%',
        alignSelf: 'center',
        marginTop: RFValue(40),
        shadowColor: 'white',
      }}
      theme={{colors: {primary: 'black'}}}>
      <TabScreen label="Time View">
        <View style={{backgroundColor: 'white', flex: 1}} />
      </TabScreen>

      <TabScreen label="List View">
        <ListView />
      </TabScreen>
    </Tabs>
  );
};
