import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TokenProvider, useToken } from './TokenContext';
import { UserProvider, useUser } from './UserContext'; // UserProvider와 useUser 가져오기
import LoginForm from './components/LoginForm';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <TokenProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<MainApp />} />
        </Routes>
      </UserProvider>
    </TokenProvider>
  );
}

function MainApp() {
  // MainApp 컴포넌트 내에서도 TokenProvider와 UserProvider로 감싸줘야 함
  return (
    <TokenProvider>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={<MainContent />}
          />
        </Routes>
      </UserProvider>
    </TokenProvider>
  );
}

function MainContent() {
  const { token } = useToken();
  const { user } = useUser(); // useUser 훅 사용하여 user 상태 가져오기

  return token ? (
    <Home />
  ) : (
    <LoginForm />
  );
}

export default App;
