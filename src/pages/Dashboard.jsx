import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

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
        alignItems: 'flex-start',
        marginBottom: '2rem'
      }}>
        <div>
          <h1>Личный кабинет</h1>
          <p>Добро пожаловать, {user?.username}!</p>
          <p style={{ 
            color: theme === 'dark' ? '#ccc' : '#666',
            fontSize: '0.9rem'
          }}>
            Дата регистрации: {user?.joinDate}
          </p>
        </div>
        <button
          onClick={logout}
          style={{
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Выйти
        </button>
      </div>
      
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
          borderRadius: '8px'
        }}>
          <h3>👤 Профиль</h3>
          <p><strong>Имя:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
          color: theme === 'dark' ? 'white' : 'black',
          borderRadius: '8px'
        }}>
          <h3>📦 История заказов</h3>
          <p>Просмотрите ваши предыдущие заказы</p>
        </div>
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
          color: theme === 'dark' ? 'white' : 'black',
          borderRadius: '8px'
        }}>
          <h3>❤️ Избранное</h3>
          <p>Ваши любимые цветы и букеты</p>
        </div>
        <div style={{
          padding: '1.5rem',
          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
          color: theme === 'dark' ? 'white' : 'black',
          borderRadius: '8px'
        }}>
          <h3>⚙️ Настройки</h3>
          <p>Управление вашим профилем</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;