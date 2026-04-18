import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform 
} from 'react-native';
import { EventContext } from '../context/EventContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const { login } = useContext(EventContext);

  const handleEntrar = (perfil) => {
    // Simulação de login diferenciando perfis conforme o cenário 
    login({ 
      email, 
      nome: email.split('@')[0], 
      tipo: perfil 
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <Text style={styles.title}>EventUp</Text>
      <Text style={styles.subtitle}>Gestão Comunitária Colaborativa</Text>

      <TextInput 
        style={styles.input}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleEntrar('participante')}
        >
          <Text style={styles.buttonText}>Entrar como Participante</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.organizerBtn]} 
          onPress={() => handleEntrar('organizador')}
        >
          <Text style={styles.buttonText}>Entrar como Organizador</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#677019', textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 30, color: '#7f8c8d' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 20 },
  buttonContainer: { gap: 10 },
  button: { backgroundColor: '#677019', padding: 15, borderRadius: 8, alignItems: 'center' },
  organizerBtn: { backgroundColor: '#34495e' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});