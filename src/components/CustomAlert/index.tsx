import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from './styles';

interface CustomAlertProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isVisible,
  onClose,
  title,
  message,
  buttonText = 'OK',
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.iconContainer}>
                <AlertCircle size={moderateScale(32)} color="#7210FF" />
              </View>

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomAlert;
