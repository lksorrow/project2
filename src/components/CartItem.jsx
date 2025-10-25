import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, personalDiscount, getItemTotalPrice } = useCart();
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

  const finalDiscount = Math.max(item.discount || 0, personalDiscount);
  const itemTotal = getItemTotalPrice(item);

  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
      padding: '1.5rem',
      borderBottom: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
      background: theme === 'dark' ? '#2a2a2a' : 'white',
      transition: 'all 0.3s ease',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = theme === 'dark' ? '#333' : '#fafafa';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = theme === 'dark' ? '#2a2a2a' : 'white';
    }}
    >
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        color: 'white',
        flexShrink: 0
      }}>
        
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1.2rem',
          fontWeight: '600',
          color: theme === 'dark' ? '#fff' : '#2d2d2d'
        }}>
          {item.name}
        </h4>
        <p style={{
          margin: '0 0 0.5rem 0',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '0.9rem'
        }}>
          {item.description}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: theme === 'dark' ? '#aaa' : '#888',
          fontSize: '0.85rem'
        }}>
          <span>Время</span>
          <span>{item.duration}</span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: theme === 'dark' ? '#333' : '#f5f5f5',
          padding: '0.5rem',
          borderRadius: '12px'
        }}>
          <button
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            style={{
              background: item.quantity <= 1 ? '#ccc' : '#e91e63',
              color: 'white',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            -
          </button>
          
          <span style={{ 
            minWidth: '40px', 
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '1.1rem'
          }}>
            {item.quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            style={{
              background: '#e91e63',
              color: 'white',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            +
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
        minWidth: '120px'
      }}>
        {finalDiscount > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: '#4CAF50'
          }}>
            <span></span>
            <span>-{finalDiscount}%</span>
          </div>
        )}

        <p style={{ 
          fontWeight: '700',
          color: '#e91e63',
          fontSize: '1.2rem',
          margin: 0
        }}>
          {itemTotal} ₽
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
            background: 'transparent',
            color: '#ff4444',
            border: `1px solid #ff4444`,
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ff4444';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#ff4444';
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;