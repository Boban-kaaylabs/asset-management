import ImagePicker from 'react-native-image-crop-picker';
interface IParams {
  action: 'openCamera' | 'openPicker';
  options: any;
}
export const PickImage = (params: IParams) => {
  const {action, options = {}} = params;
  return new Promise((resolve, reject) => {
    ImagePicker[action](options).then(image => {
      resolve(image);
      reject(image);
    });
  });
};
