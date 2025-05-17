import React, { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Blog/Card';

const { height } = Dimensions.get('window');

const HallListScreen = () => {
  const navigation = useNavigation();
  const halls = [
  {
    id: '1',
    name: 'Royal Palace',
    rating: 4.7,
    location: 'New York',
    price: '$3000/day',
    description: 'Elegant hall with modern interiors.',
    images: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584467735871-276b38e5d4d1?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: '2',
    name: 'Sunset Gardens',
    rating: 4.9,
    location: 'Los Angeles',
    price: '$4000/day',
    description: 'Outdoor vibes with stunning views.',
    images: [
      'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559511260-6d132bca5d5b?auto=format&fit=crop&w=800&q=80',
    ],
  },
];


  
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      parent?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

 

  return (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Ionicons name="filter" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={halls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card hall={item} onPress={() => navigation.navigate('Menu Details')} />}
        pagingEnabled
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </View>
  );
};

export default HallListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
});



