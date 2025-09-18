import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Admin from './pages/admin.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin/>
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
