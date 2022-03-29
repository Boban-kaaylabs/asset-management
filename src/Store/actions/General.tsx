import {END_DATE, LOADING, SET_DATA, START_DATE, REFRESH} from '../actionTypes';
interface DateProps {
  open: boolean;
  date: Date | string;
}
const StartDate = (payload: DateProps) => ({
  type: START_DATE,
  payload,
});
const EndDate = (payload: DateProps) => ({
  type: END_DATE,
  payload,
});
const SetLoader = () => ({
  type: LOADING,
});
const SetData = (payload: any) => ({
  type: SET_DATA,
  payload,
});
const Refresh = () => ({
  type: REFRESH,
});

export {StartDate, EndDate, SetLoader, SetData, Refresh};
