import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: `1px solid ${theme === 'dark' ? '#555' : '#eee'}`,
      backgroundColor: theme === 'dark' ? '#444' : 'white',
      color: theme === 'dark' ? 'white' : 'black'
    }}>
      <div>
        <h4 style={{ margin: 0 }}>{item.name}</h4>
        <p style={{ 
          margin: '0.25rem 0',
          color: theme === 'dark' ? '#ccc' : '#666'
        }}>
          {item.price} ₽ × {item.quantity}
        </p>
        <p style={{ 
          fontWeight: 'bold',
          color: '#e91e63'
        }}>
          Итого: {item.price * item.quantity} ₽
        </p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Удалить
      </button>
    </div>
  );
};

export default CartItem;