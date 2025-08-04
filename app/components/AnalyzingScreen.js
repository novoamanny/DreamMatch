import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const AnalyzingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#EF84AE" />
      <Text style={styles.text}>Analyzing your hair color...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  text: {
    marginTop: 24,
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AnalyzingScreen;
