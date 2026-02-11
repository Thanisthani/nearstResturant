import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { Star, Navigation, SquareMenu } from 'lucide-react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import ShimmerCard from './ShimmerCard';
import Direction from '../../assets/icons/ic_direction.svg';
import Menu from '../../assets/icons/ic_menu.svg';
import Svg, { SvgUri } from 'react-native-svg';

type ResturantListBottomSheetProps = {
  bottomSheetModalRef: any;
  restaurants: any[];
  apiKey: string | undefined;
  loading?: boolean;
  onPress?: any;
  onCancel?: any;
};

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  address: string;
  discount: string;
}

const ResturantListBottomSheet = (props: ResturantListBottomSheetProps) => {
  const restaurants = useMemo(() => {
    return props.restaurants.map((res: any) => {
      let imageUrl = null;

      if (res.photos && res.photos.length > 0 && props.apiKey) {
        const photoName = res.photos[0].name;
        imageUrl = `https://places.googleapis.com/v1/${photoName}/media?key=${props.apiKey}&maxWidthPx=800`;
      }

      return {
        id: res.id,
        name: res.displayName?.text,
        image: imageUrl,
        rating: res.rating || 0,
        address: res.shortFormattedAddress,
        discount: 'Discount upto 30%',
      };
    });
  }, [props.restaurants, props.apiKey]);

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => (
      <View>
        <View style={styles.cardContainer}>
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require('../../assets/images/restaurant_placeholder.png')
            }
            style={styles.restaurantImage}
          />

          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.restaurantName} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <Star fill="#E1C04E" color="#E1C04E" size={moderateScale(14)} />
              <Text style={styles.ratingText}>{item.rating} </Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.addressText} numberOfLines={1}>
                {' '}
                {item.address}
              </Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btnConatiner, { backgroundColor: '#F3E8FF' }]}
              activeOpacity={0.7}
            >
              <Direction width={scale(18)} height={scale(18)} />
              <Text style={[styles.btnText, { color: '#7D00D0' }]}>
                Direction
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnConatiner, { backgroundColor: '#7D00D0' }]}
              activeOpacity={0.7}
            >
              <Menu width={scale(16)} height={scale(16)} />
              <Text style={[styles.btnText, { color: '#fff' }]}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={0}
      backgroundStyle={styles.container}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetFlatList
        data={props.loading ? Array(5).fill({}) : restaurants}
        keyExtractor={(item: any, index: number) =>
          props.loading ? `shimmer-${index}` : item.id
        }
        renderItem={props.loading ? () => <ShimmerCard /> : renderItem}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheetModal>
  );
};

export default ResturantListBottomSheet;
