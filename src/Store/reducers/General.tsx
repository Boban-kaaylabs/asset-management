import {
  AUTH,
  TAB_CHANGE,
  LOADER,
  PREVIEW,
  ASSET_FIELDS,
  LOGIN,
  TOGGLE_MODAL,
  TABSET,
  AXIOS_PARAMS,
} from '../actionTypes';

const initialstate = {
  tabs: [],
  isLoading: false,
  isLogged: false,
  auth: '',
  showPreview: true,
  assetFields: [],
  openModal: false,
  axiosParams: {url: `asset-category/`},
};

type Action = {
  type: string;
  payload?: any;
};

function* generator() {
  let i = 0;
  while (true) {
    i++;
    yield i;
  }
}
const newNumber = generator();

export default (state: any = initialstate, action: Action) => {
  switch (action.type) {
    case AUTH:
      return {...state, auth: action.payload};
    case TABSET:
      return {...state, tabs: action.payload};
    case TAB_CHANGE:
      return {
        ...state,
        tabs: state.tabs.map((tab: any) => {
          if (action.payload !== tab.key) return {...tab, focused: false};
          return {...tab, focused: true};
        }),
      };
    case LOADER:
      return {...state, isLoading: action.payload};
    case AXIOS_PARAMS:
      return {...state, axiosParams: action.payload};
    case LOGIN:
      return {...state, isLogged: action.payload};
    case PREVIEW:
      return {...state, showPreview: action.payload};
    case ASSET_FIELDS:
      return {...state, assetFields: action.payload};
    case TOGGLE_MODAL:
      return {...state, openModal: action.payload};
    default:
      return state;
  }
};
