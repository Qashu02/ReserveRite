import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../config/colors';

export default function FilterScreen({ navigation }) {
  const [hasParking, setHasParking] = useState(false);
  const [hasBridalRoom, setHasBridalRoom] = useState(false);
  const [hasAC, setHasAC] = useState(false);
  const [menuKeyword, setMenuKeyword] = useState('');
  const [pricePerHead, setPricePerHead] = useState('');
  const [capacity, setCapacity] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) setSelectedDate(date);
  };

  const handleApplyFilters = () => {
    const filters = {
      parking: hasParking,
      bridalRoom: hasBridalRoom,
      ac: hasAC,
      date: selectedDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      menuKeyword,
      pricePerHead,
      capacity,
    };

    console.log('Applied Filters:', filters);
    // navigation.navigate('SearchResults', { filters });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Filter Halls</Text>

      {/* Date Picker */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      {/* Parking */}
      <View style={styles.filterGroupRow}>
        <Text style={styles.label}>Parking Available</Text>
        <Switch
          value={hasParking}
          onValueChange={setHasParking}
          trackColor={{ true: colors.secondary }}
        />
      </View>

      {/* Bridal Room */}
      <View style={styles.filterGroupRow}>
        <Text style={styles.label}>Bridal Room</Text>
        <Switch
          value={hasBridalRoom}
          onValueChange={setHasBridalRoom}
          trackColor={{ true: colors.secondary }}
        />
      </View>

      {/* AC */}
      <View style={styles.filterGroupRow}>
        <Text style={styles.label}>AC Available</Text>
        <Switch
          value={hasAC}
          onValueChange={setHasAC}
          trackColor={{ true: colors.secondary }}
        />
      </View>

      {/* Menu Keyword */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Menu Keyword</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. BBQ, Buffet, Desserts"
          value={menuKeyword}
          onChangeText={setMenuKeyword}
        />
      </View>

      {/* Price Per Head */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Price Per Head (Rs)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 1200"
          value={pricePerHead}
          onChangeText={setPricePerHead}
          keyboardType="numeric"
        />
      </View>

      {/* Capacity */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Minimum Capacity</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 200"
          value={capacity}
          onChangeText={setCapacity}
          keyboardType="numeric"
        />
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyBtn} onPress={handleApplyFilters}>
        <Text style={styles.applyBtnText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  applyBtn: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
