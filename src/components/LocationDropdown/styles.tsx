import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5000,
    pointerEvents: 'box-none', // Very important for toggle
  },
  clippingContainer: {
    marginTop: verticalScale(60),
    overflow: 'hidden',
    pointerEvents: 'box-none',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(16),
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  optionText: {
    fontFamily: 'Manrope-Medium',
    fontSize: moderateScale(13),
    color: '#1A1A1A',
    marginLeft: moderateScale(10),
  },
  separator: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: moderateScale(4),
  },
});
