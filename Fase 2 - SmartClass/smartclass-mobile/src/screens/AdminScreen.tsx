import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB, IconButton, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PostService, Post } from '../services/post.service';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function AdminScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await PostService.getAll();
      setPosts(data);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await PostService.delete(id);
              loadPosts();
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível excluir o post');
            }
          },
        },
      ]
    );
  }

  if (loading) return <Loading message="Carregando posts..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadPosts} />;
  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Nenhum post cadastrado"
          message="Comece criando seu primeiro post"
          actionLabel="Criar Post"
          onAction={() => navigation.navigate('NewClass' as never)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Posts</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <View style={styles.postInfo}>
                  <Text style={styles.postTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={item.posted ? styles.published : styles.draft}>
                    {item.posted ? '✓ Publicado' : '○ Rascunho'}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <IconButton
                    icon="pencil"
                    iconColor="#37ADA5"
                    size={20}
                    onPress={() =>
                      navigation.navigate('EditClass' as never, { id: item.id } as never)
                    }
                  />
                  <IconButton
                    icon="delete"
                    iconColor="#FF5252"
                    size={20}
                    onPress={() => handleDelete(item.id, item.title)}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => navigation.navigate('NewClass' as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#37ADA5',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#282828',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postInfo: {
    flex: 1,
  },
  postTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  published: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  draft: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#37ADA5',
  },
});
