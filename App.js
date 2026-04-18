import React, { useContext } from 'react';
// Importamos SafeAreaView para o iPhone e StatusBar/Platform para o Android
import { TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Ícones
import { Home, List, Heart, Camera as CameraIcon, LogOut } from 'lucide-react-native';

// Contexto e Telas
import { EventProvider, EventContext } from './src/context/EventContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import EventosScreen from './src/screens/EventosScreen';
import FavoritosScreen from './src/screens/FavoritosScreen'; 
import CameraScreen from './src/screens/CameraScreen';

const Tab = createBottomTabNavigator();

// Este componente controla o fluxo de navegação baseado no estado global
function NavigationWrapper() {
  const { user, logout } = useContext(EventContext);

  // 1. Se não estiver logado, mostra apenas a tela de Login
  if (!user) {
    return <LoginScreen />;
  }

  // 2. Se estiver logado, mostra o Menu de Abas (Tabs)
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        // Configuração dos ícones das abas
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Início') return <Home color={color} size={size} />;
          if (route.name === 'Explorar') return <List color={color} size={size} />;
          if (route.name === 'Favoritos') return <Heart color={color} size={size} />;
          if (route.name === 'Câmara') return <CameraIcon color={color} size={size} />;
        },
        tabBarActiveTintColor: '#677019',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#677019' },
        headerTintColor: '#fff',
        
        // Botão de Logout no canto superior direito
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => logout()} 
            style={{ marginRight: 15 }}
          >
            <LogOut color="#fff" size={20} />
          </TouchableOpacity>
        ),
      })}
    >
      {/* Abas comuns a todos */}
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Explorar" component={EventosScreen} />

      {/* Lógica de Perfil (Pilar de Gestão de Usuários) */}
      {user.tipo === 'organizador' ? (
        <Tab.Screen name="Câmara" component={CameraScreen} />
      ) : (
        <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      )}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    //GestureHandlerRootView precisa envolver tudo para o Swipe funcionar
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/*SafeAreaView evita que o app fique por baixo do "notch" (entalhe da câmera) no iPhone */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#677019' }}>
        {/*StatusBar configura a cor da barra de bateria e hora no Android */}
        <StatusBar barStyle="light-content" backgroundColor="#677019" />
        
        <EventProvider>
          <NavigationContainer>
            <NavigationWrapper />
          </NavigationContainer>
        </EventProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}