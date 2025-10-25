import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
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
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #f8f6f4 0%, #fff5f5 100%)',
      color: theme === 'dark' ? '#ffffff' : '#2d2d2d',
      transition: 'all 0.5s ease'
    }}>
      <Router>
        <Header />
        <main style={{
          minHeight: 'calc(100vh - 80px)'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
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