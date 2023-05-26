import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

export function SecondScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>Takımlar</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
