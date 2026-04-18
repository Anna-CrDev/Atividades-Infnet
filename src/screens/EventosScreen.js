import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { EventContext } from '../context/EventContext';
import EventCard from '../components/EventCard';

export default function EventosScreen() {
  // Pegamos tudo o que precisamos do "cérebro" do App
  const { eventos, favoritos, toggleFavorito, editarEvento } = useContext(EventContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.hint}>Deslize para gerenciar o evento ➔</Text>
      </View>

      <FlatList
        data={eventos} // Dados vêm do estado global, permitindo a atualização em tempo real
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventCard 
            evento={item} 
            isFavorito={favoritos.includes(item.id)} 
            onFavoritar={() => toggleFavorito(item.id)}
            // Passamos a função de editar que adiciona um marcador no título
            onEditar={() => editarEvento(item.id, item.title + " (Editado)")} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  headerInfo: { backgroundColor: '#67701915', padding: 10 },
  hint: { textAlign: 'center', fontSize: 12, color: '#677019', fontWeight: 'bold' }
});