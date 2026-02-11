import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Star, Navigation, X } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
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
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownContainer}>
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
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SortDropdown;
