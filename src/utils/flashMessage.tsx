import { showMessage } from 'react-native-flash-message';
import { StyleSheet, Vibration } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const duration = 3500;

export const ErrorFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: 'default',
    backgroundColor: '#FF4D4F',
    color: '#FFFFFF',
    duration: duration,
  });
};

export const SuccessFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: 'default',
    backgroundColor: '#52C41A',
    color: '#FFFFFF',
    duration: duration,
  });
};

export const WarningFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: 'default',
    backgroundColor: '#FAAD14',
    color: '#FFFFFF',
    duration: duration,
  });
};

const styles = StyleSheet.create({
  textStyle: { paddingLeft: moderateScale(10) },
  titleStyle: { paddingLeft: moderateScale(10) },
});
