import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

// createRoot를 사용하여 애플리케이션 초기화
const root = createRoot(rootElement);

root.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>
); 