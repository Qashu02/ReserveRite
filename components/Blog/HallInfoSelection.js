import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HallInfoSection = ({ hall }) => {
  const hallLocation = hall?.location || 'Not specified';

  const hallInfo = {
    hasParking: hall?.facilities?.parking,
    hasAC: hall?.facilities?.airConditioning,
    hasBridalRoom: hall?.facilities?.bridalRoom,
    capacity: hall?.capacity || 'N/A',
  };

  console.log('Hall:', hall);

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
