import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { theme } = useTheme();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      const userData = {
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        joinDate: new Date().toLocaleDateString('ru-RU')
      };
      login(userData);
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: 'inherit',
      color: 'inherit'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Вход</h1>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: theme === 'dark' ? '#2d2d2d' : 'white',
        color: theme === 'dark' ? 'white' : 'black',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Имя пользователя:
          </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Введите имя пользователя"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
              borderRadius: '4px',
              backgroundColor: theme === 'dark' ? '#1a1a1a' : 'white',
              color: theme === 'dark' ? 'white' : 'black'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Пароль:
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
              borderRadius: '4px',
              backgroundColor: theme === 'dark' ? '#1a1a1a' : 'white',
              color: theme === 'dark' ? 'white' : 'black'
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#e91e63',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Войти
        </button>
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem',
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
          borderRadius: '4px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
        </div>
      </form>
    </div>
  );
};

export default Login;