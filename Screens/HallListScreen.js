import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Blog/Card';
import useApi from '../Hooks/useApi';
import hallsApi from '../api/hall';
import notificationApi from '../api/notification';
import { getData } from '../Utils/storage';

const { height } = Dimensions.get('window');

const HallListScreen = () => {
  const navigation = useNavigation();
  const hallsApiHook = useApi(hallsApi.getAllHalls);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [hasHalls, setHasHalls] = useState(true); // Track whether halls are available

  useEffect(() => {
    const fetchData = () => {
      hallsApiHook.request();
      checkNotifications();
    };

    fetchData();

    const unsubscribe = navigation.addListener('focus', fetchData);

    return unsubscribe;
  }, [navigation]);

  // Watch for changes in halls data or error, and update hasHalls accordingly
  useEffect(() => {
    const halls = Array.isArray(hallsApiHook.data) ? hallsApiHook.data : [];

    if (hallsApiHook.error || halls.length === 0) {
      setHasHalls(false);
    } else {
      setHasHalls(true);
    }
  }, [hallsApiHook.data, hallsApiHook.error]);

  // Show or hide tab bar depending on halls availability
  useLayoutEffect(() => {
    const parent = navigation.getParent();

    if (!hasHalls) {
      parent?.setOptions({ tabBarStyle: { display: 'flex' } });
    } else {
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
    }

    return () => {
      parent?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation, hasHalls]);

  const checkNotifications = async () => {
    try {
      const token = await getData('authToken');
      const response = await notificationApi.getNotifications(token);

      if (response.ok) {
        const unread = response.data.some((n) => !n.read);
        setHasUnreadNotifications(unread);
      }
    } catch (err) {
      console.error('Notification check failed:', err);
    }
  };

  const handleNotificationPress = () => {
    setHasUnreadNotifications(false);
    navigation.navigate('Notification');
  };

  const renderContent = () => {
    if (hallsApiHook.loading) {
      return <ActivityIndicator size="large" color="white" style={{ marginTop: 100 }} />;
    }

    if (hallsApiHook.error) {
      return <Text style={styles.errorText}>Couldn't load halls. Please try again.</Text>;
    }

    const halls = Array.isArray(hallsApiHook.data) ? hallsApiHook.data : [];

    if (halls.length === 0) {
      return <Text style={styles.errorText}>No halls available.</Text>;
    }

    return (
      <FlatList
        data={halls}
        keyExtractor={(item) => (item._id || item.id)?.toString()}
        renderItem={({ item }) => (
          <Card
            hall={item}
            onPress={() =>
              item._id && navigation.navigate('Menu Details', { hallId: item._id })
            }
          />
        )}
        pagingEnabled
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        refreshing={hallsApiHook.loading}
        onRefresh={hallsApiHook.request}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Ionicons name="filter" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNotificationPress}>
            <View>
              <Ionicons name="notifications" size={28} color="white" />
              {hasUnreadNotifications && <View style={styles.badge} />}
            </View>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default HallListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
  },
  topIcons: {
    position: 'absolute',
    top: 50,
    zIndex: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: '#000',
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  },
});
