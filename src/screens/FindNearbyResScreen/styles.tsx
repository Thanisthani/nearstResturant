import { StyleSheet } from 'react-native';
import { moderateScale, s, vs } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },
    iconButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(12),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    locationIconContainer: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(12),
        borderWidth: 1,
        borderColor: '#F2F2F2',
    },
    locationTextWrapper: {
        flex: 1,
    },
    offersNearText: {
        fontFamily: 'Manrope-Medium',
        fontSize: moderateScale(12),
        color: '#828282',
        marginBottom: vs(2),
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontFamily: 'Manrope-Bold',
        fontSize: moderateScale(14),
        color: '#1A1A1A',
        marginRight: moderateScale(4),
    },
});