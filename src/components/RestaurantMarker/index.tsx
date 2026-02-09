import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';
import { Plus } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from './styles';

interface RestaurantMarkerProps {
  name: string;
  rating: number;
  lat: number;
  lng: number;
  id: string;
  onPress: () => void;
}

const RestaurantMarker = (props: RestaurantMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: props.lat,
        longitude: props.lng,
      }}
      onPress={props.onPress}
      tracksViewChanges={false}
      anchor={{ x: 0.5, y: 1 }} // Ensures triangle tip is on the coordinate
    >
      <View style={styles.markerWrapper}>
        <View style={styles.iconContainer}>
          <Plus size={moderateScale(12)} color="#FFFFFF" strokeWidth={3} />
        </View>
        <View>
          <Text style={styles.rating}>{props.rating || '0.0'}</Text>
          <Text style={styles.name} numberOfLines={1}>
            {props.name}
          </Text>
        </View>
      </View>
    </Marker>
  );
};

export default RestaurantMarker;
