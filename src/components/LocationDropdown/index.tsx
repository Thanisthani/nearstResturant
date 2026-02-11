import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { styles } from './styles';

interface LocationDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCurrentLocation: () => void;
  onSelectSetOnMap: () => void;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  isVisible,
  onClose,
  onSelectCurrentLocation,
  onSelectSetOnMap,
}) => {
  const slideAnim = useRef(new Animated.Value(-300)).current; // Slightly more hidden

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.clippingContainer}>
        <Animated.View
          style={[
            styles.dropdownContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelectCurrentLocation();
              onClose();
            }}
          >
            <Navigation size={moderateScale(18)} color="#7210FF" />
            <Text style={styles.optionText}>Use Current Location</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelectSetOnMap();
              onClose();
            }}
          >
            <MapPin size={moderateScale(18)} color="#7210FF" />
            <Text style={styles.optionText}>Set on Map</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default LocationDropdown;
