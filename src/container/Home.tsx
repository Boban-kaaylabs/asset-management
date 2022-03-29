import React from 'react';
import {View} from 'react-native';
import {
  BackgroundImage,
  Header,
  MyActivites,
  StrengthBar,
  Tabbar,
} from '../components';
interface Props {
  name?: string;
  color?: string;
}
export const Home: React.FC<Props> = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackgroundImage />
      <Header />
      <MyActivites />
      <StrengthBar name="Overall" />
      <Tabbar />
    </View>
  );
};
