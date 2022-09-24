import React, {useState} from 'react';
import {Text, TextStyle, TouchableOpacity, View} from 'react-native';
import uuid from 'react-native-uuid';

import {Icon} from './Icon';
import {Input} from './Input';
import {Mytext} from './Mytext';
interface Props {
  order: number;
  value: any;
  onChange: any;
}

export const Options = (props: Props) => {
  const {order, value, onChange} = props;

  const [text, setText] = useState('');
  const [allText, setAllText]: any = useState([]);
  const onAdd = () => {
    if (!text) return;
    // let obj = {id: uuid.v4().toString(), name: text, selected: false};
    let newText = [...allText, text];
    setAllText(newText);
    setText('');
    onChange(newText, 'options');
  };
  const onDelete = (i: string) => {
    let newText = allText.filter((e: string) => e !== i);
    setAllText(newText);
  };
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '85%'}}>
          <Input
            order={order}
            placeholder="Options"
            value={text}
            onChangeText={text => setText(text)}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Icon name="plus" size={15} padding={10} onPress={onAdd} />
        </View>
      </View>
      {allText.map((i: any, index: number) => (
        <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
          <Mytext>{i.name || i}</Mytext>
          <Icon
            name="cross"
            size={10}
            padding={5}
            onPress={() => onDelete(i)}
          />
        </View>
      ))}
    </>
  );
};
