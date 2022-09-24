import React, {useEffect, useState} from 'react';
import {Alert, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

import {
  Checkbox,
  Date,
  Input,
  Loader,
  Mytext,
  Radio,
} from '../../../components/custom';
import {Button} from '../../../components/custom/Button';
import {SetLoader, ToggleModal} from '../../../Store/actions';
import {Modalbar, Wrapper} from '../../../components/shared';
import {handleError, PickImage, useAxios} from '../../../utils';
import {useToast} from 'react-native-toast-notifications';
import {ERROR} from '../../../constants';

interface Props {
  navigation: any;
  title: string;
  route: any;
}
export const AssetAdd = (props: Props) => {
  const {navigation, route} = props;
  const title = route.params.name;
  const catId = route.params.catId;
  const dispatch = useDispatch();
  const toast = useToast();
  const [hide, setHide] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate]: any = useState(moment().format('L'));
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const [axiosParams, setAxiosParams]: any = useState({
    url: `asset-category/${catId}`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);
  const [data, setData]: any = useState([]);
  const [uri, setUri]: any = useState([]);

  useEffect(() => {
    if (response?.success) {
      setData(response?.data?.fields);
    }
    handleError({error, toast});
  }, [response]);

  const onChange = (name: string, value: any) => {
    let result: any = data.map((item: any) => {
      if (item.name !== name) return item;
      return value;
    });
    setData(result);
    //  setValue({...value, [name]: value});
    // console.log('NAME VALUE:', name, value);
    // let newFieldsCopy = fieldsCopy.map((field: any) => {
    //   const {name} = field;
    //   if (name !== name) return field;
    //   return value;
    // });
    // setHide(true);
    // setFieldsCopy(newFieldsCopy);
  };

  // const onSelect = (obj: any) => (query: any) => {
  //   const {name} = obj;
  //   const val = {
  //     fieldName: name,
  //     value: query,
  //   };
  //   const newVal = values.map((item: any) => {
  //     const {fieldName} = item;
  //     if (name !== fieldName) return val;
  //     return {
  //       ...item,
  //       val,
  //     };
  //   });
  // };

  const setChange = (value: any, name: string) => {
    let result: any = data.map((item: any) => {
      if (item.name !== name) return item;
      return {
        ...item,
        value,
      };
    });
    setData(result);
  };

  const onSubmit = () => {
    let res: any = data?.map(({name, value, required, ...rest}: any) => {
      if (required && !value) {
        toast.show(`${name} is mandatory field`, ERROR);
        return {
          fieldName: name,
          value,
        };
      }
      return {
        fieldName: name,
        value,
      };
    });
    const result = {
      assetCategoryId: catId,
      values: res,
    };
    const formData = new FormData();
    formData.append('assetVO', JSON.stringify(result));
    formData.append('images', uri);
    // fetch(`asset/`, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    setAxiosParams({
      url: `asset/`,
      method: 'POST',
      data: formData,
      formdata: true,
      heading: {
        headers: {
          // 'Content-Type': 'multipart/form-data',
        },
      },
    });
  };

  const renderOptions = (obj: any) => {
    const {name, type, value = '', options} = obj;

    switch (type.toLowerCase()) {
      case 'checkbox':
        return (
          <Checkbox
            data={options}
            title={name}
            value={value}
            setValue={setChange}
          />
        );
      case 'radio button':
        return (
          <Radio
            data={options}
            title={name}
            onSelect={setChange}
            value={value}
          />
        );
      case 'dropdown':
        return (
          <Input
            placeholder={name}
            rightIcon="down"
            hide={hide}
            order={9}
            value={value}
            list={options}
            typeEnabled={false}
            onSelect={setChange}
          />
        );
      case 'textbox':
        return (
          <Input
            order={1}
            placeholder={name}
            value={value}
            onChangeText={(t: string) => {
              obj.value = t;
              onChange(name, obj);
            }}
          />
        );
      case 'date picker':
        return (
          <Date
            title={name}
            date={{open: showPicker, date: moment(value).format('L') || date}}
            onPress={() => setShowPicker(true)}
            setDate={setChange}
          />
        );

      default:
        return null;
    }
  };
  const openImage = async (action: 'openCamera' | 'openPicker') => {
    const options = {
      //   cropping: true,
    };
    try {
      const imgData: any = await PickImage({action, options});
      setUri([...uri, imgData]);
      console.log(imgData);

      Alert.alert(imgData.path);
    } catch (error) {
      console.log('ERROR:', error);
    } finally {
      dispatch(ToggleModal(false));
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper navigation={navigation}>
      <View style={{paddingHorizontal: RFValue(20)}}>
        <Mytext size={25}>{title}</Mytext>
      </View>
      <ScrollView
        scrollEnabled={outerScrollEnabled}
        contentContainerStyle={{paddingHorizontal: RFValue(20)}}>
        <View style={{paddingBottom: RFValue(20)}}>
          {data.map((i: any) => {
            return renderOptions(i);
          })}
        </View>
        {uri &&
          uri.map((item: any) => {
            return (
              <Image
                key={item.creationDate}
                source={{uri: item.path}}
                style={{
                  height: RFValue(75),
                  width: RFValue(75),
                  borderRadius: RFValue(10),
                }}
              />
            );
          })}
        <Mytext onPress={() => dispatch(ToggleModal(true))}>
          + Upload Image
        </Mytext>

        <Button stretch title="Submit" onPress={onSubmit} />

        <Modalbar>
          <Mytext size={20} onPress={() => openImage('openCamera')}>
            Take a photo
          </Mytext>
          <Mytext size={20} onPress={() => openImage('openPicker')}>
            Select from gallery
          </Mytext>
        </Modalbar>
      </ScrollView>
    </Wrapper>
  );
};
