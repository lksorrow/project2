import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { addToCart, getItemQuantity } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const currentQuantity = getItemQuantity(service.id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(service);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div style={{
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }}
    >
      {service.discount > 0 && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          zIndex: 2
        }}>
          -{service.discount}%
        </div>
      )}

      {service.popular && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          zIndex: 2
        }}>
          Популярно
        </div>
      )}

      <div style={{
        width: '100%',
        height: '200px',
        background: imageError 
          ? 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)'
          : `url("${service.image}") center/cover`,
        borderRadius: '15px',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {!imageLoaded && !imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #333 0%, #444 100%)'
              : 'linear-gradient(135deg, #f8f6f4 0%, #e8e4e0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '15px'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              opacity: 0.5,
              animation: 'pulse 2s infinite'
            }}>
              🌷
            </div>
          </div>
        )}
        
        {imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
            borderRadius: '15px'
          }}>
            🌸
          </div>
        )}
        
        <img 
          src={service.image}
          alt={service.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageLoaded && !imageError ? 'block' : 'none',
            borderRadius: '15px'
          }}
        />
      </div>

      <h3 style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1.3rem',
        fontWeight: '600',
        color: theme === 'dark' ? '#fff' : '#2d2d2d'
      }}>
        {service.name}
      </h3>

      <p style={{
        color: theme === 'dark' ? '#ccc' : '#666',
        margin: '0 0 1rem 0',
        lineHeight: '1.5',
        fontSize: '0.95rem',
        minHeight: '45px'
      }}>
        {service.description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        color: theme === 'dark' ? '#aaa' : '#888',
        fontSize: '0.9rem'
      }}>
        <span>⏱️</span>
        <span>Длительность: {service.duration}</span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {service.discount > 0 ? (
          <>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#e91e63'
            }}>
              {service.price} ₽
            </span>
            <span style={{
              fontSize: '1rem',
              color: theme === 'dark' ? '#888' : '#999',
              textDecoration: 'line-through'
            }}>
              {service.originalPrice} ₽
            </span>
          </>
        ) : (
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#e91e63'
          }}>
            {service.price} ₽
          </span>
        )}
      </div>

      {currentQuantity > 0 && (
        <div style={{
          backgroundColor: theme === 'dark' ? '#333' : '#ffeef4',
          padding: '0.75rem',
          borderRadius: '10px',
          marginBottom: '1rem',
          textAlign: 'center',
          border: `1px solid ${theme === 'dark' ? '#444' : '#ffd1dc'}`,
          color: theme === 'dark' ? '#fff' : '#e91e63',
          fontWeight: '600'
        }}>
          В корзине: <strong>{currentQuantity}</strong> шт.
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 5px 15px rgba(233,30,99,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {currentQuantity > 0 ? 'Добавить ещё' : 'В корзину'}
        </button>
        <button
          onClick={() => navigate('/cart')}
          style={{
            background: 'transparent',
            color: '#e91e63',
            border: `2px solid #e91e63`,
            padding: '1rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#e91e63';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#e91e63';
          }}
        >
          🛒
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;