import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { PostService } from '../services/post.service';
import Loading from '../components/Loading';

export default function NewClassScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isTitleValid = title.trim().length >= 3;
  const isContentValid = content.trim().length >= 10;
  const isFormValid = isTitleValid && isContentValid;

  async function handleSave() {
    if (!isFormValid) {
      setError('Preencha todos os campos corretamente');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await PostService.create({
        title,
        content,
        userId: user?.id || '1',
        urlImage: 'https://via.placeholder.com/400x200/37ADA5/FFFFFF?text=Nova+Aula',
        posted: true,
        excluded: false,
      });

      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar post');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading message="Salvando..." />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Nova Aula</Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput
            label="Título da aula"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: '#37ADA5' } }}
            error={title.length > 0 && !isTitleValid}
          />
          {title.length > 0 && !isTitleValid && (
            <Text style={styles.helperText}>Mínimo 3 caracteres</Text>
          )}

          <TextInput
            label="Conteúdo da aula"
            value={content}
            onChangeText={setContent}
            mode="outlined"
            multiline
            numberOfLines={10}
            style={[styles.input, styles.textArea]}
            theme={{ colors: { primary: '#37ADA5' } }}
            error={content.length > 0 && !isContentValid}
          />
          {content.length > 0 && !isContentValid && (
            <Text style={styles.helperText}>Mínimo 10 caracteres</Text>
          )}

          <View style={styles.actions}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
              textColor="#37ADA5"
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              disabled={!isFormValid || loading}
              style={styles.button}
              buttonColor="#37ADA5"
            >
              Salvar
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#37ADA5',
    marginBottom: 24,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#282828',
  },
  textArea: {
    minHeight: 200,
  },
  helperText: {
    color: '#FF5252',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 12,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});
