import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import colors from '../config/colors';
import { getData, removeData } from '../Utils/storage';
import Toast from 'react-native-toast-message';
import AuthApi from '../api/auth'; // ✅ Your logout API call

const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getData('user');
        if (storedUser) {
          console.log('Loaded user data from storage:', storedUser); // Debugging line
          setUser(storedUser);
        } else {
          console.log('No user found in storage');
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
  
    loadUser();
  }, []);
  

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          navigation.navigate('Auth')
          try {
            await AuthApi.logout(); // ✅ Call your API
            await removeData('user');
            Toast.show({
              type: 'success',
              text1: 'Logged Out',
              text2: 'You have been successfully logged out.',
            });
         
          } catch (error) {
            console.error('Logout failed', error);
            Toast.show({
              type: 'error',
              text1: 'Logout Failed',
              text2: 'Something went wrong. Please try again.',
            });
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileSection} onPress={() => navigation.navigate('Edit Profile')}>
        <Image source={{ uri: user.avatar || defaultAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Message')}>
        <Ionicons name="chatbubbles-outline" size={22} color={colors.secondary} />
        <Text style={styles.menuText}>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Booking History')}>
        <MaterialIcons name="history" size={22} color={colors.secondary} />
        <Text style={styles.menuText}>Booking History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Track Booking')}>
        <Ionicons name="location-outline" size={22} color={colors.secondary} />
        <Text style={styles.menuText}>Track Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SettingsPage')}>
        <Feather name="settings" size={22} color={colors.secondary} />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, styles.logout]} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    color: '#777',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: colors.dark,
  },
  logout: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
});
