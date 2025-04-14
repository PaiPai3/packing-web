// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.css'; // 引入全局样式
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Topbar />
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;




