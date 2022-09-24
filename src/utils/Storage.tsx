import AsyncStorage from '@react-native-async-storage/async-storage';

const getLS = async (params: any) => {
  const {key, defaultValue = {}} = params;
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (err) {
    return defaultValue;
  }
};

const setLS = async (params: any) => {
  const {key, value} = params;
  try {
    const storeValue =
      typeof value !== 'string' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, storeValue);
  } catch (err) {
    return null;
  }
};

export {getLS, setLS};
