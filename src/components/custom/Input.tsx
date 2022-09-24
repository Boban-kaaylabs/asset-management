import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {COLORS, SCREEN, shadows} from '../../constants';
import {svg} from '../assets';
import {Mytext} from './Mytext';
interface Props {
  placeholder: string;
  onPress?: () => void;
  leftIcon?: string;
  rightIcon?: string;
  list?: any;
  value: string;
  onChangeText?: (t: string) => void;
  order: number;
  hide?: boolean;
  onSelect?: (t: string, v: string) => void;
  width?: number | string;
  typeEnabled?: boolean;
}
export const Input = (props: Props) => {
  const {
    list = null,
    onPress,
    rightIcon = null,
    leftIcon,
    order,
    hide,
    onSelect,
    width,
    typeEnabled = true,
    ...rest
  } = props;
  useEffect(() => {
    if (rest.value) return setHidden(hide);
    setHidden(true);
  }, [rest.value]);
  useEffect(() => {
    setFeed(list);
  }, [list]);

  const [hidden, setHidden] = useState(hide);
  const [feed, setFeed] = useState(list);
  const RightIcon = () => {
    let Right = rightIcon && svg[rightIcon as keyof typeof svg].default;
    switch (rightIcon) {
      case null:
        return <Text />;
      default:
        return (
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              setFeed(list);
              setHidden(!hidden);
            }}>
            <Right
              fill={COLORS.grey}
              height={RFValue(15)}
              width={RFValue(15)}
            />
          </TouchableOpacity>
        );
    }
  };

  return (
    <View
      style={{
        position: 'relative',
        zIndex: order,
        marginVertical: RFValue(5),
        width: width ? width : undefined,
      }}>
      <Mytext>{rest.placeholder + ' :'}</Mytext>
      <View
        style={{
          borderBottomWidth: RFValue(1),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <TextInput
            pointerEvents={typeEnabled ? 'auto' : 'none'}
            placeholderTextColor={COLORS.grey}
            style={{
              fontSize: RFValue(15),
              color: COLORS.black,
              padding: RFValue(5),
            }}
            // onFocus={() => dispatch(FocusedInput(props.placeholder))}
            {...rest}
            //   secureTextEntry={
            //     props.secureTextEntry ? props.secureTextEntry && !hide : false
            //   }
            //   placeholder={placeholder}
          />
          {!hidden ? (
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.white,
                top: RFValue(35),
                width: SCREEN.width * 0.8,
                ...shadows,
              }}>
              <FlatList
                data={feed}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      onSelect &&
                      onSelect(
                        item?.name ||
                          item?.firstName ||
                          item ||
                          item.assetCategoryId,
                        rest.placeholder,
                      )
                    }
                    style={{padding: RFValue(5)}}>
                    <Mytext>
                      {item?.name ||
                        item?.firstName ||
                        item ||
                        item.assetCategoryName}
                    </Mytext>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item?.id || item}
              />
            </View>
          ) : null}
        </View>
        {RightIcon()}
      </View>
    </View>
  );
};
