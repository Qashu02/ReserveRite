import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import HallAvailability from './HallAvailability';

const HallInfoSection = () => {
  const hallLocation = '123 Main Street, Lahore, Pakistan';

  const hallInfo = {
    hasParking: true,
    hasAC: true,
    hasBridalRoom: true,
    capacity: 300,
  };

  return (
    <View>
      <View style={styles.locationBox}>
        <Text style={styles.locationLabel}>Hall Location:</Text>
        <Text style={styles.locationText}>{hallLocation}</Text>
      </View>

      <View style={styles.hallInfoBox}>
        <Text style={styles.subHeading}>Hall Facilities</Text>
        <Text style={styles.detail}>
          🚗 Parking: {hallInfo.hasParking ? 'Available' : 'Not Available'}
        </Text>
        <Text style={styles.detail}>
          ❄️ Air Conditioning: {hallInfo.hasAC ? 'Available' : 'Not Available'}
        </Text>
        <Text style={styles.detail}>
          👰 Bridal Room: {hallInfo.hasBridalRoom ? 'Available' : 'Not Available'}
        </Text>
        <Text style={styles.detail}>
          👥 Capacity: {hallInfo.capacity} Guests
        </Text>
      </View>

      {/* <HallAvailability /> */}

  
    </View>
  );
};

export default HallInfoSection;

const styles = StyleSheet.create({
  locationBox: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
  },
  locationLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationText: {
    color: '#333',
  },
  hallInfoBox: {
    marginTop: 20,
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 6,
  },

});
