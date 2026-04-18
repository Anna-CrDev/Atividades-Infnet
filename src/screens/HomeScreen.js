import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EventUp</Text>
      <Text style={styles.subtitle}>Sua comunidade, seus eventos.</Text>
      <View style={styles.cardInfo}>
        <Text style={styles.infoText}>Explore eventos locais e salve seus favoritos com um simples deslize!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 20 },
  logo: { fontSize: 42, fontWeight: 'bold', color: '#677019' },
  subtitle: { fontSize: 18, color: '#444', marginBottom: 30 },
  cardInfo: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 10, borderLeftWidth: 5, borderLeftColor: '#677019' },
  infoText: { fontSize: 16, lineHeight: 24, textAlign: 'center' }
});