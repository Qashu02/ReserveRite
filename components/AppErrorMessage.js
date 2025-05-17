import React from 'react';
import { Text, StyleSheet } from 'react-native';

function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default AppErrorMessage;
