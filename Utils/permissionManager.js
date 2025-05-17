// utils/permissionsManager.js
import * as Camera from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
// You can add more modules as needed

/**
 * Request camera permission
 * @returns {Promise<boolean>} True if granted
 */
export const requestCameraPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === 'granted';
};

/**
 * Request location permission (foreground only)
 * @returns {Promise<boolean>} True if granted
 */
export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
};

/**
 * Request media library permission
 * @returns {Promise<boolean>} True if granted
 */
export const requestMediaPermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
};

/**
 * Request all needed permissions (optional combo helper)
 * Call this ONLY if absolutely necessary (e.g., onboarding)
 */
export const requestAllPermissions = async () => {
  const camera = await requestCameraPermission();
  const location = await requestLocationPermission();
  const media = await requestMediaPermission();

  return {
    camera,
    location,
    media,
    allGranted: camera && location && media,
  };
};
