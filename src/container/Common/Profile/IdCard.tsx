import React from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {Image, Mytext} from '../../../components/custom';
import {COLORS, shadows} from '../../../constants';
interface Props {
  data: any;
}
export const IdCard = (props: Props) => {
  const {data} = props;
  const {firstName, lastName} = data;
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        width: '75%',
        borderRadius: RFValue(10),
        padding: RFValue(10),
        marginTop: RFValue(30),
        ...shadows,
      }}>
      <Image
        width={100}
        height={125}
        constainerStyle={{
          position: 'absolute',
          left: RFValue(-30),
          top: RFValue(-30),
        }}
      />
      <View style={{width: '70%', alignSelf: 'flex-end'}}>
        <Mytext size={17}>
          {firstName} {lastName}
        </Mytext>
        <Mytext style={{color: COLORS.grey}}>Software Engineer</Mytext>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Mytext size={17}>May '22</Mytext>
            <Mytext style={{color: COLORS.grey}}>working since</Mytext>
          </View>
          <View>
            <Mytext size={17}>name</Mytext>
            <Mytext style={{color: COLORS.grey}}>role</Mytext>
          </View>
        </View>
      </View>
    </View>
  );
};
