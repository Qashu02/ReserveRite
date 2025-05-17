import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const dishOptions = ['Biryani', 'Karahi', 'BBQ', 'Chinese'];
const menuOptions = ['Buffet', 'Plated', 'Custom'];
const priceOptions = ['<500', '500-1000', '>1000'];

export default function FeedPredefinedFilter({ onApply, navigation }) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    onApply({
      dish: selectedDish,
      menu: selectedMenu,
      price: selectedPrice,
    });
    toggleFilters(); // collapse after applying
  };

  const renderChips = (options, selected, setSelected) => (
    <View style={styles.chipRow}>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.chip,
            selected === item && styles.chipSelected,
          ]}
          onPress={() => setSelected(item === selected ? null : item)}
        >
          <Text style={[styles.chipText, selected === item && styles.chipTextSelected]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFilters} style={styles.header}>
        <Ionicons name="filter" size={22} color="#333" />
        <Text style={styles.headerText}>Filters</Text>
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filterSection}>
          <Text style={styles.label}>Dish Type</Text>
          {renderChips(dishOptions, selectedDish, setSelectedDish)}

          <Text style={styles.label}>Menu Type</Text>
          {renderChips(menuOptions, selectedMenu, setSelectedMenu)}

          <Text style={styles.label}>Price Per Head</Text>
          {renderChips(priceOptions, selectedPrice, setSelectedPrice)}

          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop:15,
    padding: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  filterSection: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
    backgroundColor: '#f5f5f5',
  },
  chipSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  chipTextSelected: {
    color: '#fff',
  },
  applyButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
