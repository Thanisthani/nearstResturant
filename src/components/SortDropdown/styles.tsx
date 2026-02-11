import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  clippingContainer: {
    marginTop: verticalScale(155),
    overflow: 'hidden',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    padding: moderateScale(8),
    width: moderateScale(200),
    marginLeft: moderateScale(16),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    paddingTop: moderateScale(4),
    marginBottom: moderateScale(8),
  },
  sortTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: moderateScale(14),
    color: '#1A1A1A',
  },
  closeBtn: {
    padding: moderateScale(4),
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  activeSortOption: {
    backgroundColor: '#F8F9FA',
  },
  sortOptionText: {
    fontFamily: 'Manrope-Medium',
    fontSize: moderateScale(13),
    color: '#5F6368',
    marginLeft: moderateScale(10),
  },
  activeSortOptionText: {
    color: '#7210FF',
    fontFamily: 'Manrope-Bold',
  },
  clearFilterBtn: {
    marginTop: moderateScale(4),
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingTop: moderateScale(4),
  },
  clearFilterText: {
    fontFamily: 'Manrope-Bold',
    fontSize: moderateScale(13),
    color: '#EF4444',
    textAlign: 'center',
    paddingVertical: moderateScale(8),
  },
});
