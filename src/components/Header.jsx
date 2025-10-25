import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems, getTotalPrice, personalDiscount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const applyDiscount = () => {
    const discountCodes = {
      'FLOWER10': 10,
      'SPRING20': 20,
      'VIP30': 30
    };

    const discount = discountCodes[discountCode.toUpperCase()];
    if (discount) {
      useCart().applyPersonalDiscount(discount);
      setShowDiscountModal(false);
      setDiscountCode('');
    } else {
      alert('Неверный промокод');
    }
  };

  return (
    <>
      <header style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        color: theme === 'dark' ? 'white' : '#2d2d2d',
        padding: '1rem 2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderBottom: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)'
      }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
         
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <div 
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                fontSize: '2rem',
                background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                borderRadius: '12px',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                
              </div>
              <h1 style={{ 
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Цветочная Мастерская
              </h1>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <NavLink 
                to="/" 
                style={({ isActive }) => ({
                  color: theme === 'dark' ? 'white' : '#2d2d2d',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  background: isActive 
                    ? (theme === 'dark' ? '#e91e63' : 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)')
                    : 'transparent',
                  color: isActive ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  border: isActive ? 'none' : `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`
                })}
              >
                Главная
              </NavLink>
              <NavLink 
                to="/services" 
                style={({ isActive }) => ({
                  color: theme === 'dark' ? 'white' : '#2d2d2d',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  background: isActive 
                    ? (theme === 'dark' ? '#e91e63' : 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)')
                    : 'transparent',
                  color: isActive ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  border: isActive ? 'none' : `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`
                })}
              >
                Услуги
              </NavLink>
              <NavLink 
                to="/cart" 
                style={({ isActive }) => ({
                  color: theme === 'dark' ? 'white' : '#2d2d2d',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  background: isActive 
                    ? (theme === 'dark' ? '#e91e63' : 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)')
                    : 'transparent',
                  color: isActive ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  border: isActive ? 'none' : `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                })}
              >
                 Корзина 
                {getTotalItems() > 0 && (
                  <span style={{
                    background: '#e91e63',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {getTotalItems()}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           
            <button
              onClick={() => setShowDiscountModal(true)}
              style={{
                background: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Промокод
            </button>

            
            <button
              onClick={toggleTheme}
              style={{
                background: theme === 'dark' ? '#444' : '#f0f0f0',
                color: theme === 'dark' ? 'white' : '#2d2d2d',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <NavLink 
                  to="/dashboard" 
                  style={({ isActive }) => ({
                    color: theme === 'dark' ? 'white' : '#2d2d2d',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    background: isActive 
                      ? (theme === 'dark' ? '#e91e63' : 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)')
                      : 'transparent',
                    color: isActive ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                    fontWeight: '600',
                    border: isActive ? 'none' : `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`
                  })}
                >
                   {user?.username}
                </NavLink>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme === 'dark' ? '#ff4444' : '#ff4444',
                    border: `2px solid #ff4444`,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : (
              <NavLink 
                to="/login" 
                style={({ isActive }) => ({
                  color: theme === 'dark' ? 'white' : '#2d2d2d',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  background: isActive 
                    ? (theme === 'dark' ? '#e91e63' : 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)')
                    : 'transparent',
                  color: isActive ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                  fontWeight: '600',
                  border: isActive ? 'none' : `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`
                })}
              >
                Войти
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      
      {showDiscountModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: theme === 'dark' ? '#2a2a2a' : 'white',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem', color: theme === 'dark' ? 'white' : '#2d2d2d' }}>
               Введите промокод
            </h3>
            <p style={{ 
              marginBottom: '1.5rem', 
              color: theme === 'dark' ? '#ccc' : '#666',
              fontSize: '0.9rem'
            }}>
              Доступные коды: FLOWER10, SPRING20, VIP30
            </p>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Введите промокод..."
              style={{
                width: '100%',
                padding: '1rem',
                border: `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`,
                borderRadius: '12px',
                background: theme === 'dark' ? '#333' : '#fafafa',
                color: theme === 'dark' ? 'white' : '#2d2d2d',
                marginBottom: '1rem',
                fontSize: '1rem'
              }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={applyDiscount}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Применить
              </button>
              <button
                onClick={() => setShowDiscountModal(false)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  border: `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`,
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;