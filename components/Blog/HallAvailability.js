import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../config/colors';

const HallAvailability = ({ slots = [], onSelectSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) setSelectedDate(date);
  };

  const handleSelect = (slot) => {
    if (!slot.isAvailable) return;
    setSelectedSlot(slot.id);
    onSelectSlot?.(slot);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  // Optional: Filter slots for selectedDate only if date is included in backend
  const filteredSlots = slots?.filter(slot => {
    // if slot.date exists, filter by it
    if (slot.date) {
      const slotDate = new Date(slot.date).toDateString();
      return slotDate === selectedDate.toDateString();
    }
    return true;
  });

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
        data={filteredSlots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelect(item)}
            style={[
              styles.slot,
              !item.isAvailable && styles.unavailable,
              selectedSlot === item.id && styles.selected,
            ]}
          >
            <Text style={[
              styles.slotText,
              selectedSlot === item.id && { color: '#fff' },
              !item.isAvailable && { color: '#aaa' },
            ]}>
              {item.time}
            </Text>
            {!item.isAvailable && (
              <Text style={styles.unavailableText}>Not Available</Text>
            )}
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            No slots available for selected date.
          </Text>
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
    alignItems: 'center',
  },
  unavailable: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: colors.secondary,
  },
  slotText: {
    fontSize: 16,
  },
  unavailableText: {
    fontSize: 12,
    color: '#999',
  },
});
