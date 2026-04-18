import React, { createContext, useState } from 'react';
import dadosIniciais from '../data/events.json'; // Importa o JSON original

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // ESTADOS GLOBAIS
  const [eventos, setEventos] = useState(dadosIniciais); // Lista de eventos mutável
  const [favoritos, setFavoritos] = useState([]);        // IDs favoritos
  const [user, setUser] = useState(null);                // Usuário logado

  // FUNÇÕES DE AUTENTICAÇÃO
  const login = (userData) => setUser(userData);
  const logout = () => { setUser(null); setFavoritos([]); };

  // FUNÇÃO DE FAVORITOS (Para Participantes)
  const toggleFavorito = (eventoId) => {
    setFavoritos((prev) => 
      prev.includes(eventoId) ? prev.filter(id => id !== eventoId) : [...prev, eventoId]
    );
  };

  // FUNÇÃO DE EDIÇÃO (Para Organizadores -)
  const editarEvento = (id, novoTitulo) => {
    setEventos((listaAtual) => 
      listaAtual.map((ev) => 
        ev.id === id ? { ...ev, title: novoTitulo } : ev
      )
    );
  };

  return (
    <EventContext.Provider value={{ 
      eventos, favoritos, user, 
      login, logout, toggleFavorito, editarEvento 
    }}>
      {children}
    </EventContext.Provider>
  );
};