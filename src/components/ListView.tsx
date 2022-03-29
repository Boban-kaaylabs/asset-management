import React from 'react';
import {ScrollView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from './Icon';
import {ListItem} from './ListItem';
import {Mytext} from './Mytext';
import {StrengthBar} from './StrengthBar';

export const ListView = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{backgroundColor: 'white', flexGrow: 1}}>
      <Mytext
        style={{
          textAlign: 'center',
          marginTop: RFValue(25),
          fontWeight: 'bold',
          fontSize: RFValue(12),
        }}>
        Accomodations
      </Mytext>
      <StrengthBar position />
      <View style={{height: RFValue(30)}} />
      <ListItem />
      <View style={{position: 'absolute', right: 0}}>
        <Mytext style={{textAlign: 'right', padding: RFValue(5)}}>
          AiScoins💰
        </Mytext>
        <Mytext
          style={{
            textAlign: 'right',
            paddingHorizontal: RFValue(5),
            fontWeight: 'bold',
          }}>
          80
        </Mytext>
      </View>
      <View style={{position: 'absolute', left: RFValue(20), top: RFValue(20)}}>
        <Icon name="human-queue" size={40} style={{margin: 0}} color="black" />
      </View>
    </ScrollView>
  );
};
