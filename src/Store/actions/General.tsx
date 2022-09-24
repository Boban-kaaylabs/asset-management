import {
  AUTH,
  LOADER,
  TAB_CHANGE,
  PREVIEW,
  ASSET_FIELDS,
  LOGIN,
  TOGGLE_MODAL,
  TABSET,
  AXIOS_PARAMS,
} from '../actionTypes';
const SetAuth = (payload: any) => ({
  type: AUTH,
  payload,
});
const TabSelection = (payload: any) => ({
  type: TABSET,
  payload,
});
const TabChange = (payload: number) => ({
  type: TAB_CHANGE,
  payload,
});
const SetLoader = (payload: boolean) => ({
  type: LOADER,
  payload,
});
const SetLogin = (payload: boolean) => ({
  type: LOGIN,
  payload,
});
const SetShowPreview = (payload: boolean) => ({
  type: PREVIEW,
  payload,
});
const SetAssetFields = (payload: any) => ({
  type: ASSET_FIELDS,
  payload,
});
const ToggleModal = (payload: boolean) => ({
  type: TOGGLE_MODAL,
  payload,
});
const SetApiQuery = (payload: any) => ({
  type: AXIOS_PARAMS,
  payload,
});
export {
  SetAuth,
  TabChange,
  SetLoader,
  SetShowPreview,
  SetAssetFields,
  SetLogin,
  ToggleModal,
  TabSelection,
  SetApiQuery,
};
