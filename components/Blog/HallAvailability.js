import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../config/colors';

const dummySlots = [
  { id: '1', time: '10:00 AM - 12:00 PM', available: true },
  { id: '2', time: '12:30 PM - 2:30 PM', available: false },
  { id: '3', time: '3:00 PM - 5:00 PM', available: true },
  { id: '4', time: '6:00 PM - 8:00 PM', available: true },
];

const HallAvailability = ({ slots = dummySlots, onSelectSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open for iOS
    if (date) setSelectedDate(date);
  };

  const handleSelect = (slot) => {
    if (!slot.available) return;
    setSelectedSlot(slot.id);
    onSelectSlot?.(slot);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Date</Text>

      <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateBox}>
        <Text style={styles.dateText}>
          {selectedDate.toDateString()}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.heading}>Available Time Slots</Text>

      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelect(item)}
            style={[
              styles.slot,
              !item.available && styles.unavailable,
              selectedSlot === item.id && styles.selected,
            ]}
          >
            <Text style={styles.slotText}>
              {item.time}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default HallAvailability;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  dateBox: {
    padding: 12,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#00796B',
  },
  slot: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 10,
    marginBottom: 8,
  },
  unavailable: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: colors.secondary,
  },
  slotText: {
    color: '#000',
    textAlign: 'center',
  },
});
