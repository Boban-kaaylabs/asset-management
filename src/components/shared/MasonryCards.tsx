import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import MasonryList from '@react-native-seoul/masonry-list';

import {COLORS, shadows} from '../../constants';
import {BackgroundImage} from '../custom/BackgroundImage';
import {Mytext} from '../custom/Mytext';
import {Icon, Loader} from '../custom';
import {AlertAction, handleError, useAxios} from '../../utils';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
interface Props {
  navigation: any;
  data: any;
  pageOnCreate?: string;
  commonPage?: string;
  onReload?: any;
}
const defaultAdd = [
  {
    assetCategoryId: '1235',
    assetCategoryName: 'Create',
    assetCount: '➕',
    create: true,
  },
];
export const MasonryCards = (props: Props) => {
  const {
    navigation,
    data = [],
    pageOnCreate = 'CreateAsset',
    commonPage = 'ListAsset',
    onReload,
  } = props;
  const {navigate} = navigation;
  const toast = useToast();
  const dispatch = useDispatch();
  const [axiosParams, setAxiosParams]: any = useState({});

  const {response, loading, error}: any = useAxios(axiosParams);

  useEffect(() => {
    if (response?.success) {
      toast.show(response.data);
      onReload({
        url: `asset-category/`,
        method: 'get',
      });
    }
    handleError({error, toast});
  }, [response, error]);

  const onDelete = (id: string) => {
    setAxiosParams({
      method: 'delete',
      url: `asset-category/?assetCategoryId=${id}`,
    });
  };
  const onCreate = (param?: any) => {
    navigate(pageOnCreate, param);
  };
  const onList = (name: string, catId: string) => {
    navigate(commonPage, {name, catId});
  };

  return loading ? (
    <Loader />
  ) : (
    <View>
      <MasonryList
        data={[...data, ...defaultAdd]}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: any) => {
          const {assetCategoryId, assetCategoryName, create, assetCount} = item;
          return (
            <View
              key={assetCategoryId}
              style={{...shadows, margin: RFValue(5)}}>
              <View
                style={{
                  margin: RFValue(10),
                  borderRadius: RFValue(10),
                  overflow: 'hidden',
                  width: RFValue(120),
                  height: RFValue(120),
                }}>
                <BackgroundImage>
                  <TouchableOpacity
                    onPress={() =>
                      create
                        ? onCreate()
                        : onList(assetCategoryName, assetCategoryId)
                    }
                    style={{
                      backgroundColor: COLORS.white,
                      width: RFValue(120),
                      height: RFValue(120),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Mytext size={35}>{assetCount}</Mytext>
                    <Mytext>{assetCategoryName}</Mytext>
                  </TouchableOpacity>
                </BackgroundImage>
              </View>
              {!assetCount ? (
                <View style={{position: 'absolute', right: 0}}>
                  <Icon
                    name="edit"
                    size={15}
                    margin={5}
                    padding={5}
                    radius={5}
                    onPress={() => onCreate({fromId: assetCategoryId})}
                  />
                  <Icon
                    name="delete"
                    iconColor={COLORS.failure}
                    size={15}
                    margin={5}
                    padding={5}
                    radius={5}
                    onPress={() =>
                      AlertAction({
                        title: 'Delete Category',
                        message: 'Are you sure you want to delete?',
                        id: assetCategoryId,
                        onDelete,
                      })
                    }
                  />
                </View>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};
