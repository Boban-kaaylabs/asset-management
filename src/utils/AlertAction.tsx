import {Alert} from 'react-native';
interface Props {
  title: string;
  message: string;
  id: string;
  onDelete: (id: string) => void;
}

export const AlertAction = ({title, message, id, onDelete}: Props) => {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
    },
    {
      text: 'OK',
      onPress: () => onDelete(id),
    },
  ]);
};
