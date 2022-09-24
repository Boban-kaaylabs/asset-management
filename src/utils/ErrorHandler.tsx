import {ERROR} from '../constants';

export const handleError = ({error, toast}: any) => {
  if (error.status === 400) {
    toast.show('VALIDATION ERROR', ERROR);
    return;
  }
  if (error.status === 401) {
    toast.show('INVALID CREDENTIALS', ERROR);
    return;
  }
  if (error.status === 403) {
    toast.show('ACCESS DENIED', ERROR);
    return;
  }
  if (error.status === 404) {
    toast.show('SERVER DOWN', ERROR);
    return;
  }
  if (error.status === 500) {
    toast.show('TECHNICAL ERROR', ERROR);
    return;
  }
};
