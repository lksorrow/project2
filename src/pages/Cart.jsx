import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import CartItem from '../components/CartItem';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, getSubtotal, getTotalDiscount, getTotalPrice, getTotalItems, clearCart, personalDiscount } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      alert('Заказ успешно оформлен! С вами свяжутся для подтверждения.');
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f8f6f4 0%, #fff5f5 100%)',
        color: theme === 'dark' ? 'white' : '#2d2d2d'
      }}>
        <div style={{
          fontSize: '6rem',
          marginBottom: '2rem',
          opacity: 0.7
        }}>
          Корзина
        </div>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Корзина пуста
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: theme === 'dark' ? '#ccc' : '#666',
          marginBottom: '3rem',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          Добавьте услуги из каталога, чтобы сделать заказ
        </p>
        <Link 
          to="/services"
          style={{
            background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
            color: 'white',
            padding: '1.2rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            boxShadow: '0 8px 25px rgba(233,30,99,0.3)',
            transition: 'all 0.3s ease'
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
          Перейти к услугам
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #f8f6f4 0%, #fff5f5 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        color: theme === 'dark' ? 'white' : '#2d2d2d'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: 0,
              background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Корзина заказов
            </h1>
            <p style={{
              color: theme === 'dark' ? '#ccc' : '#666',
              margin: '0.5rem 0 0 0'
            }}>
              {getTotalItems()} услуга(услуг) в корзине
            </p>
          </div>
          
          <button
            onClick={clearCart}
            style={{
              background: 'transparent',
              color: '#ff4444',
              border: `2px solid #ff4444`,
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
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
            Очистить корзину
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          <div>
            <div style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
              overflow: 'hidden'
            }}>
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div style={{
            position: 'sticky',
            top: '2rem'
          }}>
            <div style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`
            }}>
              <h3 style={{
                margin: '0 0 1.5rem 0',
                fontSize: '1.5rem',
                fontWeight: '600',
                color: theme === 'dark' ? '#fff' : '#2d2d2d'
              }}>
                Итог заказа
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>
                    Промежуточный итог:
                  </span>
                  <span style={{ fontWeight: '600' }}>
                    {getSubtotal()} ₽
                  </span>
                </div>

                {personalDiscount > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#4CAF50'
                  }}>
                    <span>Персональная скидка ({personalDiscount}%):</span>
                    <span style={{ fontWeight: '600' }}>
                      -{getTotalDiscount()} ₽
                    </span>
                  </div>
                )}

                {items.some(item => item.discount > 0) && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#4CAF50'
                  }}>
                    <span>Скидки на товары:</span>
                    <span style={{ fontWeight: '600' }}>
                      -{items.reduce((total, item) => {
                        const itemDiscount = item.discount || 0;
                        const finalDiscount = Math.max(itemDiscount, personalDiscount);
                        return total + (item.price * item.quantity * (finalDiscount / 100));
                      }, 0) - getTotalDiscount()} ₽
                    </span>
                  </div>
                )}

                <div style={{
                  height: '2px',
                  background: theme === 'dark' ? '#444' : '#f0f0f0',
                  margin: '0.5rem 0'
                }}></div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.2rem',
                  fontWeight: '700'
                }}>
                  <span>Итого:</span>
                  <span style={{
                    color: '#e91e63',
                    fontSize: '1.5rem'
                  }}>
                    {getTotalPrice()} ₽
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                style={{
                  width: '100%',
                  background: isCheckingOut 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem',
                  borderRadius: '15px',
                  cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  marginBottom: '1rem'
                }}
                onMouseEnter={(e) => {
                  if (!isCheckingOut) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(76,175,80,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCheckingOut) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {isCheckingOut ? (
                  <>
                    <span style={{ marginRight: '0.5rem' }}>⏳</span>
                    Оформление...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: '0.5rem' }}>🎯</span>
                    Оформить заказ
                  </>
                )}
              </button>

              {personalDiscount > 0 && (
                <div style={{
                  background: theme === 'dark' ? '#1a1a1a' : '#f0fff4',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#c8e6c9'}`,
                  textAlign: 'center',
                  marginTop: '1rem'
                }}>
                  <span style={{ 
                    color: '#4CAF50',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                     Ваша персональная скидка {personalDiscount}% применена
                  </span>
                </div>
              )}
            </div>

            <div style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
              padding: '1.5rem',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
              marginTop: '1.5rem'
            }}>
              <h4 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.1rem',
                color: theme === 'dark' ? '#fff' : '#2d2d2d'
              }}>
                Информация о заказе
              </h4>
              <ul style={{
                margin: 0,
                paddingLeft: '1.2rem',
                color: theme === 'dark' ? '#ccc' : '#666',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                <li>Бесплатная доставка от 3000₽</li>
                <li>Время исполнения: 30-45 минут</li>
                <li>Консультация флориста включена</li>
                <li>Возможность отмены за 2 часа</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;