import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import NewClassScreen from '../screens/NewClassScreen';
import AdminScreen from '../screens/AdminScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { user, logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1A1A' },
        headerTintColor: '#FFFFFF',
        tabBarStyle: { backgroundColor: '#1A1A1A', borderTopColor: '#37ADA5' },
        tabBarActiveTintColor: '#37ADA5',
        tabBarInactiveTintColor: '#999999',
        headerRight: () => (
          <IconButton icon="logout" iconColor="#37ADA5" onPress={logout} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Aulas',
          tabBarIcon: ({ color }) => (
            <IconButton icon="home" iconColor={color} size={24} />
          ),
        }}
      />
      {user?.role === 'professor' && (
        <Tab.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: 'Gerenciar',
            tabBarIcon: ({ color }) => (
              <IconButton icon="cog" iconColor={color} size={24} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1A1A' },
        headerTintColor: '#FFFFFF',
        headerBackTitleVisible: false,
      }}
    >
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClassDetail"
            component={ClassDetailScreen}
            options={{ title: 'Detalhes da Aula' }}
          />
          <Stack.Screen
            name="NewClass"
            component={NewClassScreen}
            options={{ title: 'Nova Aula' }}
          />
          <Stack.Screen
            name="EditClass"
            component={NewClassScreen}
            options={{ title: 'Editar Aula' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
