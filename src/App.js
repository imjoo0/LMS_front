import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    // 사용자가 로그인하면 isLoggedIn 상태를 true로 설정
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 사용자가 로그아웃하면 isLoggedIn 상태를 false로 설정
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* {isLoggedIn ? (
        // 사용자가 로그인한 경우, 대시보드 또는 다른 컨텐츠 표시
        <Dashboard onLogout={handleLogout} />
      ) : (
        // 사용자가 로그인하지 않은 경우, 로그인 폼 표시
        <LoginForm onLogin={handleLogin} />
      )} */
      <LoginForm onLogin={handleLogin} />
      }

    </div>
  );
}

export default App;
