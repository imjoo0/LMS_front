import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
// import UserProfile from './components/UserProfile';
// import PrivateRoute from './routes/PrivateRoute';

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
    <Router basename={process.env.PUBLIC_URL}> 
      <LoginForm />
    </Router> 
  );
}

export default App;