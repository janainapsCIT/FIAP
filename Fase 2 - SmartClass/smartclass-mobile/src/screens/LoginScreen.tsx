import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  async function handleLogin() {
    if (!isFormValid) {
      setError('Preencha email válido e senha com mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    const response = await login(email, password);

    setLoading(false);

    if (!response.success) {
      setError(response.error || 'Falha no login');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            theme={{ colors: { primary: '#37ADA5' } }}
            error={email.length > 0 && !isEmailValid}
          />
          {email.length > 0 && !isEmailValid && (
            <Text style={styles.helperText}>Email inválido</Text>
          )}

          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            theme={{ colors: { primary: '#37ADA5' } }}
            error={password.length > 0 && !isPasswordValid}
          />
          {password.length > 0 && !isPasswordValid && (
            <Text style={styles.helperText}>Mínimo 6 caracteres</Text>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            mode="contained"
            onPress={handleLogin}
            disabled={!isFormValid || loading}
            loading={loading}
            style={styles.button}
            buttonColor="#37ADA5"
          >
            Entrar
          </Button>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#37ADA5',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#282828',
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
  button: {
    marginTop: 10,
    paddingVertical: 6,
  },
});
