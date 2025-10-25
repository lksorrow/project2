import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('flowerShopAuth');
      return saved ? JSON.parse(saved) : false;
    } catch (error) {
      console.error('Error reading auth state:', error);
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('flowerShopUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);

        return {
          ...userData,
          personalDiscount: userData.personalDiscount || 
                           (userData.role === 'vip' ? 25 : 
                            userData.role === 'premium' ? 15 : 10)
        };
      }
      return null;
    } catch (error) {
      console.error('Error reading user data:', error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('flowerShopAuth', JSON.stringify(isAuthenticated));
      if (user) {
        localStorage.setItem('flowerShopUser', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [isAuthenticated, user]);

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!credentials.email || !credentials.password) {
        throw new Error('Все поля обязательны для заполнения');
      }

      if (credentials.password.length < 6) {
        throw new Error('Пароль должен быть не менее 6 символов');
      }

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        username: credentials.email.split('@')[0] || 'user',
        email: credentials.email,
        role: credentials.email.includes('vip') ? 'vip' : 
              credentials.email.includes('premium') ? 'premium' : 'standard',
        joinDate: new Date().toLocaleDateString('ru-RU'),
        personalDiscount: credentials.email.includes('vip') ? 25 : 
                         credentials.email.includes('premium') ? 15 : 10,
        ordersCount: Math.floor(Math.random() * 20) + 1
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setError('');
    try {
      localStorage.removeItem('flowerShopAuth');
      localStorage.removeItem('flowerShopUser');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  const updateProfile = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};