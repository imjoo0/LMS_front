import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Home from './Home'; // Home 컴포넌트 import

function LoginForm() {
  const [user_id, setUser_id] = useState('');
  const [user_pw, setUser_pw] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 성공 여부 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'user_id') {
      setUser_id(value);
    } else if (name === 'user_pw') {
      setUser_pw(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 서버로 보낼 데이터
    const data = {
      user_id,
      user_pw,
    };

    try {
      // POST 요청 보내기
      const response = await axios.post(
        'http://purpleacademy.net:2305/login',
        data
      );

      if (response.status === 200) {
        // 서버로부터 응답을 받은 경우
        const user = response.data.result;
        const token = response.data.token;

        Cookies.set('token', token, { expires: 7 }); // 7일 동안 유효한 쿠키 설정
        Cookies.set('user', JSON.stringify(user), { expires: 7 }); // 사용자 정보 저장

        setLoginSuccess(true); // 로그인 성공 상태 업데이트

      } else {
        // 서버로부터 오류 응답을 받은 경우
        console.error('로그인 실패');
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.error('로그인 중 오류 발생:', error);
    }
  };

  // 로그인 성공 시 Home 컴포넌트를 렌더링, 아니면 로그인 폼 렌더링
  return (
    <div>
      {loginSuccess ? (
        <Home />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Login Page</h2>
            <label htmlFor="user_id">ID:</label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              value={user_id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="user_pw">PASSWORD:</label>
            <input
              type="password"
              id="user_pw"
              name="user_pw"
              value={user_pw}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
