import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => {
  const { theme } = useTheme();

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'inherit',
      color: 'inherit'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Наши цветы</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;