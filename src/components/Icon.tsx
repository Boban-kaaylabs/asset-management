import React from 'react';
import {ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Vector from 'react-native-vector-icons/MaterialCommunityIcons';
interface Props {
  name: string;
  color?: string;
  style?: ViewStyle;
  size?: number;
}
export const Icon: React.FC<Props> = ({name, color, style, size}) => {
  return (
    <Vector
      style={[{margin: RFValue(5)}, {...style}]}
      name={name}
      size={size ? size : 18}
      color={color ? color : 'white'}
    />
  );
};
