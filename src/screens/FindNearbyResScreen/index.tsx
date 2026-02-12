import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import {
  List,
  ChevronLeft,
  MapPin,
  ChevronDown,
  Search,
} from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import axios from 'axios';
import { categories } from '../../utils/localData';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RestaurantMarker from '../../components/RestaurantMarker';
import ResturantListBottomSheet from '../../components/ResturantListBottomSheet';
import SortDropdown from '../../components/SortDropdown';
import LocationDropdown from '../../components/LocationDropdown';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import Bakery from '../../assets/icons/ic_bakery.svg';
import Bar from '../../assets/icons/ic_bar.svg';
import Cafe from '../../assets/icons/ic_cafe.svg';
import Restaurant from '../../assets/icons/ic_restaurant.svg';
import Filter from '../../assets/icons/ic_filter.svg';
import { ErrorFlash } from '../../utils/flashMessage';
import CustomAlert from '../../components/CustomAlert';

const FindNearbyResScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState(
    'Getting your location...',
  );
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [currentCoords, setCurrentCoords] = useState({
    lat: 6.914981526151977,
    lng: 79.85033104704557,
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | null>(null);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [tempCoords, setTempCoords] = useState({
    lat: 6.914981526151977,
    lng: 79.85033104704557,
  });
  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    title: '',
    message: '',
  });

  const mapRef = useRef<MapView>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const googlePlacesRef = useRef<any>(null);

  // Calculate distance
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
  };

  const sortedRestaurants = useMemo(() => {
    let result = [...restaurants];
    if (sortBy === 'rating') {
      result.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'distance') {
      result.sort((a: any, b: any) => {
        const distA = calculateDistance(
          currentCoords.lat,
          currentCoords.lng,
          a.location.latitude,
          a.location.longitude,
        );
        const distB = calculateDistance(
          currentCoords.lat,
          currentCoords.lng,
          b.location.latitude,
          b.location.longitude,
        );
        return distA - distB;
      });
    }
    return result;
  }, [restaurants, sortBy, currentCoords]);

  // Request location permission for both iOS and Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
        return true;
      } catch (err) {
        console.warn('iOS configuration error:', err);
        ErrorFlash('iOS location configuration error');
        return false;
      }
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to find nearby restaurants.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Android permission error:', err);
        ErrorFlash('Android location permission error');
        return false;
      }
    }
    return true;
  };

  // Get user's current location
  const getCurrentLocation = async () => {
    setIsPickingLocation(false);
    googlePlacesRef.current?.setAddressText('');
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      if (selectedAddress === 'Getting your location...') {
        setAlertConfig({
          isVisible: true,
          title: 'Permission Denied',
          message:
            'Location permission is required to find nearby restaurants.',
        });
        setSelectedAddress('Colombo');
        await fetchNearbyRestaurants(currentCoords.lat, currentCoords.lng);
      } else {
        setAlertConfig({
          isVisible: true,
          title: 'Permission Denied',
          message: 'Please enable location permissions in settings.',
        });
      }
      return;
    }

    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const coords = { lat: latitude, lng: longitude };

        setCurrentCoords(coords);

        setSelectedAddress('Current Location');

        // Fetch nearby restaurants
        await fetchNearbyRestaurants(latitude, longitude);
      },
      async error => {
        console.error('Error getting location:', error);
        setLoading(false);

        let errorMessage = 'Unable to get your current location.';
        if (error.code === 3) {
          errorMessage = 'Location request timed out.';
        } else if (error.code === 2) {
          errorMessage = 'Location unavailable.';
        }
        if (selectedAddress === 'Getting your location...') {
          setSelectedAddress('Colombo');
          ErrorFlash(
            `${errorMessage} Showing nearby restaurants from default location.`,
          );
          await fetchNearbyRestaurants(currentCoords.lat, currentCoords.lng);
        } else {
          ErrorFlash(errorMessage);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5000,
      },
    );
  };

  // Fetch nearby restaurants
  const fetchNearbyRestaurants = async (
    lat: number,
    lng: number,
    categoryKey?: string,
  ) => {
    setLoading(true);
    const type = categoryKey || activeCategory;

    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      1000,
    );

    try {
      const response = await axios.post(
        'https://places.googleapis.com/v1/places:searchNearby',
        {
          includedTypes: [type],
          maxResultCount: 20,
          locationRestriction: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: 2000.0,
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': Config.GOOGLE_MAPS_API_KEY,
            'X-Goog-FieldMask':
              'places.id,places.displayName,places.rating,places.location,places.shortFormattedAddress,places.photos',
          },
        },
      );
      setRestaurants(response.data.places || []);
    } catch (error) {
      console.error('Error fetching restaurants (New API):', error);
      ErrorFlash('Error fetching restaurants');
    } finally {
      setLoading(false);
    }
  };

  // Fetch address using reverse geocoding
  const handleSetLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${tempCoords.lat},${tempCoords.lng}&key=${Config.GOOGLE_MAPS_API_KEY}`,
      );

      if (response.data.results && response.data.results.length > 0) {
        setSelectedAddress(response.data.results[0].formatted_address);
      } else {
        setSelectedAddress('Custom Location');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      ErrorFlash('Error fetching address');
      setSelectedAddress('Custom Location');
    }

    setCurrentCoords(tempCoords);
    setIsPickingLocation(false);
    googlePlacesRef.current?.setAddressText('');
    await fetchNearbyRestaurants(tempCoords.lat, tempCoords.lng);
    bottomSheetModalRef.current?.present();
  };

  const handleCategoryPress = (key: string) => {
    setActiveCategory(key);
    fetchNearbyRestaurants(currentCoords.lat, currentCoords.lng, key);
  };

  // Handle sort
  const handleSort = (option: 'rating' | 'distance') => {
    setSortBy(option);
    setShowSortDropdown(false);
  };

  // Clear filters
  const clearFilters = () => {
    setSortBy(null);
    setActiveCategory(categories[0].key);
    fetchNearbyRestaurants(
      currentCoords.lat,
      currentCoords.lng,
      categories[0].key,
    );
    setShowSortDropdown(false);
  };

  // Show resturant lists
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const getCategoryIcon = (key: string, active: boolean) => {
    const iconSize = moderateScale(16);
    switch (key) {
      case 'cafe':
        return <Cafe width={iconSize} height={iconSize} />;
      case 'restaurant':
        return <Restaurant width={iconSize} height={iconSize} />;
      case 'bar':
        return <Bar width={iconSize} height={iconSize} />;
      case 'bakery':
        return <Bakery width={iconSize} height={iconSize} />;
      default:
        return <Restaurant width={iconSize} height={iconSize} />;
    }
  };

  // Handle cancel set location on map
  const handleCancelPicking = () => {
    setIsPickingLocation(false);
    handlePresentModalPress();
  };

  useEffect(() => {
    getCurrentLocation();
    handlePresentModalPress();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.iconContainer}>
          <ChevronLeft size={moderateScale(20)} color="#5F6368" />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <MapPin size={moderateScale(20)} color="#1A1A1A" />
        </View>

        <View style={styles.locationTextWrapper}>
          <Text style={styles.offersNearText}>Offers Near</Text>
          <TouchableOpacity
            style={styles.locationRow}
            activeOpacity={0.7}
            onPress={() => {
              Keyboard.dismiss();
              setShowLocationDropdown(!showLocationDropdown);
            }}
          >
            <Text style={styles.locationText} numberOfLines={1}>
              {selectedAddress}
            </Text>
            <ChevronDown size={moderateScale(16)} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.searchContainer, { zIndex: 1000 }]}>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder="Search for Location You Want to Get Offer"
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              setSelectedAddress(data.description);
              const coords = {
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
              };
              setCurrentCoords(coords);
              fetchNearbyRestaurants(coords.lat, coords.lng);
            }
          }}
          onFail={error => console.error('Autocomplete Error:', error)}
          renderLeftButton={() => (
            <View
              style={{
                justifyContent: 'center',
                paddingLeft: moderateScale(16),
              }}
            >
              <Search size={moderateScale(20)} color="#828282" />
            </View>
          )}
          query={{
            key: Config.GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          styles={{
            container: { flex: 0, zIndex: 1000 },
            textInputContainer: styles.searchWrapper,
            textInput: styles.searchInput,
            listView: styles.autocompleteListView,
            row: styles.autocompleteRow,
            separator: styles.autocompleteSeparator,
            description: styles.autocompleteDescription,
            poweredContainer: styles.autocompletePoweredContainer,
          }}
          textInputProps={{
            placeholderTextColor: '#b4b4b4ff',
            clearButtonMode: 'while-editing',
            returnKeyType: 'search',
          }}
          debounce={300}
          enablePoweredByContainer={true}
          keyboardShouldPersistTaps="always"
        />
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          keyExtractor={item => item.key}
          ListHeaderComponent={
            <TouchableOpacity
              style={[
                styles.filterButton,
                sortBy && { borderColor: '#7210FF', borderWidth: 1.5 },
              ]}
              activeOpacity={0.7}
              onPress={() => setShowSortDropdown(!showSortDropdown)}
            >
              <Filter
                width={moderateScale(20)}
                height={moderateScale(20)}
                fill={sortBy ? '#7210FF' : 'none'}
              />
            </TouchableOpacity>
          }
          ListFooterComponent={<View style={{ width: moderateScale(16) }} />}
          renderItem={({ item: cat }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                activeCategory === cat.key && styles.activeCategoryButton,
              ]}
              activeOpacity={0.7}
              onPress={() => handleCategoryPress(cat.key)}
            >
              {getCategoryIcon(cat.key, activeCategory === cat.key)}
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat.key && styles.activeCategoryText,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentCoords.lat,
            longitude: currentCoords.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onRegionChangeComplete={region => {
            if (isPickingLocation) {
              setTempCoords({
                lat: region.latitude,
                lng: region.longitude,
              });
            }
          }}
        >
          {/* Place Location Marker */}
          <Marker
            coordinate={{
              latitude: currentCoords.lat,
              longitude: currentCoords.lng,
            }}
          >
            <View style={styles.userLocationWrapper}>
              <View style={styles.userLocationDot} />
            </View>
          </Marker>

          {/* Restaurant Markers */}
          {sortedRestaurants?.map(
            (res: any) =>
              res.location && (
                <RestaurantMarker
                  key={res.id}
                  id={res.id}
                  name={res.displayName?.text}
                  rating={res.rating}
                  lat={res.location.latitude}
                  lng={res.location.longitude}
                  onPress={() => handleCategoryPress(res.id)}
                />
              ),
          )}
        </MapView>

        {/* Floating List Button */}
        {isPickingLocation ? (
          <View style={styles.pickerActionContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelPicking}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.setButton}
              onPress={handleSetLocation}
            >
              <Text style={styles.setButtonText}>Set Location</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.listButton}
            activeOpacity={0.8}
            onPress={handlePresentModalPress}
          >
            <List color="#FFFFFF" size={moderateScale(20)} />
            <Text style={styles.listButtonText}>List</Text>
          </TouchableOpacity>
        )}

        {loading && (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
              backgroundColor: '#FFFFFF',
              padding: 10,
              borderRadius: 20,
              elevation: 5,
            }}
          >
            <ActivityIndicator size="small" color="#7210FF" />
          </View>
        )}
        {isPickingLocation && (
          <>
            <View style={styles.markerFixed} pointerEvents="none">
              <MapPin
                size={moderateScale(48)}
                color="#7210FF"
                fill="rgba(114, 16, 255, 0.3)"
              />
            </View>
          </>
        )}
      </View>

      <LocationDropdown
        isVisible={showLocationDropdown}
        onClose={() => setShowLocationDropdown(false)}
        onSelectCurrentLocation={getCurrentLocation}
        onSelectSetOnMap={() => {
          setIsPickingLocation(true);
          googlePlacesRef.current?.setAddressText('');
          handleCloseModalPress();
        }}
      />

      <SortDropdown
        isVisible={showSortDropdown}
        onClose={() => setShowSortDropdown(false)}
        sortBy={sortBy}
        onSort={handleSort}
        onClear={clearFilters}
      />

      <ResturantListBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        restaurants={sortedRestaurants}
        apiKey={Config.GOOGLE_MAPS_API_KEY}
        loading={loading}
        onPress={() => {}}
        onCancel={() => {}}
      />

      <CustomAlert
        isVisible={alertConfig.isVisible}
        onClose={() => setAlertConfig({ ...alertConfig, isVisible: false })}
        title={alertConfig.title}
        message={alertConfig.message}
      />
    </SafeAreaView>
  );
};

export default FindNearbyResScreen;
