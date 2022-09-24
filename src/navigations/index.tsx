import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ADMINTABS, USERTABS} from '../constants';
import {TabSelection} from '../Store/actions';
import {Admin} from './Admin';
import {Auth} from './Auth';
import {User} from './User';

export const RootStack = () => {
  const dispatch = useDispatch();
  const auth = useSelector((states: any) => states.GENERAL.auth);
  useEffect(() => {
    dispatch(
      TabSelection(auth?.userRole === 'ROLE_USER' ? USERTABS : ADMINTABS),
    );
  }, [auth]);
  return !auth ? (
    <Auth />
  ) : auth?.userRole === 'ROLE_USER' ? (
    <User />
  ) : (
    <Admin />
  );
};
