import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const WeddingImage = ({ width = 200, height = 200, source, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={[{ width, height }, styles.image]} // apply width, height + other styles
        resizeMode="contain" // Ensure the image is fully visible without cropping
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15, // Rounded corners for the image

  },
  image: {
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 12, // Rounded corners for the image itself
  },
});

export default WeddingImage;
