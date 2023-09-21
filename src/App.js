import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter를 추가해주세요.
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
    <Router> 
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/`} // 이 부분에서 path를 설정합니다.
          element={<LoginForm />} // 해당 path에 매칭될 컴포넌트를 지정합니다.
        />
      </Routes>
    </Router> 
  );
}

export default App;