// screens/ChatScreen.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import messagesApi from '../api/messages';
import { UserContext } from '../Utils/userContext'; // Import UserContext

const ChatScreen = ({ route, navigation }) => {
  const { user, authToken } = useContext(UserContext);  // Get user & token from context
  const { receiverId, receiverName, receiverAvatar } = route.params;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Make sure user & token are loaded before fetching messages
  useEffect(() => {
    if (user && authToken) {
      fetchMessages();
    }
  }, [user, authToken]);

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        parent?.setOptions({ tabBarStyle: { display: 'flex' } });
      };
    }, [navigation])
  );

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await messagesApi.getConversation(receiverId, authToken);
      const messagesData = response.data;
      setMessages(Array.isArray(messagesData) ? messagesData : []);
    } catch (error) {
      let errorMessage = 'Failed to load messages';
      if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Check your connection and server.';
      } else {
        errorMessage = error.message;
      }
      Alert.alert('Connection Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const messageText = input.trim();
    const now = new Date();

    const optimisticMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: user._id,
      senderId: user._id,
      receiverId,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toDateString(),
      createdAt: now.toISOString(),
      isPending: true,
    };

    setMessages((prev) => [optimisticMessage, ...prev]);
    setInput('');
    setIsSending(true);

    try {
      const messageData = {
        senderId: user._id,
        receiverId,
        text: messageText,
      };

      const response = await messagesApi.sendMessage(messageData, authToken);
      const savedMessage = response.data;

      setMessages((prevMessages) => {
        const updated = prevMessages.filter((msg) => msg.id !== optimisticMessage.id);
        return [savedMessage, ...updated];
      });

    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
      setInput(messageText);

      let errorMessage = 'Failed to send message';
      if (error.response) {
        errorMessage = `Send failed: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Message not sent.';
      } else {
        errorMessage = error.message;
      }

      Alert.alert('Send Error', errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  if (!user || !authToken) {
    return (
      <Screen style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading user data...</Text>
      </Screen>
    );
  }

  const renderItem = ({ item, index }) => {
    const showDateHeader = index === messages.length - 1 || messages[index + 1]?.date !== item.date;
    const isMyMessage = item.sender === user._id || item.senderId === user._id;

    return (
      <View>
        {showDateHeader && (
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        <View
          style={[
            styles.message,
            isMyMessage ? styles.myMessage : styles.otherMessage,
            item.isPending && styles.pendingMessage,
          ]}
        >
          <View style={styles.timeAndText}>
            <Text style={[styles.messageText, { marginRight: 10 }]}>{item.text}</Text>
            <View style={styles.messageStatus}>
              <Text style={styles.timeText}>{item.time}</Text>
              {item.isPending && (
                <Ionicons name="time-outline" size={12} color="#888" style={{ marginLeft: 4 }} />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <Image
          source={{
            uri:
              receiverAvatar ||
              'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{receiverName || 'Chat'}</Text>
        <TouchableOpacity onPress={fetchMessages} style={styles.refreshButton} disabled={isLoading}>
          <Ionicons name="refresh" size={20} color={isLoading ? '#ccc' : colors.secondary} />
        </TouchableOpacity>
      </View>

      {isLoading && messages.length === 0 && (
        <View style={styles.loadingContainer}>
          <Text>Loading messages...</Text>
        </View>
      )}

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || item._id?.toString() || Math.random().toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        inverted
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySubtext}>Start the conversation!</Text>
            </View>
          )
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={1000}
          editable={!isSending}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!input.trim() || isSending}
          style={[styles.sendButton, { opacity: input.trim() && !isSending ? 1 : 0.5 }]}
        >
          <Ionicons name={isSending ? 'hourglass-outline' : 'send'} size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  refreshButton: { padding: 5 },
  dateHeader: {
    backgroundColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  dateText: { color: '#555', fontSize: 14 },
  message: {
    marginVertical: 3,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  myMessage: {
    backgroundColor: colors.secondary,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e1e1e1',
    alignSelf: 'flex-start',
  },
  pendingMessage: {
    opacity: 0.7,
  },
  timeAndText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    flexShrink: 1,
  },
  messageStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 10,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  emptySubtext: { fontSize: 14, color: '#888', marginTop: 5 },
});

export default ChatScreen;
