import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Provider} from 'react-redux';
import {Home} from './src/container/Home';
import Store from './src/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <Home />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
