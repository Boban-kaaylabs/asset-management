import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

import {Card, Icon, Loader} from '../../../components/custom';
import {SetLoader} from '../../../Store/actions';
import {Title, Wrapper} from '../../../components/shared';
import {handleError, useAxios} from '../../../utils';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  navigation: any;
  title: string;
  route: any;
}
export const ListAsset = (props: Props) => {
  const {navigation, route} = props;
  const title = route.params.name;
  const catId = route.params.catId;
  const dispatch = useDispatch();
  const toast = useToast();
  const [axiosParams, setAxiosParams]: any = useState({
    url: `asset/?assetCategoryId=${catId}`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response?.success) {
      setData(response?.data);
    }
    handleError({error, toast});
  }, [response]);

  const onAddAsset = () => {
    navigation.navigate('AssetAdd', {name: 'Add a ' + title, catId});
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper navigation={navigation}>
      <Title title={title}>
        <Icon
          name={'plus'}
          padding={5}
          size={18}
          margin={10}
          onPress={onAddAsset}
        />
      </Title>

      <ScrollView>
        <View style={{paddingBottom: RFValue(20)}}>
          {data.map((i: any) => {
            const {values, assetStatus} = i;
            return (
              <Card
                item={{values, assetStatus}}
                onPress={() => navigation.navigate('AssetDetails', {data: i})}
              />
            );
          })}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
