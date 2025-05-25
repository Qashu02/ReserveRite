import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Utils/userContext'; // adjust path as needed
import messagesApi from '../api/messages';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import Screen from '../components/Screen';

export default function MessageScreen({ navigation }) {
  const { user, authToken } = useContext(UserContext); // <-- get both user and authToken
  const [messages, setMessages] = useState([]);
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !user._id) {
        console.log('No user found in context');
        return;
      }
      if (!authToken) {
        console.log('No auth token found in context');
        return;
      }

      try {
        // Pass authToken inside your API client headers or as required
        const response = await messagesApi.getUserConversations(user._id, authToken);
        console.log('Conversations API response:', response.data);

        const conversations = response.data || [];
        setMessages(conversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchMessages();
  }, [user, authToken]);

  // Render and other code unchanged...

  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Messages</Text>
      {messages.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No conversations found.</Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id || item.id || Math.random().toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.messageItem}
              onPress={() =>
                navigation.navigate('Chatt', {
                  receiverId: item._id,
                  receiverName: item.name || 'No Name',
                  receiverAvatar: item.avatar?.trim() || defaultAvatar,
                })
              }
            >
              <Image style={styles.avatar} source={{ uri: item.avatar?.trim() || defaultAvatar }} />
              <View style={styles.messageContent}>
                <Text style={styles.name}>{item.name || 'No Name'}</Text>
                <Text style={styles.message}>{item.lastMessage || 'No message yet'}</Text>
              </View>
              <Text style={styles.time}>{item.time || ''}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  messageItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12, backgroundColor: '#eee' },
  messageContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  message: { color: '#555', marginTop: 2 },
  time: { fontSize: 12, color: '#888', alignSelf: 'flex-start' },
  separator: { height: 1, backgroundColor: '#eee' },
});
