import React, { useContext } from 'react';
// Importamos o Platform para tratar a responsividade de sistema (Requisito TP5)
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Heart, Trash2, Edit3, Calendar, MapPin, AlignLeft } from 'lucide-react-native';
import { EventContext } from '../context/EventContext';

export default function EventCard({ evento, onFavoritar, isFavorito, onEditar }) {
  const { user } = useContext(EventContext);
  const forOrganizador = user?.tipo === 'organizador';

  // Lógica de ações ao deslizar (Gesto Swipe - Requisito Mobile)
  const renderRightActions = () => (
    <TouchableOpacity onPress={forOrganizador ? onEditar : onFavoritar}>
      <View style={[
        styles.actionBox, 
        forOrganizador ? styles.bgEdit : (isFavorito ? styles.bgRemove : styles.bgAdd)
      ]}>
        {forOrganizador ? <Edit3 color="#fff" size={24} /> : (isFavorito ? <Trash2 color="#fff" size={24} /> : <Heart color="#fff" size={24} />)}
        <Text style={styles.actionText}>{forOrganizador ? 'Editar' : (isFavorito ? 'Remover' : 'Favoritar')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={styles.card}>
        {/* Título do Evento */}
        <Text style={styles.title}>{evento.title}</Text>
        
        {/* Linha de Data */}
        <View style={styles.infoRow}>
          <Calendar size={14} color="#7f8c8d" />
          <Text style={styles.infoText}>{evento.date}</Text>
        </View>

        {/* Linha de Localização */}
        <View style={styles.infoRow}>
          <MapPin size={14} color="#677019" />
          <Text style={styles.locationText}>{evento.location}</Text>
        </View>

        {/*DESCRIÇÃO DO EVENTO: Dados pertinentes ao tema */}
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText} numberOfLines={3}>
            {evento.body}
          </Text>
        </View>

        {/* Badge de Favorito para Participantes */}
        {!forOrganizador && isFavorito && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>❤ Favorito</Text>
          </View>
        )}
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    marginHorizontal: 15, 
    marginVertical: 8, 
    borderRadius: 12,
    
    // RESPONSIVIDADE DE PLATAFORMA:
    // Diferenciação técnica entre Android e iOS solicitada em feedback
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3, 
      },
    }),
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoText: { marginLeft: 6, color: '#7f8c8d', fontSize: 13 },
  locationText: { marginLeft: 6, color: '#2c3e50', fontSize: 13, fontWeight: '500' },
  
  // Estilo para o Body (Descrição)
  bodyContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  bodyText: {
    color: '#34495e',
    fontSize: 14,
    lineHeight: 20,
  },

  actionBox: { width: 85, height: '85%', marginTop: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginRight: 15 },
  bgAdd: { backgroundColor: '#677019' },
  bgRemove: { backgroundColor: '#e74c3c' },
  bgEdit: { backgroundColor: '#3498db' },
  actionText: { color: '#fff', fontSize: 10, fontWeight: 'bold', marginTop: 4 },
  badge: { backgroundColor: '#67701915', padding: 4, borderRadius: 4, marginTop: 10, alignSelf: 'flex-start' },
  badgeText: { color: '#677019', fontSize: 10, fontWeight: 'bold' }
});