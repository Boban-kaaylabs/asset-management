import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {ScrollView} from 'react-native-gesture-handler';

import {Input, Loader} from '../../../components/custom';
import {Button} from '../../../components/custom/Button';
import {SetLoader} from '../../../Store/actions';
import {Title, Wrapper} from '../../../components/shared';
import {handleError, SearchFilter, useAxios} from '../../../utils';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  navigation: any;
}
const CREATE_FORM_TYPES = [
  {
    id: 1,
    name: 'Laptop',
  },
  {
    id: 2,
    name: 'Mouse',
  },
  {
    id: 3,
    name: 'Monitor',
  },
];
const DEFAULT_FORM_OBJECT = {
  id: '',
  type: '',
  description: '',
};
export const CreateRequest = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const toast = useToast();
  const fields = useSelector((states: any) => states.GENERAL.assetFields);
  const isLoading = useSelector((states: any) => states.GENERAL.isLoading);
  const [value, setValue] = useState(DEFAULT_FORM_OBJECT);
  const [hide, setHide] = useState(true);
  const [formTypes, setFormTypes] = useState(CREATE_FORM_TYPES);
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);

  const [axiosParams, setAxiosParams]: any = useState({
    url: `asset-category/`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response?.success) {
      setData(response?.data?.assetCategories);
    }
    handleError({error, toast});
  }, [response]);

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

  const onDone = () => {
    console.log('VVVV', value);
    return;
    const data = {
      assetCategoryId: 'string',
      description: 'string',
      id: 'string',
      status: 'OPEN',
    };
    setAxiosParams({
      method: 'post',
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Wrapper navigation={navigation}>
      <Title title="Create a request"></Title>
      <ScrollView
        scrollEnabled={outerScrollEnabled}
        contentContainerStyle={{paddingHorizontal: RFValue(20)}}>
        <View style={{paddingBottom: RFValue(20)}}>
          <Input
            order={8}
            hide={hide}
            list={data}
            rightIcon="down"
            placeholder="Select asset"
            value={value.type}
            onChangeText={onSearch}
            onSelect={onSelect}
          />

          <Input
            order={3}
            placeholder="Description"
            value={value.description}
            onChangeText={onChange('note')}
          />
          <Button title="Done" onPress={onDone} />
        </View>
      </ScrollView>
    </Wrapper>
  );
};
