import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { theme } = useTheme();
  const { isAuthenticated, login, loading, error } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email обязателен';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Некорректный формат email';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Пароль обязателен';
        } else if (value.length < 6) {
          newErrors.password = 'Пароль должен быть не менее 6 символов';
        } else {
          delete newErrors.password;
        }
        break;
        
      default:
        break;
    }
    
    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validateField(field, credentials[field]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(validateField(name, value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ email: true, password: true });
    
    const emailErrors = validateField('email', credentials.email);
    const passwordErrors = validateField('password', credentials.password);
    const finalErrors = { ...emailErrors, ...passwordErrors };
    
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }
    
    const result = await login(credentials);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '1.2rem 1.5rem',
    border: `2px solid ${
      errors[fieldName] 
        ? '#ff4444' 
        : touched[fieldName] && !errors[fieldName] 
          ? '#4CAF50' 
          : (theme === 'dark' ? '#444' : '#e8e4e0')
    }`,
    borderRadius: '15px',
    backgroundColor: theme === 'dark' ? '#333' : '#fafafa',
    color: theme === 'dark' ? '#fff' : '#2d2d2d',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit'
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #f8f6f4 0%, #fff5f5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        padding: '3rem 2.5rem',
        borderRadius: '25px',
        boxShadow: '0 25px 70px rgba(0,0,0,0.15)',
        border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
        maxWidth: '480px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-30%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
          borderRadius: '50%',
          opacity: 0.05
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-20%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
          borderRadius: '50%',
          opacity: 0.05
        }}></div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 1.5rem',
              boxShadow: '0 10px 25px rgba(233,30,99,0.3)'
            }}>
              🔐
            </div>
            <h1 style={{
              margin: '0 0 0.5rem 0',
              fontSize: '2.2rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Вход в аккаунт
            </h1>
            <p style={{
              color: theme === 'dark' ? '#ccc' : '#666',
              margin: 0,
              fontSize: '1.1rem'
            }}>
              Добро пожаловать обратно!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                color: theme === 'dark' ? '#fff' : '#2d2d2d',
                fontSize: '1rem'
              }}>
                Email адрес
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="your@email.com"
                style={getInputStyle('email')}
                disabled={loading}
              />
              {errors.email && touched.email && (
                <div style={{
                  color: '#ff4444',
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>⚠️</span>
                  {errors.email}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <label style={{
                  fontWeight: '600',
                  color: theme === 'dark' ? '#fff' : '#2d2d2d',
                  fontSize: '1rem'
                }}>
                  Пароль
                </label>
                <Link 
                  to="/forgot-password"
                  style={{
                    color: '#e91e63',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Забыли пароль?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                placeholder="Введите ваш пароль"
                style={getInputStyle('password')}
                disabled={loading}
              />
              {errors.password && touched.password && (
                <div style={{
                  color: '#ff4444',
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>⚠️</span>
                  {errors.password}
                </div>
              )}
            </div>

            {error && (
              <div style={{
                background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <span>❌</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading 
                  ? '#ccc' 
                  : 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                color: 'white',
                border: 'none',
                padding: '1.3rem',
                borderRadius: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(233,30,99,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{ marginRight: '0.75rem' }}>⏳</span>
                  Вход в систему...
                </>
              ) : (
                <>
                  <span style={{ marginRight: '0.75rem' }}>🚀</span>
                  Войти в аккаунт
                </>
              )}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;