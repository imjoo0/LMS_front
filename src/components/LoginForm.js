import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../TokenContext';
import { useUser } from '../UserContext';

function LoginForm() {
  const { user, setUser } = useUser();
  const [user_id, setUser_id] = useState('');
  const [user_pw, setUser_pw] = useState('');
  const { token, setToken } = useToken(); // 토큰 관련 훅 사용
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

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

        // 사용자 정보를 상태에 저장하거나 다른 작업을 수행할 수 있습니다.
        setUser(user);
        setToken(token)

        if (user.category === 2) { // 선생님인 경우
          navigate(`/teacher/${user.id}`); // 리디렉션할 경로 설정
        } else {
          // 다른 경우에는 다른 페이지로 리디렉션할 수 있음
        }
      } else {
        // 서버로부터 오류 응답을 받은 경우
        console.error('로그인 실패');
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.error('로그인 중 오류 발생:', error);
    }
  };

   // 토큰이 있으면 홈 화면을 보여줌, 없으면 로그인 화면을 보여줌
   return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
    </div>
  );
}

export default LoginForm;
// 대용량 트래픽 >w< 