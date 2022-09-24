import React from 'react';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
interface Props {
  size?: number;
  width?: number;
  height?: number;
  padding?: number;
  style?: any;
  constainerStyle?: any;
  onPress?: () => void;
  uri?: string;
}

export const Image = (props: Props) => {
  const {
    size = 138,
    padding = 0,
    width,
    height,
    style,
    constainerStyle,
    uri = 'https://unsplash.it/400/400?image=1',
    onPress,
  } = props;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: RFValue(padding),
        alignSelf: 'center',
        ...constainerStyle,
      }}
      activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}>
      <FastImage
        style={{
          width: width ? width : RFValue(size),
          height: height ? height : RFValue(size),
          borderRadius: RFValue(10),
          ...style,
        }}
        source={{
          uri,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.high,
        }}
        // resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};
