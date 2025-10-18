import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const ThemedApp = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`app ${theme}`} style={{
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <Router>
        <Header />
        <main style={{
          minHeight: 'calc(100vh - 80px)',
          backgroundColor: 'inherit',
          color: 'inherit'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ThemedApp />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;