import React, {useState} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useDispatch, useSelector} from 'react-redux';

import {SCREEN} from '../../../constants';
import {Mytext} from '../../../components/custom/Mytext';
import {
  CheckboxPreview,
  DatePreview,
  DropDownPreview,
  InputPreview,
  RadioPreview,
} from './helper';
import {Icon} from '../../../components/custom';
import {SetAssetFields, SetShowPreview} from '../../../Store/actions/General';
import {Button} from '../../../components/custom/Button';
interface Props {
  setScroll: (v: boolean) => void;
  setShowForm: (v: boolean) => void;
  onEdit: (v: any) => void;
}

export const Preview = ({setScroll, setShowForm, onEdit}: Props) => {
  const dispatch = useDispatch();
  const data = useSelector((states: any) => states.GENERAL.assetFields);

  const renderComponent = (item: any) => {
    const {name, type, options} = item;

    switch (type) {
      case 'Textbox':
        return <InputPreview placeholder={name} />;
      case 'Checkbox':
        return <CheckboxPreview data={options} title={name} />;
      case 'Radio Button':
        return <RadioPreview data={options} title={name} />;
      case 'Date Picker':
        return <DatePreview title={name} />;
      case 'Dropdown':
        return <DropDownPreview placeholder={name} data={options} />;
    }
  };

  const renderItem = ({item, drag, isActive}: any) => {
    return (
      <ScaleDecorator>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{width: SCREEN.width * 0.65}}
            key={item}
            onLongPress={drag}
            disabled={false}>
            <View>{renderComponent(item)}</View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="edit"
              size={15}
              margin={5}
              padding={5}
              radius={5}
              onPress={() => {
                onEdit(item);
                dispatch(SetShowPreview(false));
                setShowForm(true);
              }}
            />
            <Icon
              name="delete"
              size={15}
              margin={5}
              padding={5}
              radius={5}
              onPress={() => {
                let filterData = data.filter(
                  (i: any) => i.order !== item.order,
                );
                dispatch(SetAssetFields(filterData));
              }}
            />
          </View>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <NestableScrollContainer>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Mytext style={{textAlign: 'center'}}>PREVIEW</Mytext>
        <Button
          width={120}
          title="Add new field"
          onPress={() => {
            dispatch(SetShowPreview(false));
            setShowForm(true);
          }}
        />
      </View>
      <View>
        <InputPreview placeholder={'Serial Number'} />
        <InputPreview placeholder={'Brand'} />
        <NestableDraggableFlatList
          nestedScrollEnabled={true}
          data={data}
          keyExtractor={(item: any, index) => item}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onDragBegin={() => setScroll(false)}
          onDragEnd={({data}) => {
            dispatch(SetAssetFields(data));
            setScroll(true);
          }}
        />
      </View>
    </NestableScrollContainer>
  );
};
