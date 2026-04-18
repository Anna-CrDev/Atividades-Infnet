import React from 'react';
// fireEvent: é o "dedo" do robô que clica nos botões
import { render, fireEvent } from '@testing-library/react-native'; 
import EventCard from './EventCard'; 

describe('Componente EventCard - Testes de Comportamento', () => {

  test('deve chamar a função de favoritar quando o usuário clica no botão', () => {
    
    // 1. O MOCK DA FUNÇÃO (O Gravador):
    // jest.fn() cria uma função "espiã". Ela não faz nada, 
    // mas grava se foi chamada, quantas vezes e com quais dados.
    const mockOnFavoritar = jest.fn();

    const eventoMock = {
      id: 123,
      title: 'Show na Praça',
      date: '15/04/2026',
      location: 'Centro'
    };

    // 2. RENDERIZAÇÃO:
    // Passamos a nossa função espiã para a prop 'onFavoritar'
    const { getByText, getByTestId } = render(
      <EventCard 
        evento={eventoMock} 
        isFavorito={false} 
        onFavoritar={mockOnFavoritar} 
      />
    );

    // 3. A AÇÃO DO USUÁRIO (O Cenário Relevante):
    // Procuramos o botão de favoritar. 
    // (Dica: Se o botão não tiver texto, usamos um ID de teste ou o próprio texto 'Favoritar')
    const botaoFavoritar = getByText('Favoritar');
    
    // O robô clica no botão
    fireEvent.press(botaoFavoritar);

    // 4. A RESPOSTA (Validação):
    // Verificamos se a nossa função espiã foi "tocada" pelo clique.
    // Se foi chamada 1 vez, o teste passa.
    expect(mockOnFavoritar).toHaveBeenCalledTimes(1);
    
    // Opcional: Verificar se ela foi chamada com o ID correto do evento
    // expect(mockOnFavoritar).toHaveBeenCalledWith(123);
  });

});