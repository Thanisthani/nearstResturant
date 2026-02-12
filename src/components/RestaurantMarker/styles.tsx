import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  markerWrapper: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(100),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  iconContainer: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: '#7210FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  rating: {
    fontSize: moderateScale(12),
    fontFamily: 'Manrope-Bold',
    color: '#1A1A1A',
    marginRight: moderateScale(4),
  },
  name: {
    fontSize: moderateScale(11),
    fontFamily: 'Manrope-Medium',
    color: '#5F6368',
    maxWidth: scale(200),
  },
  triangleContainer: {
    marginTop: -moderateScale(2),
  },
});
