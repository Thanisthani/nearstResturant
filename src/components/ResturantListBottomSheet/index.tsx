import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { RefObject, useCallback, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Star, Navigation, SquareMenu } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

type ResturantListBottomSheetProps = {
  bottomSheetModalRef: any;
  restaurants: any[];
  apiKey: string | undefined;
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
      let imageUrl =
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000'; // Default

      if (res.photos && res.photos.length > 0 && props.apiKey) {
        const photoName = res.photos[0].name;
        imageUrl = `https://places.googleapis.com/v1/${photoName}/media?key=${props.apiKey}&maxWidthPx=800`;
      }

      return {
        id: res.id,
        name: res.displayName?.text || 'Restaurant',
        image: imageUrl,
        rating: res.rating || 0,
        address:
          res.shortFormattedAddress ||
          'Ground floor, Burj Al Arab Jumeirah, Jumeira',
        discount: 'Discount upto 30%', // Static for UI demo
      };
    });
  }, [props.restaurants, props.apiKey]);

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        style={styles.wrapper}
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior={'close'}
      />
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => (
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />

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
            <Navigation color="#7D00D0" size={moderateScale(20)} />
            <Text style={[styles.btnText, { color: '#7D00D0' }]}>
              Direction
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnConatiner, { backgroundColor: '#7D00D0' }]}
            activeOpacity={0.7}
          >
            <SquareMenu color="#fff" size={moderateScale(20)} />
            <Text style={[styles.btnText, { color: '#fff' }]}>Menu</Text>
          </TouchableOpacity>
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
        data={restaurants}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheetModal>
  );
};

export default ResturantListBottomSheet;
