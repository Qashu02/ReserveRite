import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ImageViewer = () => {
  const route = useRoute();
  const { images, initialIndex } = route.params;  // Receive images and initial index from route params
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleSwipeLeft = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}>
          <Icon name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.imageCount}>{`${currentIndex + 1} of ${images.length}`}</Text>
        <TouchableOpacity onPress={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}>
          <Icon name="chevron-forward" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / e.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
        }}
        style={styles.imageContainer}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageCount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 500,
    resizeMode: 'contain',
  },
});

export default ImageViewer;
