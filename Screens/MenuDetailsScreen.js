import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';  // For the message icon

import MenuSelector from '../components/Blog/MenuSelector';
import HallInfoSection from '../components/Blog/HallInfoSelection';
import HallAvailability from '../components/Blog/HallAvailability';
import colors from '../config/colors';
import ReviewScreen from './ReviewScreen';
import Screen from '../components/Screen';

const MenuDetailsScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('info');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [guestCount, setGuestCount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const rentalPrice = 30000;

  const menuPackages = [
    {
      id: '1',
      name: 'One Dish',
      description: 'Includes 1 main dish, salad & soft drink',
      pricePerHead: 500,
    },
    {
      id: '2',
      name: 'Two Dishes',
      description: 'Includes 2 mains, salad, raita & dessert',
      pricePerHead: 800,
    },
    {
      id: '3',
      name: 'Full Course',
      description: 'Starters, 2 mains, sides, desserts, drinks',
      pricePerHead: 1200,
    },
  ];

  const menuCost =
    selectedPackage && guestCount
      ? selectedPackage.pricePerHead * parseInt(guestCount || 0)
      : 0;

  const totalCost = Math.round(0.2 * (rentalPrice + menuCost));

  return (
    <Screen style={styles.container}>
      {/* Tab Navigation Row */}
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

      {/* Content Section */}
      <FlatList
        data={[]}
        keyExtractor={() => 'key'}
        ListHeaderComponent={() => (
          <View style={styles.content}>
            {activeTab === 'info' ? (
              <>
                <HallInfoSection />

                {/* Rental Info Section */}
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

                {/* Total Section */}
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
              <ReviewScreen route={{ params: { isHallManager: false } }} />
            )}
          </View>
        )}
        ListFooterComponent={() =>
          activeTab === 'info' ? (
            <View style={styles.footer}>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Book Now</Text>
              </Pressable>
            </View>
          ) : null
        }
      />

      {/* Message Icon (Not navigating) */}
      <View style={styles.messageIconContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate("Messages")}>
          <MaterialIcons name="message" size={30} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default MenuDetailsScreen;

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:'#fff'
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
