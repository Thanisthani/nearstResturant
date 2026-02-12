import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(24),
    padding: moderateScale(24),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  iconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: 'rgba(114, 16, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  message: {
    fontSize: moderateScale(14),
    color: '#5F6368',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginBottom: moderateScale(24),
  },
  button: {
    width: '100%',
    paddingVertical: moderateScale(14),
    backgroundColor: '#7210FF',
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
