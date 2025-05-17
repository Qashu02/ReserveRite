import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import colors from '../config/colors';

export default function AdminDashboardScreen({ navigation }) {
  const [totalUsers, setTotalUsers] = useState(120); 
  const [activeUsers, setActiveUsers] = useState(95);

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Welcome, Admin!</Text>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Feather name="users" size={24} color="white" />
          <Text style={styles.cardValue}>{totalUsers}</Text>
          <Text style={styles.cardLabel}>Total Users</Text>
        </View>
        <View style={styles.card}>
          <Feather name="user-check" size={24} color="white" />
          <Text style={styles.cardValue}>{activeUsers}</Text>
          <Text style={styles.cardLabel}>Active Users</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <Text style={styles.sectionTitle}>Manage</Text>
      <View style={styles.actions}>
        <ActionButton 
          icon={<Ionicons name="chatbubble-ellipses-outline" size={28} color={colors.secondary} />} 
          label="Manage Feedback" 
          onPress={() => navigation.navigate('Manage Feedback')} 
        />
        <ActionButton 
          icon={<Ionicons name="business-outline" size={28} color={colors.secondary} />} 
          label="Manage Halls" 
          onPress={() =>navigation.navigate('Manage Halls')} 
        />
        <ActionButton 
          icon={<Feather name="users" size={28} color={colors.secondary} />} 
          label="Manage Users" 
          onPress={() => navigation.navigate('Manage Users')} 
        />
        <ActionButton 
          icon={<Ionicons name="card-outline" size={28} color={colors.secondary} />} 
          label="Manage Payments" 
          onPress={() =>navigation.navigate('Manage Payments')} 
        />
      </View>
    </ScrollView>
  );
}

// Reusable ActionButton component
const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <View style={styles.iconWrapper}>{icon}</View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginVertical: 16,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 10,
    marginBottom: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
