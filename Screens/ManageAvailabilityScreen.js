import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../config/colors';
import Screen from '../components/Screen';
const slotLabels = [
  { key: 'slot1', label: '1 PM - 4 PM' },
  { key: 'slot2', label: '5 PM - 7 PM' },
  { key: 'slot3', label: '7 PM - 10 PM' },
];

export default function ManageAvailabilityScreen() {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddDate = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const exists = availabilityList.find(
        (item) => item.date.toDateString() === date.toDateString()
      );
      if (!exists) {
        setAvailabilityList([
          ...availabilityList,
          {
            date,
            slots: {
              slot1: false,
              slot2: false,
              slot3: false,
            },
          },
        ]);
      }
    }
  };

  const toggleSlot = (dateIndex, slotKey) => {
    const updated = [...availabilityList];
    updated[dateIndex].slots[slotKey] = !updated[dateIndex].slots[slotKey];
    setAvailabilityList(updated);
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Manage Availability</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.addBtn}>
        <Text style={styles.addText}>+ Add Available Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleAddDate}
        />
      )}

      <FlatList
        data={availabilityList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.dateItem}>
            <Text style={styles.dateText}>{item.date.toDateString()}</Text>

            {slotLabels.map(({ key, label }) => (
              <View key={key} style={styles.slotRow}>
                <Text style={styles.slotLabel}>{label}</Text>
                <Switch
                  value={item.slots[key]}
                  onValueChange={() => toggleSlot(index, key)}
                  trackColor={{ false: '#ccc', true: colors.secondary }}
                  thumbColor={item.slots[key] ? colors.secondary : '#999'}
                />
              </View>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No availability added yet.</Text>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  slotLabel: {
    fontSize: 15,
    color: colors.text,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.text,
    fontSize: 15,
  },
});
