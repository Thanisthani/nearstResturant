import { View, Text } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';
import { Plus } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from './styles';
import Triangle from '../../assets/images/toolTipBottomTriangle.svg';

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
      tracksViewChanges={true}
      anchor={{ x: 0.5, y: 1 }}
    >
      <View style={styles.markerContainer}>
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

        <Triangle
          width={moderateScale(16)}
          height={moderateScale(12)}
          style={styles.triangleContainer}
        />
      </View>
    </Marker>
  );
};

export default RestaurantMarker;
