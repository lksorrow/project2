import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import CartItem from '/src/components/CartItem.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { theme } = useTheme();

  if (items.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: 'inherit',
        color: 'inherit',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ marginBottom: '1rem' }}>Корзина пуста</h1>
        <p style={{ 
          marginBottom: '2rem',
          color: theme === 'dark' ? '#ccc' : '#666'
        }}>
          Добавьте товары из каталога, чтобы сделать заказ
        </p>
        <Link 
          to="/products"
          style={{
            backgroundColor: '#e91e63',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'background-color 0.2s'
          }}
        >
          Перейти к товарам
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'inherit',
      color: 'inherit',
      minHeight: '60vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ margin: 0 }}>Корзина покупок</h1>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Очистить корзину
        </button>
      </div>

      <div style={{
        backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div style={{
        padding: '1.5rem',
        backgroundColor: theme === 'dark' ? '#2d2d2d' : 'white',
        color: theme === 'dark' ? 'white' : 'black',
        borderRadius: '8px',
        textAlign: 'right',
        border: `1px solid ${theme === 'dark' ? '#444' : '#e9ecef'}`
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ margin: 0 }}>Итого:</h3>
            <p style={{ 
              margin: '0.5rem 0 0 0',
              color: theme === 'dark' ? '#ccc' : '#666',
              fontSize: '0.9rem'
            }}>
              {items.reduce((total, item) => total + item.quantity, 0)} товара(ов)
            </p>
          </div>
          <h2 style={{ 
            margin: 0,
            color: '#e91e63',
            fontSize: '2rem'
          }}>
            {getTotalPrice()} ₽
          </h2>
        </div>
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            width: '100%',
            transition: 'background-color 0.2s'
          }}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Cart;