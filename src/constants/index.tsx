import {Dimensions} from 'react-native';

export const CURRENTDATE = new Date();
export const SCREEN = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
export const ERROR = {type: 'danger'};

export const STORAGEKEY = {
  user: '_user',
};

export const COLORS = {
  primary: '#002e2e',
  background: 'rgba(255, 255, 255, 0.5)',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'rgba(255, 255, 255, 0)',
  transparent_white: 'rgba(255, 255, 255, 0.5)',
  transparent_black: 'rgba(0, 0, 0, 0.5)',
  grey: 'grey',
  success: 'green',
  failure: 'red',
  link: 'blue',
};

export const shadows = {
  shadowColor: COLORS.primary,
  shadowOffset: {
    width: 1.5,
    height: 3,
  },
  shadowOpacity: 1,
  shadowRadius: 1,
  elevation: 9,
};
export const CREATE_FORM_TYPES = [
  {
    id: 1,
    name: 'Textbox',
  },
  {
    id: 2,
    name: 'Checkbox',
  },
  {
    id: 3,
    name: 'Radio Button',
  },
  {
    id: 4,
    name: 'Date Picker',
  },
  {
    id: 5,
    name: 'Dropdown',
  },
];
export const TRACK_DATA = [
  {
    id: 1,
    name: 'Requested',
  },
  {
    id: 2,
    name: 'Processing',
  },
  {
    id: 3,
    name: 'Accepted',
  },
];

export const STATUS_DATA = [
  {
    id: 1,
    name: 'Allocated',
  },
  {
    id: 2,
    name: 'Available',
  },
  {
    id: 3,
    name: 'Unavailable',
  },
  {
    id: 4,
    name: 'Damaged',
  },
  {
    id: 5,
    name: 'Under Process',
  },
];

export const DEFAULT_FORM_OBJECT = {
  order: '',
  type: '',
  name: '',
  required: false,
  number: false,
  options: [],
  note: '',
};
export const DEFAULT_FORM_FIELDS = [
  {
    order: '1',
    type: 'Textbox',
    name: 'Serial Number',
    required: true,
    number: false,
    options: [],
    note: 'Unique Id of the device',
  },
  {
    order: '2',
    type: 'Textbox',
    name: 'Brand',
    required: true,
    number: false,
    options: [],
    note: 'Brand name of the device',
  },
];

export const ADMINTABS = [
  {key: 'Home', active: 'home', inActive: 'homeOutlined', focused: true},
  {key: 'AllUsers', active: 'user', inActive: 'userOutlined', focused: false},
  {
    key: 'Requests',
    active: 'request',
    inActive: 'requestOutlined',
    focused: false,
  },
  {
    key: 'Settings',
    active: 'settings',
    inActive: 'settingsOutlined',
    focused: false,
  },
];
export const USERTABS = [
  {key: 'Home', active: 'home', inActive: 'homeOutlined', focused: true},
  {
    key: 'Activities',
    active: 'bell',
    inActive: 'bellOutlined',
    focused: false,
  },
  {
    key: 'Requests',
    active: 'request',
    inActive: 'requestOutlined',
    focused: false,
  },
  {
    key: 'Settings',
    active: 'settings',
    inActive: 'settingsOutlined',
    focused: false,
  },
];
