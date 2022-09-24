import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {LogBox, SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {ToastProvider} from 'react-native-toast-notifications';

import {BackgroundImage, Mytext} from './src/components/custom';
import {COLORS} from './src/constants';
import {RootStack} from './src/navigations';
import Store from './src/Store';
import {enableScreens} from 'react-native-screens';
import {RFValue} from 'react-native-responsive-fontsize';

LogBox.ignoreAllLogs();
enableScreens(true);
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <ToastProvider
          duration={2000}
          renderToast={toast => (
            <View
              style={[
                styles.toastBody,
                {
                  backgroundColor:
                    toast.type === 'danger' ? COLORS.failure : COLORS.success,
                },
              ]}>
              <Mytext style={styles.toastText}>{toast.message}</Mytext>
            </View>
          )}>
          <BackgroundImage>
            <NavigationContainer theme={navTheme}>
              <RootStack />
            </NavigationContainer>
          </BackgroundImage>
        </ToastProvider>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  toastBody: {
    alignSelf: 'center',
    width: '98%',
    padding: RFValue(10),
    borderRadius: RFValue(5),
    marginBottom: RFValue(15),
  },
  toastText: {
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default App;
