import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'inherit',
      color: 'inherit'
    }}>
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: '#e91e63',
          marginBottom: '1rem'
        }}>
          Добро пожаловать в магазин цветов!
        </h1>
        <p style={{ 
          fontSize: '1.2rem',
          color: theme === 'dark' ? '#ccc' : '#666'
        }}>
          Самые свежие и красивые цветы для ваших любимых
        </p>
        <Link 
          to="/products"
          style={{
            display: 'inline-block',
            backgroundColor: '#e91e63',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            marginTop: '1rem'
          }}
        >
          Перейти к покупкам
        </Link>
      </section>

      <section>
        <h2>Почему выбирают нас?</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
            color: theme === 'dark' ? 'white' : 'black',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>🌹 Свежие цветы</h3>
            <p>Только свежие цветы от проверенных поставщиков</p>
          </div>
          <div style={{
            padding: '1.5rem',
            backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
            color: theme === 'dark' ? 'white' : 'black',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>🚚 Быстрая доставка</h3>
            <p>Доставка в течение 2 часов по городу</p>
          </div>
          <div style={{
            padding: '1.5rem',
            backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
            color: theme === 'dark' ? 'white' : 'black',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>💝 Профессиональные флористы</h3>
            <p>Красивые букеты от опытных флористов</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;