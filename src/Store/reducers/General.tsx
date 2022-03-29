import {END_DATE, LOADING, SET_DATA, START_DATE, REFRESH} from '../actionTypes';

const initialstate = {
  startdate: {open: false, date: 'Start Date'},
  enddate: {open: false, date: 'End Date'},
  loading: false,
  data: null,
  refresh: false,
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
    case START_DATE:
      return {
        ...state,
        startdate: action.payload,
      };
    case END_DATE:
      return {
        ...state,
        enddate: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case REFRESH:
      return {
        ...state,
        refresh: newNumber.next().value,
      };

    default:
      return state;
  }
};
