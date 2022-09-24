import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';

import {Loader, Mytext} from '../../../components/custom';
import {MasonryCards, Wrapper} from '../../../components/shared';
import {handleError, useAxios} from '../../../utils';
interface Props {
  navigation: any;
}
export const Home = (props: Props) => {
  const {navigation} = props;
  const toast = useToast();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [axiosParams, setAxiosParams]: any = useState({
    url: `asset-category/user`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response?.success) {
      setData(response?.data?.assetCategories);
    }
    handleError({error, toast});
  }, [response]);

  useEffect(() => {
    setAxiosParams({
      url: `asset-category/user`,
      method: 'get',
      refresh: focused,
    });
  }, [focused]);
  return loading ? (
    <Loader />
  ) : (
    <GestureHandlerRootView style={{flex: 1}}>
      <Wrapper tabs navigation={navigation}>
        <ScrollView contentContainerStyle={{paddingHorizontal: RFValue(20)}}>
          <View style={{paddingBottom: RFValue(20)}}>
            <Mytext size={25}>Hello Name,</Mytext>
            <Mytext size={10}>Welcome to Assists</Mytext>
          </View>
          <MasonryCards
            data={data}
            navigation={navigation}
            pageOnCreate="CreateRequest"
            commonPage="AssetDetails"
          />
        </ScrollView>
      </Wrapper>
    </GestureHandlerRootView>
  );
};
