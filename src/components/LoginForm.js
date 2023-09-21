import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    user: {},
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    // 서버로 보낼 데이터
    const data = {
      username,
      password,
    };

    try {
      // POST 요청 보내기
      const response = await axios.post(
        'http://purpleacademy.net:2305/login',
        data
      );

      if (response.status === 200) {
        // 서버로부터 응답을 받은 경우
        const user = response.data.data.user;

        // 로그인 성공 처리 및 다음 작업 수행
        console.log('로그인 성공');
        console.log('사용자 정보:', user);

        // 사용자 정보를 상태에 저장하거나 다른 작업을 수행할 수 있습니다.
        this.setState({ user });
      } else {
        // 서버로부터 오류 응답을 받은 경우
        console.error('로그인 실패');
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.error('로그인 중 오류 발생:', error);
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h2>Login Page</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
