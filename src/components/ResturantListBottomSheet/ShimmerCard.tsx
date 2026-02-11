import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { moderateScale } from 'react-native-size-matters';

const ShimmerCard = () => {
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shimmerValue.value,
      [0, 0.5, 1],
      [0.3, 0.7, 0.3],
    );
    return { opacity };
  });

  return (
    <View style={styles.cardContainer}>
      {/* Image Shimmer */}
      <Animated.View
        style={[styles.restaurantImage, styles.shimmer, animatedStyle]}
      />

      {/* Info Container */}
      <View style={styles.infoContainer}>
        {/* Title Row */}
        <View style={styles.titleRow}>
          <Animated.View
            style={[styles.titleShimmer, styles.shimmer, animatedStyle]}
          />
          <Animated.View
            style={[styles.badgeShimmer, styles.shimmer, animatedStyle]}
          />
        </View>

        {/* Rating Row */}
        <View style={styles.ratingRow}>
          <Animated.View
            style={[styles.ratingShimmer, styles.shimmer, animatedStyle]}
          />
        </View>
      </View>

      {/* Button Row */}
      <View style={styles.buttonRow}>
        <Animated.View
          style={[styles.buttonShimmer, styles.shimmer, animatedStyle]}
        />
        <Animated.View
          style={[styles.buttonShimmer, styles.shimmer, animatedStyle]}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: moderateScale(20),
    marginHorizontal: moderateScale(16),
    backgroundColor: '#fff',
  },
  restaurantImage: {
    width: '100%',
    height: moderateScale(150),
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(12),
  },
  shimmer: {
    backgroundColor: '#E0E0E0',
  },
  infoContainer: {
    marginBottom: moderateScale(12),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(8),
    gap: moderateScale(8),
  },
  titleShimmer: {
    height: moderateScale(16),
    flex: 1,
    borderRadius: moderateScale(4),
  },
  badgeShimmer: {
    height: moderateScale(26),
    width: moderateScale(100),
    borderRadius: moderateScale(6),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingShimmer: {
    height: moderateScale(12),
    width: '70%',
    borderRadius: moderateScale(4),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  buttonShimmer: {
    width: '48%',
    height: moderateScale(40),
    borderRadius: moderateScale(25),
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: moderateScale(16),
  },
});

export default ShimmerCard;
