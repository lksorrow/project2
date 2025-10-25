import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : 'linear-gradient(135deg, #f8f6f4 0%, #fff5f5 50%, #ffeef4 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        color: theme === 'dark' ? 'white' : '#2d2d2d'
      }}>
        {}
        <section style={{
          textAlign: 'center',
          padding: '6rem 2rem',
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(233,30,99,0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(233,30,99,0.05) 0%, transparent 70%)',
          borderRadius: '40px',
          marginBottom: '4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'url("/api/placeholder/1200/600") center/cover',
            opacity: theme === 'dark' ? 0.1 : 0.05,
            zIndex: 0
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: '800',
              background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              textShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              Цветочная Мастерская
            </h1>
            <p style={{ 
              fontSize: '1.4rem',
              color: theme === 'dark' ? '#ccc' : '#666',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem',
              lineHeight: '1.6'
            }}>
              Создаём эмоции через цветы. Уникальные букеты и композиции для ваших особенных моментов
            </p>
            <Link 
              to="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                color: 'white',
                padding: '1.2rem 2.5rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                boxShadow: '0 8px 25px rgba(233,30,99,0.3)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(233,30,99,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(233,30,99,0.3)';
              }}
            >
               Выбрать услуги
              <span style={{ fontSize: '1.2rem' }}>→</span>
            </Link>
          </div>
        </section>

        {}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '3rem',
            color: theme === 'dark' ? '#fff' : '#2d2d2d'
          }}>
            Почему выбирают нас?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Быстрое исполнение',
                desc: 'Создаём букеты за 30-45 минут'
              },
              {
                title: 'Уникальный дизайн',
                desc: 'Индивидуальный подход к каждому заказу'
              },
              {
                title: 'Выгодные цены',
                desc: 'Регулярные скидки до 30%'
              },
              {
                title: 'Бесплатная доставка',
                desc: 'При заказе от 3000 рублей'
              },
              {
                title: 'Свежие цветы',
                desc: 'Только проверенные поставщики'
              },
              {
                title: 'VIP услуги',
                desc: 'Эксклюзивные композиции'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                padding: '2.5rem 2rem',
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
                transition: 'all 0.3s ease'
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
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: theme === 'dark' ? '#fff' : '#2d2d2d'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: theme === 'dark' ? '#ccc' : '#666',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;