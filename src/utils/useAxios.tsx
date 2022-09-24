import {useState, useEffect} from 'react';
import axios from 'axios';
import {getLS} from './Storage';
import {STORAGEKEY} from '../constants';
import {useDispatch, useSelector} from 'react-redux';

axios.defaults.baseURL = 'https://assist-kl.herokuapp.com/api/v1/';

axios.interceptors.request.use(
  async function (successfulReq: any) {
    try {
      let userData = await getLS({key: STORAGEKEY.user});
      if (userData) {
        let token = userData?.jwtToken;
        successfulReq.headers['Authorization'] = `Bearer ${token}`;
      } else {
      }
    } catch (e) {
      console.log('catch in interceptor:', e);
    }
    return successfulReq;
  },
  function (error) {
    return Promise.reject(error);
  },
);
interface Props {
  url?: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  refresh?: any;
  heading?: any;
}
export const useAxios = ({
  url = '',
  method = 'get',
  data,
  refresh = null,
  heading,
}: Props) => {
  const [response, setResponse] = useState(refresh);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    setloading(true);
    try {
      const res = await axios[method](url, data, heading);
      console.log('AXIOS DATA', res);
      setResponse(res.data);
    } catch (error: any) {
      console.log('ERROR', error.response);
      setError(error?.response);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (url) fetchData();
  }, [method, url, data, refresh]);

  return {response, error, loading};
};
