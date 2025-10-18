import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div style={{
      backgroundColor: theme === 'dark' ? '#444' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'contain',
          marginBottom: '1rem'
        }}
      />
      <h3 style={{ margin: '0.5rem 0' }}>{product.name}</h3>
      <p style={{ 
        color: theme === 'dark' ? '#ccc' : '#666',
        margin: '0.5rem 0'
      }}>
        {product.description}
      </p>
      <p style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold',
        color: '#e91e63',
        margin: '1rem 0'
      }}>
        {product.price} ₽
      </p>
      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: '#e91e63',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          width: '100%'
        }}
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;