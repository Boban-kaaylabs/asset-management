import React, {useEffect, useMemo} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SetData, SetLoader} from '../Store/actions';
import {Loader} from './Loader';
import {Icon} from './Icon';
import {Mytext} from './Mytext';
import moment from 'moment';

export const ListItem = () => {
  const loading = useSelector((states: any) => states.GENERAL.loading);
  const refresh = useSelector((states: any) => states.GENERAL.refresh);
  const apiData = useSelector((states: any) => states.GENERAL.data);

  const dispatch = useDispatch();
  const [colors, setColors]: any = React.useState(null);
  const getRandomColor = () => {
    var letters = [...'123456789AB'];
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };
  let array = useMemo(() => {
    return [...Array.from(Array(10)).map(i => getRandomColor())];
  }, []);

  useEffect(() => {
    setColors(array);
    apiCall();
  }, [refresh]);

  const apiCall = () => {
    dispatch(SetLoader());
    fetch('https://api.npoint.io/f775f0f7e5ed2caa0f72')
      .then(response => response.json())
      .then(responseJson => {
        console.log('response ', responseJson);
        dispatch(SetData(responseJson));
      })
      .catch(error => {
        console.log('error:', error);
        dispatch(SetData(null));
      });
  };

  const title = (item: any) => {
    const {contentName} = item;
    return (
      <View style={{paddingVertical: RFValue(5)}}>
        <Mytext
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          {contentName}
        </Mytext>
      </View>
    );
  };

  const description = (item: any) => {
    const {updated, coinsEarned} = item;

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Mytext style={{color: 'white'}}>Chennai</Mytext>
        <Mytext style={{color: 'white', paddingVertical: RFValue(5)}}>
          {moment(updated).format('hh:mm YYYY MM DD')}
        </Mytext>
        <Mytext style={{color: 'white', fontSize: RFValue(11)}}>
          {coinsEarned} AiScoins💰
        </Mytext>
      </View>
    );
  };
  const left = (item: any) => (
    <Image
      source={{uri: item.contentImgUrl}}
      style={{
        height: RFValue(70),
        width: RFValue(70),
        resizeMode: 'contain',
        margin: RFValue(5),
      }}
    />
  );
  const right = (item: any, isExpanded: boolean) => {
    const {totalContentCoins} = item;

    return (
      <View
        style={{
          alignItems: 'flex-end',
          height: RFValue(78),
        }}>
        <Mytext
          style={{color: 'white', fontWeight: 'bold', padding: RFValue(2)}}>
          {totalContentCoins} AiScoins💰
        </Mytext>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={40}
          style={{margin: 0, paddingTop: RFValue(5)}}
        />
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={apiData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}: {item: any; index: number}) => (
          <View
            style={{
              backgroundColor: 'white',
              width: '95%',
              alignSelf: 'center',
              borderRadius: RFValue(10),
              overflow: 'hidden',
            }}>
            <List.Accordion
              style={{
                backgroundColor: colors?.[index],
                width: '100%',
                margin: 0,
                padding: 0,
              }}
              title={title(item)}
              description={description(item)}
              titleStyle={{color: 'white'}}
              right={({isExpanded}) => right(item, isExpanded)}
              left={() => left(item)}>
              <View style={{backgroundColor: colors?.[index], width: '100%'}}>
                {item.visitHistory.map((item: any) => {
                  const {coinExpiryDate, endTime, startTime, coinsEarned} =
                    item;
                  return (
                    <View
                      style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Mytext
                        style={{
                          fontSize: RFValue(11),
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        {moment(coinExpiryDate).format('YYYY MM DD')}
                        {'  '}
                        {moment(startTime).format('hh:mm')}
                        {' - '}
                        {moment(endTime).format('hh:mm')}
                        {' 🕓 '}
                        {coinsEarned} AiScoins💰
                      </Mytext>
                    </View>
                  );
                })}
                <TouchableOpacity
                  style={{
                    backgroundColor: 'grey',
                    alignSelf: 'center',
                    margin: RFValue(10),
                    paddingHorizontal: RFValue(20),
                    paddingVertical: RFValue(5),
                    flexDirection: 'row',
                    borderRadius: RFValue(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Mytext
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    View more
                  </Mytext>
                  <Icon name="arrow-top-right-bold-box-outline" size={25} />
                </TouchableOpacity>
              </View>
            </List.Accordion>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: RFValue(15), width: RFValue(2)}} />
        )}
        keyExtractor={item => item.activityId}
      />
      <Loader visible={loading} />
    </>
  );
};
