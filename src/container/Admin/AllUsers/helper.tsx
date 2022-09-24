import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

import {Image, Mytext} from '../../../components/custom';
import {COLORS, SCREEN, shadows} from '../../../constants';
interface Props {
  data: any;
  onPress: (id: string) => void;
}

export const GridList = (props: Props) => {
  const {data, onPress} = props;

  return (
    <View style={{...shadows}}>
      <FlatList
        key={'1'}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}
        renderItem={({item}) => {
          const {id, firstName, lastName, email} = item;
          return (
            <TouchableOpacity onPress={() => onPress(id)}>
              <Image padding={5} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item}
      />
    </View>
  );
};

export const ListList = (props: Props) => {
  const {data, onPress} = props;

  return (
    <View style={{...shadows}}>
      <FlatList
        key={'2'}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          const {id, firstName, lastName, email} = item;
          return (
            <TouchableOpacity
              onPress={() => onPress(id)}
              style={{margin: RFValue(5)}}>
              <Image
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                width={SCREEN.width * 0.85}
                height={SCREEN.width * 0.85}
              />
              <View
                style={{
                  backgroundColor: COLORS.white,
                  padding: RFValue(10),
                  width: SCREEN.width * 0.85,
                  alignSelf: 'center',
                  borderBottomLeftRadius: RFValue(10),
                  borderBottomRightRadius: RFValue(10),
                }}>
                <Mytext>
                  {firstName} {lastName} | {email}
                </Mytext>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
