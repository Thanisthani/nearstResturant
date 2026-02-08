import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { ChevronLeft, MapPin, ChevronDown } from 'lucide-react-native'
import { moderateScale } from 'react-native-size-matters'

const FindNearbyResScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                    <ChevronLeft size={moderateScale(20)} color="#5F6368" />
                </TouchableOpacity>

                <View style={styles.locationIconContainer}>
                    <MapPin size={moderateScale(20)} color="#1A1A1A" />
                </View>

                <View style={styles.locationTextWrapper}>
                    <Text style={styles.offersNearText}>Offers Near</Text>
                    <TouchableOpacity style={styles.locationRow} activeOpacity={0.7}>
                        <Text style={styles.locationText} numberOfLines={1}>
                            Jumeirah St - Umm - 74147 - Dubai
                        </Text>
                        <ChevronDown size={moderateScale(16)} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FindNearbyResScreen