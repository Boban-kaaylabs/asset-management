import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';

import {Card, Loader, Mytext} from '../../../components/custom';
import {Modalbar, Title, Wrapper} from '../../../components/shared';
import {TRACK_DATA} from '../../../constants';
import {ToggleModal} from '../../../Store/actions';
import {handleError, useAxios} from '../../../utils';
interface Props {
  navigation: any;
  route: any;
}
export const Requests = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const toast = useToast();

  const [axiosParams, setAxiosParams]: any = useState({
    url: `user-asset-request/`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);

  useEffect(() => {
    if (response?.success) {
      setData(response?.data);
    }
    handleError({error, toast});
  }, [response]);
  const [data, setData] = useState([]);

  return loading ? (
    <Loader />
  ) : (
    <Wrapper tabs navigation={navigation}>
      <Title title="Requests"></Title>
      <ScrollView>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => {
            const {status, username, assetCategoryName} = item;
            return (
              <Card
                item={{status, username, assetCategoryName}}
                onPressTrack={() => dispatch(ToggleModal(true))}
              />
            );
          }}
          keyExtractor={(item: any) => item.id}
        />
      </ScrollView>
      <Modalbar>
        {TRACK_DATA.map((i: any) => {
          const {name} = i;
          return (
            <Mytext size={20} onPress={() => dispatch(ToggleModal(false))}>
              {name}
            </Mytext>
          );
        })}
      </Modalbar>
    </Wrapper>
  );
};
