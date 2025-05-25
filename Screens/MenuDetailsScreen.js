import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getHallById } from '../api/hall'; // Your API function
import MenuSelector from '../components/Blog/MenuSelector';
import HallInfoSection from '../components/Blog/HallInfoSelection';
import HallAvailability from '../components/Blog/HallAvailability';
import colors from '../config/colors';
import ReviewScreen from './ReviewScreen';
import Screen from '../components/Screen';

const MenuDetailsScreen = ({ navigation, route }) => {
  const { hallId } = route.params;

  const [hall, setHall] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('info');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [guestCount, setGuestCount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const hallResponse = await getHallById(hallId);
        setHall(hallResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch hall:', error);
        setError('Unable to fetch hall details.');
        setIsLoading(false);
      }
    };

    fetchHall();
  }, [hallId]);

  if (isLoading) {
    return (
      <Screen style={styles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      </Screen>
    );
  }

  // Use hall.menu as menu packages
  const menuPackages = hall?.menu || [];

  const rentalPrice = hall?.rentalPrice || 30000; // fallback if missing

  // Calculate menu cost only if package selected and guestCount is valid number
  const menuCost =
    selectedPackage && guestCount
      ? selectedPackage.pricePerHead * parseInt(guestCount || '0')
      : 0;

  // Total is 20% of rentalPrice + menuCost
  const totalCost = Math.round(0.2 * (rentalPrice + menuCost));

  const availability = hall?.availability || [];

  return (
    <Screen style={styles.container}>
      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab('info')}>
          <Text
            style={[styles.tabText, activeTab === 'info' && styles.activeTab]}>
            Hall Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('reviews')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'reviews' && styles.activeTab,
            ]}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[]} // empty because we use ListHeaderComponent for main content
        keyExtractor={() => 'key'}
        ListHeaderComponent={() => (
          <View style={styles.content}>
            {activeTab === 'info' ? (
              <>
                <HallInfoSection hall={hall} />

                <View style={styles.rentalCard}>
                  <Text style={styles.rentalLabel}>🎉 Hall Rental Price</Text>
                  <Text style={styles.rentalAmount}>
                    Rs {rentalPrice.toLocaleString()}
                  </Text>
                  <Text style={styles.rentalNote}>
                    Includes venue, lighting, and basic setup
                  </Text>
                </View>

                <HallAvailability
                  availability={availability}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />

                <MenuSelector
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  guestCount={guestCount}
                  setGuestCount={setGuestCount}
                  menuPackages={menuPackages}
                />

                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>Total Advance (20%)</Text>
                  <Text style={styles.totalAmount}>
                    Rs {totalCost.toLocaleString()}
                  </Text>
                  <Text style={styles.totalNote}>
                    * 20% of rental + selected menu cost
                  </Text>
                </View>
              </>
            ) : (
              <ReviewScreen
                route={{ params: { isHallManager: false, hallId } }}
              />
            )}
          </View>
        )}
        ListFooterComponent={() =>
          activeTab === 'info' ? (
            <View style={styles.footer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  if (!selectedPackage) {
                    alert('Please select a menu package');
                    return;
                  }
                  if (!guestCount || parseInt(guestCount) <= 0) {
                    alert('Please enter a valid number of guests');
                    return;
                  }
                  if (!selectedDate) {
                    alert('Please select a date');
                    return;
                  }
                  if (!selectedTime) {
                    alert('Please select a time');
                    return;
                  }

                  // Navigate to next screen to enter other details, for example:
                  navigation.navigate('GuestDetails', {
                    hallId,
                    selectedPackage,
                    guestCount: parseInt(guestCount),
                    selectedDate,
                    selectedTime,
                    totalCost,
                  });
                }}
              >
                <Text style={styles.buttonText}>Book Now</Text>
              </Pressable>
            </View>
          ) : null
        }
      />

      <View style={styles.messageIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <MaterialIcons name="message" size={30} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default MenuDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 20,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    color: colors.secondary,
    fontWeight: 'bold',
    borderColor: colors.secondary,
  },
  content: {
    padding: 16,
    backgroundColor: '#fff',
  },
  rentalCard: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  rentalLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#006064',
    marginBottom: 4,
  },
  rentalAmount: {
    fontSize: 22,
    color: '#004d40',
    fontWeight: 'bold',
  },
  rentalNote: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  totalSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#827717',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5d4037',
  },
  totalNote: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageIconContainer: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
});
