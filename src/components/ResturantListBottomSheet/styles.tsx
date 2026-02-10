import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: moderateScale(16),
  },
  cardContainer: {
    marginBottom: moderateScale(20),
    backgroundColor: '#fff',
  },
  restaurantImage: {
    width: '100%',
    height: moderateScale(150),
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(12),
  },
  infoContainer: {
    marginBottom: moderateScale(12),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(4),
    gap: moderateScale(8),
  },
  restaurantName: {
    fontSize: moderateScale(16),
    fontFamily: 'Manrope-Bold',
    color: '#333',
    flex: 1,
  },
  discountBadge: {
    backgroundColor: '#7D00D0',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(6),
  },
  discountText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontFamily: 'Manrope-Regular',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: moderateScale(12),
    color: '#666',
    marginLeft: moderateScale(4),
    fontFamily: 'Manrope-SemiBold',
  },
  addressText: {
    fontSize: moderateScale(12),
    color: '#666',
    fontFamily: 'Manrope-SemiBold',
    flex: 1,
  },
  separator: {
    marginHorizontal: moderateScale(4),
    color: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(12),
  },
  btnConatiner: {
    width: '48%',
    flexDirection: 'row',
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Manrope-Bold',
    marginLeft: moderateScale(8),
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: moderateScale(16),
  },
});
