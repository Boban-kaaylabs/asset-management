import React from 'react';
import {View} from 'react-native';
import {
  BackgroundImage,
  Header,
  MyActivites,
  Mytext,
  StrengthBar,
  Tabbar,
} from '../components';
import {Main} from '../components/additional';
interface Props {
  name?: string;
  color?: string;
}
export const Home: React.FC<Props> = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <BackgroundImage />
      <Header />
      <MyActivites />
      <StrengthBar name="Overall" />
      <Tabbar /> */}
      <Main />
    </View>
  );
};
