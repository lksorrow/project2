import { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import ServiceCard from '../components/ServiceCard';
import CategoryFilter from '../components/CategoryFilter';
import { services } from '../data/services';

const Services = () => {
  const { theme } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(service.category);
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, searchTerm]);

  const handleCategoryToggle = (categorySlug) => {
    setSelectedCategories(prev => 
      prev.includes(categorySlug)
        ? prev.filter(cat => cat !== categorySlug)
        : [...prev, categorySlug]
    );
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
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #e91e63 0%, #ff4081 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Наши Услуги
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: theme === 'dark' ? '#ccc' : '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Выберите из широкого спектра цветочных услуг и композиций
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px'
          }}>
            <input
              type="text"
              placeholder="Поиск услуг..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem 1rem 3rem',
                fontSize: '1.1rem',
                border: `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`,
                borderRadius: '50px',
                backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
                color: theme === 'dark' ? '#fff' : '#2d2d2d',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#e91e63';
                e.target.style.boxShadow = '0 0 0 3px rgba(233,30,99,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme === 'dark' ? '#444' : '#e8e4e0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <span style={{
              position: 'absolute',
              left: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              color: '#e91e63'
            }}>
              🔍
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          <CategoryFilter 
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
          />

          <div style={{ flex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: theme === 'dark' ? '#ccc' : '#666'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌷</div>
                <h3 style={{ marginBottom: '1rem' }}>Услуги не найдены</h3>
                <p>Попробуйте изменить параметры поиска или выбрать другие категории</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;