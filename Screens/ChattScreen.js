import React, { useState, useEffect ,useCallback  }  from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';

const ChatScreen = ({ route, navigation }) => {
  const { receiverId, receiverName, receiverAvatar } = route.params;

  // Mock current user, replace with actual authenticated user id
  const currentUser = { _id: '1', name: 'Current User' };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Fetch messages from API on mount
  useEffect(() => {
    fetchMessages();
  }, []);

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
    try {
      const response = await fetch(
        `https://your-api.com/api/messages?receiverId=${receiverId}&senderId=${currentUser._id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      // Assuming API returns messages sorted newest first
      setMessages(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load messages');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const now = new Date();
    const newMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'me',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toDateString(),
    };

    // Optimistically add message locally
    setMessages([newMessage, ...messages]);
    setInput('');

    try {
      const response = await fetch('https://your-api.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: currentUser._id,
          receiverId: receiverId,
          text: newMessage.text,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Optionally, update message list with server response (e.g., new message id)
      const savedMessage = await response.json();
      // Replace optimistic message with server message
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter(
          (msg) => msg.id !== newMessage.id
        );
        return [savedMessage, ...updatedMessages];
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send message');
      // Optionally rollback optimistic update or mark message as failed
    }
  };

  const renderItem = ({ item, index }) => {
    const showDateHeader =
      index === messages.length - 1 || messages[index + 1]?.date !== item.date;

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
            item.sender === 'me' ? styles.myMessage : styles.otherMessage,
          ]}
        >
          <View style={styles.timeAndText}>
            <Text style={[styles.messageText, { marginRight: 10 }]}>
              {item.text}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri:
              receiverAvatar ||
              'https://cdn-icons-png.flaticon.com/512/149/149071.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{receiverName || 'Chat'}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        inverted
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontSize: 16, fontWeight: 'bold' },
  dateHeader: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 13,
    color: '#888',
  },
  message: {
    marginVertical: 4,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: '#d1e7ff',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  timeAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#555',
  },
  messageText: {
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ChatScreen;
