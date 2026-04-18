# 📱 Atividades-Infnet

Aplicativo mobile desenvolvido com **React Native + Expo** como projeto de bloco (TP5). O app permite que usuários façam login, explorem eventos, adicionem favoritos e, caso sejam organizadores, acessem a câmera do dispositivo.

---

## 🚀 Funcionalidades

- 🔐 **Login** — autenticação simples com controle de perfil (participante ou organizador)
- 🏠 **Home** — tela inicial de boas-vindas
- 📋 **Explorar Eventos** — lista de eventos carregados de um JSON local
- ❤️ **Favoritos** — salvar eventos favoritos (disponível para participantes)
- 📷 **Câmera** — acesso à câmera do dispositivo (disponível para organizadores)
- 🚪 **Logout** — botão no header para encerrar a sessão

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão |
|---|---|
| Expo | ~54.0.33 |
| React | 19.1.0 |
| React Native | 0.81.5 |
| React Navigation (Bottom Tabs) | ^7.0.0 |
| Expo Camera | ~17.0.10 |
| Lucide React Native | 0.284.0 |
| React Native Reanimated | ~4.1.1 |
| React Native Gesture Handler | ~2.28.0 |

---

## 📂 Estrutura do Projeto

```
├── App.js                   # Ponto de entrada, navegação por abas
├── index.js                 # Entry point do Expo
├── app.json                 # Configurações do Expo
├── package.json
├── assets/                  # Ícones e splash screen
└── src/
    ├── components/
    │   ├── EventCard.js         # Componente de card de evento
    │   └── EventCard.test.js    # Testes do componente
    ├── context/
    │   └── EventContext.js      # Context API (estado global)
    ├── data/
    │   └── events.json          # Dados de eventos
    └── screens/
        ├── LoginScreen.js
        ├── HomeScreen.js
        ├── EventosScreen.js
        ├── FavoritosScreen.js
        └── CameraScreen.js
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado
- Aplicativo **Expo Go** no celular (Android ou iOS)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/Atividades-Infnet.git

# Entre na pasta
cd Atividades-Infnet

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```

Escaneie o QR Code com o aplicativo **Expo Go** para rodar no celular.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos — Instituto Infnet.
