// LoginForm.js
import React, { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Flask 서버로 로그인 요청 보내기
    try {
      const response = await fetch('http://172.31.37.184:2305/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // 로그인 성공
        // TODO: 다음 작업 수행 (예: 사용자를 다른 페이지로 리디렉션)
        console.log('로그인 성공');
      } else {
        // 로그인 실패
        // TODO: 실패 처리 (예: 오류 메시지 표시)
        console.error('로그인 실패');
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error('네트워크 오류:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;