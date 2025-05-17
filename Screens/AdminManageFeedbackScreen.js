import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import Screen from '../components/Screen';
export default function AdminManageFeedbackScreen() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: '1',
      hallName: 'Grand Palace Hall',
      userName: 'Ali Khan',
      userEmail: 'alikhan@example.com',
      description: 'The hall was clean and spacious, but parking was limited.',
      date: '2025-04-25',
    },
    {
      id: '2',
      hallName: 'Sunset Gardens',
      userName: 'Sara Ahmed',
      userEmail: 'sara.ahmed@example.com',
      description: 'Decoration was beautiful but food was not up to the mark.',
      date: '2025-04-24',
    },
    {
      id: '3',
      hallName: 'Royal Banquet',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      description: 'Music system had issues during the event.',
      date: '2025-04-23',
    },
  ]);

  const handleDelete = (id) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
  };

  const renderFeedback = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.hallName}>Hall: {item.hallName}</Text>
      <Text style={styles.userName}>Name: {item.userName}</Text>
      <Text style={styles.userEmail}>Email: {item.userEmail}</Text>
      <Text style={styles.description}>Feedback: {item.description}</Text>
      <Text style={styles.date}>Date: {item.date}</Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete Report</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Screen>

    <FlatList
      data={feedbacks}
      keyExtractor={(item) => item.id}
      renderItem={renderFeedback}
      contentContainerStyle={styles.container}
      />
      </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
   
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  hallName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  userName: {
    fontSize: 16,
    color: colors.text,
    marginTop: 5,
  },
  userEmail: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 2,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: colors.dark,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: colors.medium,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
