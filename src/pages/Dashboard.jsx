import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Dashboard = () => {
  const { theme } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const { getTotalItems, getTotalPrice, personalDiscount, applyPersonalDiscount } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Всего заказов',
      value: user?.ordersCount || '0',
      change: '+2 за месяц',
      color: '#e91e63'
    },
    {
      title: 'Общая сумма',
      value: `${((user?.ordersCount || 0) * 2500).toLocaleString()} ₽`,
      change: '+5,200 ₽',
      color: '#4CAF50'
    },
    {
      title: 'Ваша скидка',
      value: `${personalDiscount}%`,
      change: 'Персональная',
      color: '#FF9800'
    },
    {
      title: 'Бонусные баллы',
      value: '1,250',
      change: 'Доступно для списания',
      color: '#9C27B0'
    }
  ];

  const recentOrders = [
  ];

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      display: 'inline-block'
    };

    switch (status) {
      case 'completed':
        return {
          ...baseStyle,
          background: theme === 'dark' ? '#1b5e20' : '#e8f5e8',
          color: theme === 'dark' ? '#a5d6a7' : '#2e7d32'
        };
      case 'pending':
        return {
          ...baseStyle,
          background: theme === 'dark' ? '#f57c00' : '#fff3e0',
          color: theme === 'dark' ? '#ffe0b2' : '#ef6c00'
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #f8f6f4 0%, #fff5f5 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        color: theme === 'dark' ? 'white' : '#2d2d2d'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  margin: '0 0 0.5rem 0',
                  background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {user?.username}
                </h1>
                <p style={{
                  fontSize: '1.1rem',
                  color: theme === 'dark' ? '#ccc' : '#666',
                  margin: 0
                }}>
                  {user?.role === 'vip' ? '👑 VIP Клиент' : 
                   user?.role === 'premium' ? '⭐ Премиум Клиент' : '👍 Стандартный Клиент'}
                </p>
              </div>
            </div>
            <p style={{
              color: theme === 'dark' ? '#888' : '#999',
              fontSize: '0.9rem',
              margin: '0.5rem 0 0 0'
            }}>
               Дата регистрации: {user?.joinDate}
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                background: activeTab === 'profile' 
                  ? 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)'
                  : 'transparent',
                color: activeTab === 'profile' ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                border: `2px solid ${activeTab === 'profile' ? 'transparent' : (theme === 'dark' ? '#444' : '#e8e4e0')}`,
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
               Профиль
            </button>
            <button
              onClick={logout}
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
               Выйти
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
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
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '80px',
                height: '80px',
                background: stat.color,
                borderRadius: '50%',
                opacity: 0.1
              }}></div>
              
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                {stat.icon}
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0',
                color: theme === 'dark' ? '#fff' : '#2d2d2d'
              }}>
                {stat.title}
              </h3>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: stat.color,
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: theme === 'dark' ? '#4CAF50' : '#2e7d32',
                fontWeight: '500'
              }}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          <div>
            <div style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
              marginBottom: '2rem'
            }}>
              <h3 style={{
                margin: '0 0 1.5rem 0',
                fontSize: '1.5rem',
                fontWeight: '600',
                color: theme === 'dark' ? '#fff' : '#2d2d2d',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                 История заказов
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {recentOrders.map(order => (
                  <div key={order.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: theme === 'dark' ? '#333' : '#f8f6f4',
                    borderRadius: '15px',
                    border: `1px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.background = theme === 'dark' ? '#3a3a3a' : '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.background = theme === 'dark' ? '#333' : '#f8f6f4';
                  }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {order.image}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <div style={{
                          fontWeight: '600',
                          color: theme === 'dark' ? '#fff' : '#2d2d2d',
                          fontSize: '1.1rem'
                        }}>
                          {order.name}
                        </div>
                        <div style={{
                          fontWeight: '700',
                          color: '#e91e63',
                          fontSize: '1.1rem'
                        }}>
                          {order.price} ₽
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          fontSize: '0.9rem',
                          color: theme === 'dark' ? '#ccc' : '#666'
                        }}>
                          Дата {order.date}
                        </div>
                        <div style={getStatusStyle(order.status)}>
                          {order.status === 'completed' ? ' Выполнен' : ' В обработке'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '20px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.1)'
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.5rem',
                  fontWeight: '600'
                }}>
                   Специальное предложение!
                </h3>
                <p style={{
                  margin: '0 0 1.5rem 0',
                  fontSize: '1.1rem',
                  opacity: 0.9
                }}>
                  Как {user?.role === 'vip' ? 'VIP клиент' : 'постоянный клиент'} вы получаете эксклюзивные скидки и ранний доступ к новым коллекциям.
                </p>
                <button
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.2)';
                  }}
                >
                  Узнать больше
                </button>
              </div>
            </div>
          </div>

          <div>

            <div style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #2a2a2a 0%, #333 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
              marginBottom: '2rem'
            }}>
              <h3 style={{
                margin: '0 0 1.5rem 0',
                fontSize: '1.3rem',
                fontWeight: '600',
                color: theme === 'dark' ? '#fff' : '#2d2d2d',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                 Текущая корзина
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>
                    Товаров:
                  </span>
                  <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                    {getTotalItems()} шт.
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>
                    Общая сумма:
                  </span>
                  <span style={{ fontWeight: '700', color: '#e91e63', fontSize: '1.2rem' }}>
                    {getTotalPrice()} ₽
                  </span>
                </div>
                {personalDiscount > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#4CAF50',
                    fontWeight: '600'
                  }}>
                    <span>Ваша скидка:</span>
                    <span>{personalDiscount}%</span>
                  </div>
                )}
              </div>

              <button
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(233,30,99,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Перейти к корзине
              </button>
            </div>

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
                margin: '0 0 1rem 0',
                fontSize: '1.3rem',
                fontWeight: '600',
                color: theme === 'dark' ? '#fff' : '#2d2d2d',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Программа лояльности
              </h3>
              
              <div style={{
                background: theme === 'dark' ? '#1a1a1a' : '#fff5f5',
                padding: '1rem',
                borderRadius: '12px',
                border: `1px solid ${theme === 'dark' ? '#333' : '#ffd1dc'}`,
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: user?.role === 'vip' 
                      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                      : user?.role === 'premium'
                      ? 'linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)'
                      : 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {user?.role === 'vip' ? '👑' : user?.role === 'premium' ? '⭐' : '👍'}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: theme === 'dark' ? '#fff' : '#2d2d2d'
                    }}>
                      {user?.role === 'vip' ? 'VIP Уровень' : 
                       user?.role === 'premium' ? 'Премиум Уровень' : 'Стандартный Уровень'}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: theme === 'dark' ? '#ccc' : '#666'
                    }}>
                      Скидка {personalDiscount}%
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: '0.9rem',
                color: theme === 'dark' ? '#ccc' : '#666',
                lineHeight: '1.5'
              }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                   <strong>Следующий уровень:</strong> 
                  {user?.role === 'standard' ? ' Премиум (15% скидка)' : 
                   user?.role === 'premium' ? ' VIP (25% скидка)' : ' Максимальный уровень достигнут!'}
                </p>
                <p style={{ margin: 0 }}>
                   <strong>Для повышения:</strong> {user?.role === 'vip' ? '0' : '5'} заказов осталось
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;