import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useLocation from '../Hooks/useLocation'; // adjust path accordingly

export default function LocationExample() {
  const { location, errorMsg, loading } = useLocation();

  if (loading) return <Text>Loading location...</Text>;
  if (errorMsg) return <Text>{errorMsg}</Text>;

  return (
    <View style={styles.container}>
      <Text>Latitude: {location.coords.latitude.toFixed(6)}</Text>
      <Text>Longitude: {location.coords.longitude.toFixed(6)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
