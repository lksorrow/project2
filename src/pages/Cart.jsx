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
        color: 'inherit'
      }}>
        <h1>Корзина пуста</h1>
        <p style={{ marginBottom: '2rem' }}>Добавьте товары из каталога</p>
        <Link 
          to="/products"
          style={{
            backgroundColor: '#e91e63',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none'
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
      color: 'inherit'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>Корзина</h1>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Очистить корзину
        </button>
      </div>

      <div style={{
        backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: theme === 'dark' ? '#2d2d2d' : 'white',
        color: theme === 'dark' ? 'white' : 'black',
        borderRadius: '8px',
        textAlign: 'right'
      }}>
        <h2 style={{ margin: 0 }}>
          Итого: {getTotalPrice()} ₽
        </h2>
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            marginTop: '1rem'
          }}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Cart;