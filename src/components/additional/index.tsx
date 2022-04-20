import React, {useEffect, useMemo} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SetData, SetLoader} from '../../Store/actions';
import {Loader} from './../Loader';
import {Mytext} from './../Mytext';

export const Main = () => {
  const loading = useSelector((states: any) => states.GENERAL.loading);
  const apiData = useSelector((states: any) => states.GENERAL.data);

  const dispatch = useDispatch();
  const [colors, setColors]: any = React.useState(null);
  const [page, setPage]: any = React.useState(1);

  const getRandomColor = () => {
    var letters = [...'9ABCDEF'];
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };
  // let totalColors = apiData?.length + 10 || 10;
  let array = useMemo(() => {
    return [...Array.from(Array(1000)).map(i => getRandomColor())];
  }, [apiData]);

  useEffect(() => {
    setColors(array);
    apiCall();
  }, []);

  const apiCall = () => {
    console.log('page number is ' + page);
    dispatch(SetLoader());
    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=10`)
      .then(response => response.json())
      .then(responseJson => {
        console.log('response ', responseJson);
        setPage((prev: number) => prev + 1);
        if (apiData) return dispatch(SetData([...apiData, ...responseJson]));
        dispatch(SetData(responseJson));
      })
      .catch(error => {
        console.log('error:', error);
        if (apiData) return dispatch(SetData(apiData));
        dispatch(SetData([]));
      });
  };

  const title = (item: any) => {
    const {name, id} = item;
    return (
      <Mytext
        style={{
          fontWeight: 'bold',
        }}>
        {id}. {name}
      </Mytext>
    );
  };
  const left = (item: any) => (
    <Image
      source={{uri: item.image_url}}
      style={{
        height: RFValue(70),
        width: RFValue(70),
        resizeMode: 'contain',
        margin: RFValue(5),
      }}
    />
  );

  return (
    <>
      <Text />
      <FlatList
        data={apiData}
        showsVerticalScrollIndicator={false}
        onEndReached={apiCall}
        onEndReachedThreshold={0.7}
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
              }}
              title={title(item)}
              titleStyle={{color: 'white'}}
              left={() => left(item)}>
              <View
                style={{
                  backgroundColor: colors?.[index],
                  width: '100%',
                  paddingLeft: RFValue(10),
                  paddingRight: RFValue(10),
                  paddingVertical: RFValue(10),
                }}>
                <Mytext>{item.description}</Mytext>
              </View>
            </List.Accordion>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: RFValue(15), width: RFValue(2)}} />
        )}
        keyExtractor={item => item.id}
      />
      <Loader visible={loading} />
    </>
  );
};
