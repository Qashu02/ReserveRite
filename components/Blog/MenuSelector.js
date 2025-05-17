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
  selectedPackage,
  setSelectedPackage,
  guestCount,
  setGuestCount,
  menuPackages,
}) => {
  const handleGuestChange = (text) => {
    // Remove non-numeric characters
    const num = text.replace(/[^0-9]/g, '');
    setGuestCount(num); // Set as string to avoid input re-renders
  };

  const getTotal = () => {
    const guests = parseInt(guestCount);
    return isNaN(guests) || !selectedPackage
      ? 0
      : guests * selectedPackage.pricePerHead;
  };

  const getReservationAmount = () => Math.round(getTotal() * 0.2);

  const renderItem = ({ item }) => {
    const isSelected = selectedPackage?.id === item.id;

    return (
      <Pressable
        onPress={() => setSelectedPackage(item)}
        style={[styles.item, isSelected && styles.selectedItem]}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.price}>PKR {item.pricePerHead} per head</Text>

        {isSelected && (
          <>
            <Text style={styles.label}>Number of Guests:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={guestCount}
              onChangeText={handleGuestChange}
              placeholder="Enter number of guests"
              placeholderTextColor="#888"
            />

            <View style={styles.footer}>
              <Text style={styles.total}>Total Price: PKR {getTotal()}</Text>
              <Text style={styles.reservation}>
                Pay 20% Now: PKR {getReservationAmount()}
              </Text>
            </View>
          </>
        )}
      </Pressable>
    );
  };

  return (
    <View>
      <Text style={styles.heading}>Select Menu Package</Text>

      <FlatList
        data={menuPackages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MenuSelector;
const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  item: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    marginHorizontal: 16,
  },
  selectedItem: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    color: '#555',
    marginTop: 4,
  },
  price: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    marginHorizontal: 0,
    backgroundColor: '#fff',
  },
  footer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 16,
  },
  total: {
    fontSize: 18,
    marginBottom: 5,
  },
  reservation: {
    fontSize: 16,
    color: '#555',
  },
});
