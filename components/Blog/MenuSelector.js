import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';

const MenuSelector = ({
  menuPackages,
  selectedPackage,
  setSelectedPackage,
  guestCount,
  setGuestCount,
}) => {
  const handleGuestChange = (text) => {
    // Only allow numbers
    const num = text.replace(/[^0-9]/g, '');
    setGuestCount(num);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedPackage?._id === item._id;

    return (
      <Pressable
        onPress={() => {
          if (isSelected) {
            setSelectedPackage(null);
            setGuestCount('');
          } else {
            setSelectedPackage(item);
            setGuestCount('');
          }
        }}
        style={[styles.item, isSelected && styles.selectedItem]}
      >
        <Text style={styles.name}>{item.packageName}</Text>
        {/* Uncomment if you have description */}
        {/* <Text style={styles.desc}>{item.description}</Text> */}
        <Text style={styles.price}>Rs {item.pricePerHead} per head</Text>

        {isSelected && (
          <>
            <Text style={styles.label}>Enter Number of Guests:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={guestCount}
              onChangeText={handleGuestChange}
              placeholder="Number of guests"
              placeholderTextColor="#999"
              autoFocus={true}  // Try autofocus to keep keyboard open
              maxLength={3}     // optional: limit guest count length
              // prevent losing focus on updates
              blurOnSubmit={false}
              returnKeyType="done"
            />
          </>
        )}
      </Pressable>
    );
  };

  return (
    <FlatList
      data={menuPackages}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
      keyboardShouldPersistTaps="handled" // allows tapping outside without losing keyboard unexpectedly
    />
  );
};

export default MenuSelector;

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  selectedItem: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  name: {
    fontSize: 24,           // bigger font size
    fontWeight: '900',      // bolder
    color: '#2E7D32',       // nice green color
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',  // subtle shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  desc: {
    marginTop: 6,
    color: '#555',
  },
  price: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
  },
  input: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    color: '#333',
  },
});
