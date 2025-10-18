import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { theme } = useTheme();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityChange(item.quantity - 1);
  };

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
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, marginBottom: '0.5rem' }}>{item.name}</h4>
        <p style={{ 
          margin: '0.25rem 0',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '0.9rem'
        }}>
          {item.description}
        </p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        flex: 1,
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            style={{
              backgroundColor: item.quantity <= 1 ? '#ccc' : '#e91e63',
              color: 'white',
              border: 'none',
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            -
          </button>
          
          <span style={{ 
            minWidth: '40px', 
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {item.quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            style={{
              backgroundColor: '#e91e63',
              color: 'white',
              border: 'none',
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            +
          </button>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem'
      }}>
        <p style={{ 
          fontWeight: 'bold',
          color: '#e91e63',
          margin: 0
        }}>
          {item.price * item.quantity} ₽
        </p>
        <p style={{ 
          margin: 0,
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '0.8rem'
        }}>
          {item.price} ₽/шт
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          style={{
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;