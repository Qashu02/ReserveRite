import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import colors from '../config/colors'; // Ensure this file has color definitions
import Screen from '../components/Screen';

const { width, height } = Dimensions.get('window');

export default function AdminManageHallRequest() {
  const [halls, setHalls] = useState([
    {
      id: '1',
      name: 'Grand Palace Hall',
      description: 'A beautiful hall for weddings and parties. Spacious with modern facilities.',
      location: 'Downtown City',
      services: ['Catering', 'Decoration', 'Music', 'Lighting'],
      status: 'pending',
      rentalPrice: '25000',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      ],
      packages: [
        {
          menu: 'BBQ, Biryani, Cold Drinks',
          price: '1200',
        },
        {
          menu: 'BBQ, Biryani, Karahi, Dessert Table',
          price: '1800',
        },
      ],
    },
    {
      id: '2',
      name: 'Sunset Gardens',
      description: 'Outdoor garden ideal for birthday parties and special occasions.',
      location: 'City Park',
      services: ['Photography', 'Live Band'],
      status: 'pending',
      rentalPrice: '18000',
      images: [
        'https://images.unsplash.com/photo-1612531384832-3c60e72d4ee3',
        'https://images.unsplash.com/photo-1600047506528-47e1c5b8de6b',
      ],
      packages: [
        {
          menu: 'Snacks, Soft Drinks',
          price: '800',
        },
        {
          menu: 'Snacks, BBQ, Full Course Meal',
          price: '1500',
        },
      ],
    },
  ]);

  const handleAccept = (hallId) => {
    setHalls((prevHalls) =>
      prevHalls.map((hall) =>
        hall.id === hallId ? { ...hall, status: 'approved' } : hall
      )
    );
  };

  const handleReject = (hallId) => {
    setHalls((prevHalls) =>
      prevHalls.map((hall) =>
        hall.id === hallId ? { ...hall, status: 'rejected' } : hall
      )
    );
  };

  const renderHall = ({ item }) => (
    <View style={styles.card}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroll}
      >
        {item.images.map((imgUrl, index) => (
          <Image key={index} source={{ uri: imgUrl }} style={styles.image} />
        ))}
      </ScrollView>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.rentalPrice}>Rental Price: Rs {item.rentalPrice}</Text>

        {/* Services */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Services:</Text>
          {item.services.map((service, index) => (
            <Text key={index} style={styles.serviceItem}>• {service}</Text>
          ))}
        </View>

        {/* Packages */}
        <View style={styles.packagesContainer}>
          <Text style={styles.sectionTitle}>Packages (Menu and Price):</Text>
          {item.packages.map((pkg, index) => (
            <View key={index} style={styles.packageItem}>
              <Text style={styles.packageMenu}>Menu: {pkg.menu}</Text>
              <Text style={styles.packagePrice}>Price: Rs {pkg.price}</Text>
            </View>
          ))}
        </View>

        {/* Status */}
        <Text style={styles.status}>Status: {item.status}</Text>

        {/* Action Buttons */}
        {item.status === 'pending' && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'green' }]}
              onPress={() => handleAccept(item.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red' }]}
              onPress={() => handleReject(item.id)}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Screen>
      <FlatList
        data={halls}
        keyExtractor={(item) => item.id}
        renderItem={renderHall}
        contentContainerStyle={{ padding: 10 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    overflow: 'hidden',
    minHeight: height - 100, // Takes most of the screen height
  },
  imageScroll: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  location: {
    fontSize: 16,
    color: colors.medium,
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: colors.dark,
    marginBottom: 10,
  },
  rentalPrice: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  servicesContainer: {
    marginBottom: 10,
  },
  packagesContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  serviceItem: {
    fontSize: 14,
    color: colors.medium,
    marginLeft: 8,
  },
  packageItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  packageMenu: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  packagePrice: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    color: 'orange',
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
