import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { EventContext } from '../context/EventContext';
import EventCard from '../components/EventCard';

// IMPORTANTE: Não importamos o JSON aqui para não pegar dados desatualizados

export default function FavoritosScreen() {
  // Pegamos 'eventos' (a lista viva) e 'favoritos' (os IDs) do contexto
  const { eventos, favoritos, toggleFavorito } = useContext(EventContext);

  // Filtramos a lista VIVA de eventos. 
  // Se o título mudar no contexto, muda aqui automaticamente!
  const meusFavoritos = eventos.filter(ev => favoritos.includes(ev.id));

  if (meusFavoritos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Nenhum evento favoritado ainda.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={meusFavoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventCard 
            evento={item} 
            isFavorito={true} 
            onFavoritar={() => toggleFavorito(item.id)} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#7f8c8d', fontSize: 16 },
});