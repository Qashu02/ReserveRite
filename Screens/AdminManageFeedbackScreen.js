import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import colors from '../config/colors';
import Screen from '../components/Screen';
import supportApi from '../api/support';
import { UserContext } from '../Utils/userContext'; // adjust path as needed

export default function AdminManageFeedbackScreen() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authToken, user } = useContext(UserContext); // get token & user info from context
console.log("Auth Token:", authToken);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const response = await supportApi.getAllRequests(authToken, user);
      setLoading(false);
console.log(response)
      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Access Denied',
          text2: response.data.message,
        });
        return;
      }

      setFeedbacks(response.data);
    };

    fetchRequests();
  }, [authToken, user]);

const handleDelete = (id) => {
  setFeedbacks((prev) => prev.filter((feedback) => (feedback._id || feedback.id) !== id));
  Toast.show({
    type: 'success',
    text1: 'Deleted',
    text2: 'Feedback deleted successfully',
  });
};


  const renderFeedback = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.hallName}>Subject: {item.subject || 'Unknown'}</Text>
      <Text style={styles.userName}>Name: {item.name || 'Unknown'}</Text>
      <Text style={styles.userEmail}>Email: {item.email || 'Unknown'}</Text>
      <Text style={styles.description}>Feedback: {item.message || '-'}</Text>
     <Text style={styles.date}>
  Date: {item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}
</Text>


      <TouchableOpacity
        style={styles.deleteButton}
       onPress={() => handleDelete(item._id || item.id)}

      >
        <Text style={styles.deleteButtonText}>Delete Report</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Screen>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text>Loading feedbacks...</Text>
        </View>
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderFeedback}
          contentContainerStyle={styles.container}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No feedbacks found.</Text>
            </View>
          }
        />
      )}
      <Toast />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { marginTop: 40, alignItems: 'center' },
  emptyText: { color: colors.medium, fontSize: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 3 },
  hallName: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  userName: { fontSize: 16, color: colors.text, marginTop: 5 },
  userEmail: { fontSize: 14, color: colors.medium, marginTop: 2, marginBottom: 8 },
  description: { fontSize: 15, color: colors.dark, marginBottom: 6 },
  date: { fontSize: 12, color: colors.medium, marginBottom: 10 },
  deleteButton: { backgroundColor: colors.secondary, padding: 10, borderRadius: 8, alignItems: 'center' },
  deleteButtonText: { color: 'white', fontWeight: 'bold' },
});
