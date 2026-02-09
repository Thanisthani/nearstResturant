import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { ChevronLeft, MapPin, ChevronDown, Search, SlidersHorizontal, Coffee, Utensils, Beer, ShoppingBag, Plus } from 'lucide-react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Config from 'react-native-config'
import axios from 'axios'
import { categories } from '../../utils/local_data'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import RestaurantMarker from '../../components/RestaurantMarker'

const FindNearbyResScreen = () => {
    const [selectedAddress, setSelectedAddress] = useState('Jumeirah St - Umm - 74147 - Dubai');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(categories[0].key);
    const [currentCoords, setCurrentCoords] = useState({ lat: 25.1972, lng: 55.2744 });
    const mapRef = useRef<MapView>(null);

    const fetchNearbyRestaurants = async (lat: number, lng: number, categoryKey?: string) => {
        setLoading(true);
        const type = categoryKey || activeCategory;

        mapRef.current?.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }, 1000);

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
                        'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.location',
                    },
                }
            );
            setRestaurants(response.data.places || []);
        } catch (error) {
            console.error('Error fetching restaurants (New API):', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryPress = (key: string) => {
        setActiveCategory(key);
        fetchNearbyRestaurants(currentCoords.lat, currentCoords.lng, key);
    };

    const getCategoryIcon = (key: string, active: boolean) => {
        const iconSize = moderateScale(16);
        const iconColor = active ? '#1A1A1A' : '#5F6368';
        switch (key) {
            case 'cafe': return <Coffee size={iconSize} color={iconColor} />;
            case 'restaurant': return <Utensils size={iconSize} color={iconColor} />;
            case 'bar': return <Beer size={iconSize} color={iconColor} />;
            case 'meal_takeaway': return <ShoppingBag size={iconSize} color={iconColor} />;
            default: return <Utensils size={iconSize} color={iconColor} />;
        }
    };

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
                    <TouchableOpacity style={styles.locationRow} activeOpacity={0.7}>
                        <Text style={styles.locationText} numberOfLines={1}>
                            {selectedAddress}
                        </Text>
                        <ChevronDown size={moderateScale(16)} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.searchContainer, { zIndex: 1000 }]}>
                <GooglePlacesAutocomplete
                    placeholder="Search for Location You Want to Get Offer"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        if (details) {
                            setSelectedAddress(data.description);
                            const coords = { lat: details.geometry.location.lat, lng: details.geometry.location.lng };
                            setCurrentCoords(coords);
                            fetchNearbyRestaurants(coords.lat, coords.lng);
                        }
                    }}
                    onFail={(error) => console.error("Autocomplete Error:", error)}
                    renderLeftButton={() => (
                        <View style={{ justifyContent: 'center', paddingLeft: moderateScale(16) }}>
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
                <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                    <SlidersHorizontal size={moderateScale(20)} color="#1A1A1A" />
                </TouchableOpacity>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.categoryScroll}
                >
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.key}
                            style={[
                                styles.categoryButton,
                                activeCategory === cat.key && styles.activeCategoryButton
                            ]}
                            activeOpacity={0.7}
                            onPress={() => handleCategoryPress(cat.key)}
                        >
                            {getCategoryIcon(cat.key, activeCategory === cat.key)}
                            <Text style={[
                                styles.categoryText,
                                activeCategory === cat.key && styles.activeCategoryText
                            ]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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
                >
                    {/* Place Location Marker */}
                    <Marker coordinate={{ latitude: currentCoords.lat, longitude: currentCoords.lng }}>
                        <View style={styles.userLocationWrapper}>
                            <View style={styles.userLocationDot} />
                        </View>
                    </Marker>

                    {/* Restaurant Markers */}
                    {restaurants?.map((res: any) => res.location && (
                   <RestaurantMarker
                   key={res.id}
                   id={res.id}
                   name={res.displayName?.text}
                   rating={res.rating}
                   lat={res.location.latitude}
                   lng={res.location.longitude}
                   onPress={() => handleCategoryPress(res.id)}
                   />
                    ))}
                </MapView>
                
                {loading && (
                    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 20, elevation: 5 }}>
                        <ActivityIndicator size="small" color="#7210FF" />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default FindNearbyResScreen
