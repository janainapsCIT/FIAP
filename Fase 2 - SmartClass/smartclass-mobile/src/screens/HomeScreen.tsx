import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Searchbar, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import ClassCard from '../components/ClassCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

// Mock data - substituir por API real
const classesMock = [
  {
    id: '1',
    title: 'Introdução ao Design Thinking',
    classNumber: 'Aula 01',
    teacher: 'Prof. João Silva',
    image: 'https://via.placeholder.com/400x200/37ADA5/FFFFFF?text=Aula+1',
    matter: 'UX/UI',
  },
  {
    id: '2',
    title: 'Componentes em React',
    classNumber: 'Aula 02',
    teacher: 'Prof. Maria Santos',
    image: 'https://via.placeholder.com/400x200/37ADA5/FFFFFF?text=Aula+2',
    matter: 'React',
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredClasses = classesMock.filter((classe) => {
    const matchesSearch =
      !searchTerm ||
      classe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classe.classNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Se for professor, filtrar por matéria
    if (user?.role === 'professor' && user.matter) {
      return matchesSearch && classe.matter === user.matter;
    }
    
    return matchesSearch;
  });

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {user?.role === 'professor' ? user.matter : 'Minhas Aulas'}
      </Text>

      <Searchbar
        placeholder="Buscar aulas..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        style={styles.searchBar}
        iconColor="#37ADA5"
        theme={{ colors: { primary: '#37ADA5' } }}
      />

      {filteredClasses.length > 0 ? (
        <FlatList
          data={filteredClasses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClassCard
              {...item}
              onPress={() => navigation.navigate('ClassDetail' as never, { id: item.id } as never)}
            />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <EmptyState
          title="Nenhuma aula encontrada"
          message={searchTerm ? `Nenhum resultado para "${searchTerm}"` : 'Nenhuma aula cadastrada'}
        />
      )}

      {user?.role === 'professor' && (
        <FAB
          icon="plus"
          style={styles.fab}
          color="#FFFFFF"
          onPress={() => navigation.navigate('NewClass' as never)}
        />
      )}
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
  searchBar: {
    marginBottom: 16,
    backgroundColor: '#282828',
  },
  list: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#37ADA5',
  },
});
