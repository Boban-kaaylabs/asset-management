import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector, useDispatch} from 'react-redux';

import {COLORS, shadows} from '../../constants';
import {ToggleModal} from '../../Store/actions';

interface Props {
  children: any;
}
export const Modalbar = (props: Props) => {
  const {children} = props;
  const dispatch = useDispatch();
  const isOpen: any = useSelector((states: any) => states.GENERAL.openModal);

  //   useEffect(() => {
  //     setData(modalData);
  //   }, [modalData]);

  return (
    <Modal
      transparent={true}
      visible={isOpen}
      onDismiss={() => dispatch(ToggleModal(false))}>
      <TouchableOpacity
        onPressIn={() => dispatch(ToggleModal(false))}
        style={{
          flex: 1,
          backgroundColor: COLORS.transparent_black,
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              position: 'absolute',
              width: '90%',
              backgroundColor: COLORS.white,
              padding: RFValue(10),
              borderRadius: RFValue(10),
              ...shadows,
            }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
