import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {List} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Timeline from 'react-native-timeline-flatlist';

import {
  Icon,
  Input,
  KeyValuePair,
  Loader,
  Mytext,
} from '../../../components/custom';
import {SetLoader, ToggleModal} from '../../../Store/actions';
import {Modalbar, Title, Wrapper} from '../../../components/shared';
import {COLORS, shadows, STATUS_DATA} from '../../../constants';
import {handleError, SearchFilter, useAxios} from '../../../utils';
import {useToast} from 'react-native-toast-notifications';
import {Button} from '../../../components/custom/Button';
import moment from 'moment';
import {onChange} from 'react-native-reanimated';

interface Props {
  navigation: any;
  title: string;
  route: any;
}
export const AssetDetails = (props: Props) => {
  const {navigation, route} = props;
  const data = route.params.data;
  const toast = useToast();

  const {assetCategoryName, images, values, assetStatus, assetId} = data;
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [hide, setHide] = useState(false);
  const [value, setValue]: any = useState({});
  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);

  const [selectedUser, setSelectedUser]: any = useState();

  const [axiosParams, setAxiosParams]: any = useState({
    url: `asset/history?assetId=${assetId}`,
  });
  const [axiosParams2, setAxiosParams2]: any = useState({
    url: `user-profile/`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);
  const {response: response2, error: error2}: any = useAxios(axiosParams2);

  useEffect(() => {
    if (response?.success) {
      const result = response?.data?.assetHistories.map((i: any) => {
        return {...i, date: moment(i.date).format('ll')};
      });
      setHistory(result);
    }
    handleError({error, toast});
  }, [response]);

  useEffect(() => {
    if (response2?.success) {
      setUsers(response2?.data?.users);
      setUsersCopy(response2?.data?.users);
    }
    handleError({error, toast});
  }, [response2]);
  const onSearch = (query: string) => {
    setValue({...value, name: query});
    setHide(false);
    let result = SearchFilter({data: users, query});
    setUsersCopy(result);
  };

  const onSelect = (query: string) => {
    setValue({...value, name: query});
    setHide(true);
    setUsersCopy(users);
  };
  const onChange = (key: string) => (val: any) =>
    setValue({...value, [key]: val});
  const onEditAsset = () => {
    navigation.navigate('AssetAdd', {name: 'Edit'});
  };

  const onStatusChange = () => {
    const assignee: any = users.find(
      (user: any) => user.firstName === value.name,
    );
    const data = {
      assetId,
      assigneeId: assignee.id,
      assetStatus: value.status,
      description: value.description,
    };
    setAxiosParams({
      url: `asset/`,
      method: 'put',
      data,
    });
  };

  const openModal = (status: string) => {
    setValue({...value, status});
    dispatch(ToggleModal(true));
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper navigation={navigation}>
      <Title title={assetCategoryName}>
        <Icon
          name={'edit'}
          padding={6}
          size={17}
          margin={5}
          onPress={onEditAsset}
        />
      </Title>

      <ScrollView>
        <View style={{paddingBottom: RFValue(20)}}>
          <View style={{...shadows, margin: RFValue(5)}}>
            <View style={{borderRadius: RFValue(5), overflow: 'hidden'}}>
              <List.Accordion
                style={{
                  backgroundColor: COLORS.white,
                  overflow: 'hidden',
                }}
                right={({isExpanded}) => (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flex: 1,
                    }}>
                    <Mytext style={{color: COLORS.link}}>
                      {isExpanded ? 'less' : 'more...'}
                    </Mytext>
                  </View>
                )}
                title={
                  <View>
                    <Mytext size={12}>Status</Mytext>
                    <Mytext size={15}>{assetStatus}</Mytext>
                  </View>
                }>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    padding: RFValue(15),
                    paddingTop: RFValue(0),
                  }}>
                  {values?.map((item: any, index: number) => {
                    const {value, fieldName} = item;
                    return (
                      <View>
                        <KeyValuePair
                          leftText={fieldName}
                          rightText={value}
                          justifyContent="space-between"
                          size={15}
                        />
                      </View>
                    );
                  })}

                  {assetStatus === 'AVAILABLE' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Button
                        title="Allocate"
                        onPress={() => openModal('WAITING_FOR_ACK')}
                      />
                      <Button
                        title="Damaged"
                        onPress={() => openModal('DAMAGED')}
                      />
                    </View>
                  )}
                  {assetStatus === 'RETURN_IN_PROCESS' && (
                    <Button
                      title="Returned"
                      onPress={() => openModal('AVAILABLE')}
                    />
                  )}
                </View>
              </List.Accordion>
            </View>
          </View>

          <View style={{margin: RFValue(10)}}>
            <Mytext size={20}>History</Mytext>
            <Timeline data={history} />
          </View>
        </View>
      </ScrollView>
      <Modalbar>
        <View>
          {value.status === 'WAITING_FOR_ACK' ? (
            <Input
              placeholder={'Select User'}
              rightIcon="down"
              hide={hide}
              order={9}
              value={value.name}
              list={usersCopy}
              onChangeText={onSearch}
              onSelect={onSelect}
            />
          ) : null}
          <Input
            order={1}
            placeholder={'Description'}
            value={value.description}
            onChangeText={onChange('description')}
          />
          <Button stretch title="Done" onPress={onStatusChange} />
        </View>
      </Modalbar>
    </Wrapper>
  );
};
