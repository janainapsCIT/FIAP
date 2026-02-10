import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

type Props = {
  id: string;
  title: string;
  classNumber: string;
  teacher: string;
  image: string;
  onPress: () => void;
};

export default function ClassCard({ title, classNumber, teacher, image, onPress }: Props) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Card.Content style={styles.content}>
        <Text style={styles.classNumber}>{classNumber}</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.teacher}>{teacher}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#282828',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  classNumber: {
    color: '#37ADA5',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  teacher: {
    color: '#999999',
    fontSize: 14,
  },
});
