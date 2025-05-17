import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import colors from '../config/colors';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  const SettingItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      {icon}
      <Text style={styles.itemText}>{label}</Text>
      <Feather name="chevron-right" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <SettingItem
        icon={<Ionicons name="person-outline" size={22} color= {colors.secondary} />}
        label="Edit Profile"
        onPress={() => navigation.navigate('Edit Profile')} // or your route name
      />

      <SettingItem
        icon={<Feather name="lock" size={22} color= {colors.secondary} />}
        label="Change Password"
        onPress={() => navigation.navigate('Change Password')}
      />

      <View style={styles.item}>
        <MaterialIcons name="notifications-none" size={22} color={colors.secondary}/>
        <Text style={styles.itemText}>Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      <SettingItem
        icon={<Feather name="help-circle" size={22} color= {colors.secondary} />}
        label="Help & Support"
        onPress={() => navigation.navigate('Help Support')}
      />

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logout: {
    borderBottomWidth: 0,
    marginTop: 30,
  },
});
