import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

type Props = {
  message?: string;
};

export default function Loading({ message = 'Carregando...' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#37ADA5" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
});
