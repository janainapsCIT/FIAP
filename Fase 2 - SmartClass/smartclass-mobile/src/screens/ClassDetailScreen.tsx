import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function ClassDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { id } = route.params as { id: string };
  const [loading, setLoading] = useState(false);

  // Mock data - substituir por API real
  const classDetail = {
    id,
    title: 'Introdução ao Design Thinking',
    content: '<h2>Bem-vindo à aula!</h2><p>Nesta aula vamos explorar os conceitos fundamentais do Design Thinking...</p>',
    teacher: 'Prof. João Silva',
    image: 'https://via.placeholder.com/400x200/37ADA5/FFFFFF?text=Aula',
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: classDetail.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{classDetail.title}</Text>
        <Text style={styles.teacher}>Por {classDetail.teacher}</Text>

        <View style={styles.divider} />

        <Text style={styles.contentText}>
          {classDetail.content.replace(/<[^>]*>/g, '')}
        </Text>

        {user?.role === 'professor' && (
          <View style={styles.actions}>
            <Button
              mode="contained"
              icon="pencil"
              onPress={() => navigation.navigate('EditClass' as never, { id } as never)}
              style={styles.button}
              buttonColor="#37ADA5"
            >
              Editar
            </Button>
            <Button
              mode="outlined"
              icon="delete"
              onPress={() => {}}
              style={styles.button}
              textColor="#FF5252"
            >
              Excluir
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  teacher: {
    fontSize: 16,
    color: '#37ADA5',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#37ADA5',
    marginVertical: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 30,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
