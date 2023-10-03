import React, { useEffect } from 'react'; // useEffect를 import 합니다.
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // axios를 import 합니다.
import LoginForm from './components/LoginForm';
import Home from './components/Home';

import './App.css';

function App() {
  useEffect(() => {
    async function fetchCsrfToken() {
        try {
            const response = await axios.get('http://127.0.0.1:2305/get_csrf_token'); // axios를 사용하여 요청합니다.
            const csrfToken = response.data.csrf_token;
            Cookies.set('csrf_token', csrfToken, { expires: 7 });
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
        }
    }
    fetchCsrfToken();
  }, []);

  const token = Cookies.get('token');

  return (
    <Routes>
      {/* 토큰이 없는 경우에만 로그인 페이지를 표시 */}
      <Route path="/" element={token ? <Home /> : <LoginForm />} />
    </Routes>
  );
}

export default App;
