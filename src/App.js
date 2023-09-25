import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginForm from './components/LoginForm';
import Home from './components/Home';


import './App.css';

function App() {
  const token = Cookies.get('token');

  return (
    <Routes>
      {/* 토큰이 없는 경우에만 로그인 페이지를 표시 */}
      <Route path="/" element={token ? <Home /> : <LoginForm />} />
    </Routes>
  );
}

export default App;
