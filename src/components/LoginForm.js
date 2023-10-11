import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Home from './Home';
import styled from '@emotion/styled';
import logoImage from '../styles/logo.png';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #c3c3c3;
`;

const LoginBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: white;
`;

const LoginBoxRight = styled.div`
  margin-left: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 2rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    margin-left: 4rem;
  }
`;

const LoginBoxLeft = styled.div`
  width: 64vw;
  height: 100vh;
  background: #791285;
  position: relative;

  @media (max-width: 768px) {
    display: none; // 모바일에서는 왼쪽 부분을 숨깁니다.
  }
`;

const LogoImage = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20.5rem;
  height: 9.1875rem;
  flex-shrink: 0;
  background-image: url(${logoImage});
  background-repeat: no-repeat;
  background-size: contain;  // 이미지가 div에 맞게 조절됩니다.

  @media (max-width: 768px) {
    width: 15rem;
    height: 6.5rem;
  }
`;


const LoginTitle = styled.div`
  color: #333;
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3rem;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const InputTag = styled.div``;

const LoginInput = styled.input`
  width: 20.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 3.375rem;
  border: 0;
  background: #f7f8fa;
  padding: 0.75rem 0 0.75rem 1.5rem;
  font-family: Spoqa Han Sans Neo;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    width: 18rem;
  }
`;

const LoginButton = styled.button`
  margin-top: 2.75rem;
  width: 20.5rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 3.375rem;
  background: #791285;
  border: 0;
  color: #fff;
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;

  @media (max-width: 768px) {
    width: 18rem;
  }
`;


function LoginForm() {
  const [user_id, setUser_id] = useState('');
  const [user_pw, setUser_pw] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'user_id') {
      setUser_id(value);
    } else if (name === 'user_pw') {
      setUser_pw(value);
    }
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    const data = {
      user_id,
      user_pw,
    };

    try {
      console.log(Cookies.get('csrf_token'))
      // const response = await axios.post('http://127.0.0.1:2305/login', data, {
      const response = await axios.post('http://purpleacademy.net:2305/login', data, {
      headers:{
          'X-CSRFToken': Cookies.get('csrf_token')
        }
      });

      if (response.status === 200) {
        const user = response.data.result;
        const token = response.data.token;

        Cookies.set('token', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(user), { expires: 7 });

        setLoginSuccess(true);
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  return (
    <Wrapper>
      <LoginBox>
        <LoginBoxLeft>
          <LogoImage />
        </LoginBoxLeft>
        <LoginBoxRight>
          {loginSuccess ? (
            <Home />
          ) : (
            <>
              <LoginTitle>Sign in</LoginTitle>
              <form onSubmit={handleSubmit}>
                <InputTag>
                  <LoginInput
                    type="text"
                    id="user_id"
                    name="user_id"
                    value={user_id}
                    onChange={handleChange}
                    placeholder="아이디를 입력해주세요."
                  />
                </InputTag>
                <InputTag>
                  <LoginInput
                    type="password"
                    id="user_pw"
                    name="user_pw"
                    value={user_pw}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요."
                  />
                </InputTag>
                <LoginButton type="submit">Log in</LoginButton>
              </form>
            </>
          )}
        </LoginBoxRight>
      </LoginBox>
    </Wrapper>
  );
}

export default LoginForm;
