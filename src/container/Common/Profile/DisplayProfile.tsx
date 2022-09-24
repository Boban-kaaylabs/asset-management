import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {List} from 'react-native-paper';

import {Icon, Loader, Mytext} from '../../../components/custom';
import {Wrapper} from '../../../components/shared';
import {COLORS, shadows} from '../../../constants';
import {IdCard} from './IdCard';
import {useToast} from 'react-native-toast-notifications';
import {handleError, useAxios} from '../../../utils';
interface Props {
  navigation: any;
  route: any;
}
interface IShortHand {
  title: string;
  onPress: () => void;
}
export const DisplayProfile = (props: Props) => {
  const {navigation, route} = props;
  const userId = route.params.id;
  const dispatch = useDispatch();
  const isLoading = useSelector((states: any) => states.GENERAL.isLoading);
  const list = [
    {
      id: '1',
      title: 'About Me',
      callback: () => {},
    },
    {
      id: '2',
      title: 'Assets',
      callback: () => {},
    },
  ];
  const toast = useToast();
  const [axiosParams, setAxiosParams]: any = useState({
    url: `user-profile/${userId}`,
  });
  const {response, loading, error}: any = useAxios(axiosParams);
  const [data, setData]: any = useState({});
  useEffect(() => {
    if (response?.success) {
      setData(response?.data);
    }
    handleError({error, toast});
  }, [response]);
  const ShortHand = (props: IShortHand) => {
    const {title, onPress} = props;
    return (
      <TouchableOpacity
        style={{
          padding: RFValue(10),
          marginHorizontal: RFValue(10),
          borderBottomWidth: RFValue(1),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={onPress}>
        <Mytext size={20}>{title}</Mytext>
        <Icon
          style={{
            shadowColor: COLORS.transparent,
            backgroundColor: COLORS.transparent,
          }}
          name="down"
          size={15}
          margin={5}
          padding={5}
        />
      </TouchableOpacity>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <Wrapper navigation={navigation}>
      <ScrollView>
        <IdCard data={data} />
        <View style={{margin: RFValue(10)}}>
          {list.map(item => {
            const {id, title, callback} = item;
            return (
              <View style={{...shadows, margin: RFValue(5)}}>
                <View style={{borderRadius: RFValue(5), overflow: 'hidden'}}>
                  <List.Accordion
                    style={{
                      backgroundColor: COLORS.white,
                      overflow: 'hidden',
                    }}
                    title={<Mytext size={20}>{title}</Mytext>}>
                    <View
                      style={{
                        backgroundColor: COLORS.white,
                        padding: RFValue(15),
                        paddingTop: RFValue(0),
                      }}>
                      <Mytext>{data?.email}</Mytext>
                    </View>
                  </List.Accordion>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
