import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Change this to your backend's base URL where images are served from
const BASE_URL = 'http://192.168.1.6:3000'; 

const Card = ({ hall, onPress }) => {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Safely get images array or empty array if undefined
  const images = Array.isArray(hall.pictures) ? hall.pictures : [];

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: activeIndex - 1, animated: true });
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < images.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
      setActiveIndex(activeIndex + 1);
    }
  };

  // Helper function to return full URI for image
  const getFullImageUri = (path) => {
    if (!path) return null;
    // If path already starts with http/https, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Otherwise, prepend base URL
    return BASE_URL + path;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <FlatList
        data={images}
        ref={flatListRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: getFullImageUri(item) }} style={styles.image} />
        )}
      />

      {/* Arrows: only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <View style={styles.leftArrow}>
            <TouchableOpacity onPress={goToPrevious} disabled={activeIndex === 0}>
              <Ionicons name="chevron-back-circle" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.rightArrow}>
            <TouchableOpacity onPress={goToNext} disabled={activeIndex === images.length - 1}>
              <Ionicons name="chevron-forward-circle" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Overlay Info */}
      <View style={styles.overlay}>
        <Text style={styles.name}>{hall.name}</Text>
        <Text style={styles.rating}>
          <FontAwesome name="star" size={18} color="#FFD700" /> {hall.rating ?? 'N/A'}
        </Text>
        <Text style={styles.location}>{hall.location}</Text>
        <Text style={styles.price}>{hall.price}</Text>
        <Text style={styles.description}>{hall.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width,
    height,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    fontSize: 16,
    color: '#eee',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    color: '#00ffcc',
    marginTop: 2,
  },
  rating: {
    position: 'absolute',
    top: 10,
    right: 15,
    fontSize: 16,
    fontWeight: '700',
    color: '#eee',
  },
  description: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 5,
  },
  leftArrow: {
    position: 'absolute',
    top: '45%',
    left: 10,
    zIndex: 2,
  },
  rightArrow: {
    position: 'absolute',
    top: '45%',
    right: 10,
    zIndex: 2,
  },
});

export default Card;
