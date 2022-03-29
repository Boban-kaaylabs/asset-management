import React from 'react';
import {FlatList, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from './Icon';
import {Mytext} from './Mytext';

export const StrengthBar = ({
  name,
  position,
}: {
  name?: string;
  position?: boolean;
}) => {
  const brown = '#e8a279';
  const grey = '#e6e6e6';
  return (
    <View
      style={{
        backgroundColor: brown,
        width: '95%',
        position: position ? 'relative' : 'absolute',
        top: !position ? RFValue(175) : RFValue(5),
        alignSelf: 'center',
        padding: RFValue(10),
        borderTopRightRadius: RFValue(10),
      }}>
      <Mytext style={{marginHorizontal: RFValue(10)}}>
        {name} Profile Strength:{' '}
        <Mytext style={{fontWeight: 'bold'}}>Bronze</Mytext>
      </Mytext>
      <View
        style={{
          marginHorizontal: RFValue(20),
          width: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: RFValue(2),
            margin: RFValue(5),
            width: '95%',
            alignSelf: 'flex-end',
          }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({item: any}: any) => (
              <View
                style={{
                  width: RFValue(50),
                  height: RFValue(4),
                  backgroundColor: grey,
                }}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: RFValue(5), width: RFValue(2)}} />
            )}
            keyExtractor={item => item.toString()}
          />
        </View>
        <Icon
          name="medal"
          color="red"
          size={25}
          style={{position: 'absolute', margin: 0}}
        />
      </View>
    </View>
  );
};
