import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';

import {Icon, Loader, Search} from '../../../components/custom';
import {Title, Wrapper} from '../../../components/shared';
import {handleError, useAxios} from '../../../utils';
import {GridList, ListList} from './helper';
interface Props {
  navigation: any;
  route: any;
}
export const AllUsers = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isLoading = useSelector((states: any) => states.GENERAL.isLoading);
  const [gridList, setGridList] = useState('grid');
  const [search, setSearch] = useState(false);
  const toast = useToast();
  const [axiosParams, setAxiosParams]: any = useState({
    url: `user-profile/`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (response?.success) {
      setData(response?.data?.users);
    }
    handleError({error, toast});
  }, [response]);
  const openSearch = () => {
    setSearch(true);
  };
  const onSearch = () => {
    setSearch(false);
  };

  const handleClick = (id: string) => {
    navigation.navigate('DisplayProfile', {id});
  };
  return loading ? (
    <Loader />
  ) : (
    <Wrapper tabs navigation={navigation}>
      {search ? (
        <Search
          placeholder="Search"
          value={''}
          onChangeText={() => {}}
          onPress={onSearch}
        />
      ) : (
        <Title title="List of Users">
          <View style={{flexDirection: 'row'}}>
            <Icon
              name={gridList}
              padding={5}
              size={18}
              margin={10}
              onPress={() => setGridList(p => (p === 'grid' ? 'list' : 'grid'))}
            />
            <Icon
              name={'search'}
              padding={5}
              size={18}
              margin={10}
              onPress={openSearch}
            />
          </View>
        </Title>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: RFValue(20)}}>
        {gridList === 'grid' ? (
          <GridList onPress={handleClick} data={data} />
        ) : (
          <ListList onPress={handleClick} data={data} />
        )}
      </ScrollView>
    </Wrapper>
  );
};
