import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={`/LMS_front/`} element={<LoginForm />} />
      <Route path={`/LMS_front/about`} exact={true} element={<LoginForm />} />
    </Routes>
  );
}

export default App;