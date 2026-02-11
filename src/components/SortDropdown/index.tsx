import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from 'react-native';
import { Star, Navigation, X } from 'lucide-react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

interface SortDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  sortBy: 'rating' | 'distance' | null;
  onSort: (option: 'rating' | 'distance') => void;
  onClear: () => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  isVisible,
  onClose,
  sortBy,
  onSort,
  onClear,
}) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [shouldRender, setShouldRender] = React.useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [isVisible, slideAnim]);

  if (!shouldRender && !isVisible) return null;

  const topOffset = Platform.OS === 'ios'
    ? insets.top + verticalScale(150)
    : verticalScale(155);

  return (
    <View style={styles.container} pointerEvents={isVisible ? 'auto' : 'none'}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.clippingContainer, { marginTop: topOffset }]}>
            <Animated.View
              style={[
                styles.dropdownContainer,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.sortTitle}>Sort By</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <X size={moderateScale(18)} color="#5F6368" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortBy === 'rating' && styles.activeSortOption,
                ]}
                onPress={() => onSort('rating')}
              >
                <Star
                  size={moderateScale(18)}
                  color={sortBy === 'rating' ? '#7210FF' : '#5F6368'}
                  fill={sortBy === 'rating' ? '#7210FF' : 'none'}
                />
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === 'rating' && styles.activeSortOptionText,
                  ]}
                >
                  Rating
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortBy === 'distance' && styles.activeSortOption,
                ]}
                onPress={() => onSort('distance')}
              >
                <Navigation
                  size={moderateScale(18)}
                  color={sortBy === 'distance' ? '#7210FF' : '#5F6368'}
                />
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === 'distance' && styles.activeSortOptionText,
                  ]}
                >
                  Distance
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clearFilterBtn} onPress={onClear}>
                <Text style={styles.clearFilterText}>Clear Filter</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SortDropdown;
