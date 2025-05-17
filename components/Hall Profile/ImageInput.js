import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';

export default function ImageInput({ onChangeImage, imageUri }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) Alert.alert('Please enable camera permissions');
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled && result.assets.length > 0) {
        onChangeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error reading an image', error);
    }
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        { text: 'Yes', onPress: () => onChangeImage(null) },
        { text: 'No' },
      ]);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {!imageUri && (
        <MaterialCommunityIcons
          name="camera"
          color={colors.light}
          size={40}
        />
      )}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
