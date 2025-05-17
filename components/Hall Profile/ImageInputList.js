import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

export default function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollViewRef = useRef();

  const handleAddImage = async (uri) => {
    await onAddImage(uri);
    // Auto-scroll to the end
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {imageUris.map((uri, index) => (
          <View key={index.toString()} style={styles.image}>
            <ImageInput
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
            />
          </View>
        ))}
        <View style={styles.image}>
          <ImageInput onChangeImage={handleAddImage} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 10,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
  },
});
