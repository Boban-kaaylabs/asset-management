import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';

import {Loader} from '../../../components/custom';
import {Title, Wrapper} from '../../../components/shared';
interface Props {
  navigation: any;
  route: any;
}
export const Activities = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isLoading = useSelector((states: any) => states.GENERAL.isLoading);
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([
    {title: 'Event 1', description: 'Event 1 Description'},
    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
  ]);
  useEffect(() => {}, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Wrapper tabs navigation={navigation}>
      <Title title="Activities"></Title>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: RFValue(20)}}>
        {/* {data.map(i => {
          return (
            <View
              style={{
                paddingVertical: RFValue(10),
                borderBottomWidth: RFValue(1),
              }}>
              <Mytext>Assigned to Boban on 22 Jul, 2022</Mytext>
            </View>
          );
        })} */}

        <Timeline data={data} />
      </ScrollView>
    </Wrapper>
  );
};
