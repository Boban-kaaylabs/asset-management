import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {ScrollView} from 'react-native-gesture-handler';

import {
  Input,
  Loader,
  Myswitch,
  Mytext,
  Options,
} from '../../../components/custom';
import {Button} from '../../../components/custom/Button';
import {
  SetApiQuery,
  SetAssetFields,
  SetLoader,
  SetShowPreview,
} from '../../../Store/actions';
import {
  CREATE_FORM_TYPES,
  DEFAULT_FORM_FIELDS,
  DEFAULT_FORM_OBJECT,
} from '../../../constants';
import {Wrapper} from '../../../components/shared';
import {handleError, SearchFilter, useAxios} from '../../../utils';
import {Preview} from './Preview';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  navigation: any;
  route: any;
}

export const CreateAsset = (props: Props) => {
  const {navigation, route} = props;
  const fromId = route?.params?.fromId;
  const dispatch = useDispatch();
  const toast = useToast();
  const fields = useSelector((states: any) => states.GENERAL.assetFields);
  const showPreview = useSelector((states: any) => states.GENERAL.showPreview);
  const isLoading = useSelector((states: any) => states.GENERAL.isLoading);
  const [assetName, setAssetName] = useState('');
  const [assetId, setAssetId] = useState('');
  const [value, setValue] = useState(DEFAULT_FORM_OBJECT);
  const [hide, setHide] = useState(true);
  const [edit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formTypes, setFormTypes] = useState(CREATE_FORM_TYPES);
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const [axiosParams, setAxiosParams]: any = useState({url: ''});

  const {response, loading, error}: any = useAxios(axiosParams);

  useEffect(() => {
    if (fromId) {
      setAxiosParams({
        url: `asset-category/${fromId}`,
      });
    }
    if (response?.data?.fields) {
      const newRes = response?.data?.fields?.filter(
        (field: any) => field.order !== 1 && field.order !== 2,
      );
      setAssetName(response?.data?.assetCategoryName);
      setAssetId(response?.data?.assetCategoryId);

      dispatch(SetAssetFields(newRes));
      return;
    }
    if (response?.success) {
      toast.show(response.data);
      setAssetName('');
    }
    handleError({error, toast});
  }, [response, error]);

  const onSave = () => {
    const newFields = fields.map((field: any, index: number) => {
      return {...field, order: index + 3};
    });
    const data = {
      assetCategoryId: assetId,
      assetCategoryName: assetName,
      fields: [...DEFAULT_FORM_FIELDS, ...newFields],
    };
    setAxiosParams({
      method: fromId ? 'put' : 'post',
      url: `asset-category/`,
      data,
    });
  };

  const onChange = (key: string) => (val: any) =>
    setValue({...value, [key]: val});

  const onSearch = (query: string) => {
    setValue({...value, type: query});
    setHide(false);
    let result = SearchFilter({data: CREATE_FORM_TYPES, query});
    setFormTypes(result);
  };

  const onSelect = (query: string) => {
    setValue({...value, type: query});
    setHide(true);
    setFormTypes(CREATE_FORM_TYPES);
  };
  const onEdit = (value: any) => {
    setEdit(true);
    setValue(value);
  };
  const onDone = () => {
    setShowForm(false);
    const newValue = {...value, order: uuid.v4().toString()};
    const isFieldNamePresent = fields.find(
      (field: any) => field.name === value.name,
    );
    if (isFieldNamePresent) return Alert.alert('Fieldname exist');
    const isPresent = fields.find((field: any) => field.order === value.order);
    let newFields;
    if (!isPresent) {
      newFields = [...fields, newValue];
    } else {
      newFields = fields.map((field: any) => {
        if (field.order === value.order) return value;
        else return field;
      });
    }
    dispatch(SetAssetFields(newFields));
    setValue(DEFAULT_FORM_OBJECT);
    setEdit(false);
  };

  const seePreview = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {!showPreview && (
          <Button
            title="Preview"
            onPress={() => dispatch(SetShowPreview(true))}
          />
        )}
        <Button title="Save" onPress={onSave} />
      </View>
    );
  };

  const secondSwitch = () => {
    switch (value.type) {
      case 'Textbox':
        return (
          <Myswitch
            order={5}
            leftText="Strings and Numbers"
            rightText="Only Numbers"
            isEnabled={value.number}
            toggleSwitch={onChange('number')}
          />
        );
      default:
        return null;
    }
  };
  const renderOptions = () => {
    const {type, options} = value;
    switch (type) {
      case 'Checkbox':
      case 'Radio Button':
      case 'Dropdown':
        return (
          <Options order={4} value={options} onChange={onChange('options')} />
        );
      default:
        return null;
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper navigation={navigation}>
      <View style={{paddingHorizontal: RFValue(20)}}>
        <Mytext size={25}>{fromId ? 'Edit' : 'Create'} asset</Mytext>
      </View>

      <ScrollView
        scrollEnabled={outerScrollEnabled}
        contentContainerStyle={{paddingHorizontal: RFValue(20)}}>
        <View style={{paddingBottom: RFValue(20)}}>
          <Input
            order={9}
            placeholder="Asset Name"
            value={assetName}
            onChangeText={setAssetName}
          />
          {showPreview ? (
            <Preview
              setShowForm={setShowForm}
              onEdit={onEdit}
              setScroll={setOuterScrollEnabled}
            />
          ) : null}

          {!showForm ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {seePreview()}
            </View>
          ) : (
            <View>
              <Input
                order={8}
                hide={hide}
                list={formTypes}
                rightIcon="down"
                placeholder="Type"
                value={value.type}
                onChangeText={onSearch}
                onSelect={onSelect}
              />
              {value.type ? (
                <View>
                  <Input
                    order={7}
                    placeholder="Field Name"
                    value={value.name}
                    onChangeText={onChange('name')}
                  />
                  <Myswitch
                    order={6}
                    leftText="Not Required"
                    rightText="Required"
                    isEnabled={value.required}
                    toggleSwitch={onChange('required')}
                  />
                  {secondSwitch()}
                  {renderOptions()}
                  <Input
                    order={3}
                    placeholder="Note"
                    value={value.note}
                    onChangeText={onChange('note')}
                  />
                  <Button title="Done" onPress={onDone} />
                </View>
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>

      {/* {showPreview ? <Preview /> : null} */}
    </Wrapper>
  );
};
