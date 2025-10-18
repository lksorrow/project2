import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      backgroundColor: theme === 'dark' ? '#333' : '#f8f9fa',
      color: theme === 'dark' ? 'white' : 'black',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ margin: 0 }}>🌸 Магазин цветов</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <NavLink 
              to="/" 
              style={({ isActive }) => ({
                color: theme === 'dark' ? 'white' : 'black',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: isActive ? (theme === 'dark' ? '#555' : '#e9ecef') : 'transparent'
              })}
            >
              Главная
            </NavLink>
            <NavLink 
              to="/products" 
              style={({ isActive }) => ({
                color: theme === 'dark' ? 'white' : 'black',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: isActive ? (theme === 'dark' ? '#555' : '#e9ecef') : 'transparent'
              })}
            >
              Товары
            </NavLink>
            <NavLink 
              to="/cart" 
              style={({ isActive }) => ({
                color: theme === 'dark' ? 'white' : 'black',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: isActive ? (theme === 'dark' ? '#555' : '#e9ecef') : 'transparent'
              })}
            >
              Корзина ({getTotalItems()})
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/dashboard" 
                  style={({ isActive }) => ({
                    color: theme === 'dark' ? 'white' : 'black',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    backgroundColor: isActive ? (theme === 'dark' ? '#555' : '#e9ecef') : 'transparent'
                  })}
                >
                  Кабинет ({user?.username})
                </NavLink>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme === 'dark' ? 'white' : 'black',
                    border: '1px solid',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Выйти
                </button>
              </>
            ) : (
              <NavLink 
                to="/login" 
                style={({ isActive }) => ({
                  color: theme === 'dark' ? 'white' : 'black',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: isActive ? (theme === 'dark' ? '#555' : '#e9ecef') : 'transparent'
                })}
              >
                Вход
              </NavLink>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: theme === 'dark' ? '#555' : '#e9ecef',
              color: theme === 'dark' ? 'white' : 'black',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;