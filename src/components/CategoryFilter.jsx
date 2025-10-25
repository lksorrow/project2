import { useTheme } from '../context/ThemeContext';
import { categories } from '../data/categories';

const CategoryFilter = ({ selectedCategories, onCategoryToggle }) => {
  const { theme } = useTheme();

  return (
    <aside style={{
      width: '280px',
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f8f6f4',
      padding: '2rem 1.5rem',
      borderRadius: '20px',
      border: `2px solid ${theme === 'dark' ? '#444' : '#e8e4e0'}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      marginRight: '2rem',
      height: 'fit-content',
      position: 'sticky',
      top: '2rem'
    }}>
      <h3 style={{
        margin: '0 0 1.5rem 0',
        color: theme === 'dark' ? '#fff' : '#2d2d2d',
        fontSize: '1.4rem',
        fontWeight: '700',
        borderBottom: `3px solid #e91e63`,
        paddingBottom: '0.5rem',
        display: 'inline-block'
      }}>
        Категории
      </h3>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {categories.map(category => (
          <label key={category.id} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            backgroundColor: selectedCategories.includes(category.slug) 
              ? (theme === 'dark' ? '#e91e63' : '#ffeef4')
              : 'transparent',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: `2px solid ${
              selectedCategories.includes(category.slug) 
                ? '#e91e63' 
                : 'transparent'
            }`,
            color: theme === 'dark' ? '#fff' : '#2d2d2d',
            fontWeight: '500'
          }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.slug)}
              onChange={() => onCategoryToggle(category.slug)}
              style={{
                marginRight: '12px',
                width: '18px',
                height: '18px',
                accentColor: '#e91e63'
              }}
            />
            {category.name}
          </label>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: theme === 'dark' ? '#333' : '#fff0f6',
        borderRadius: '12px',
        border: `1px dashed ${theme === 'dark' ? '#555' : '#ffb6c1'}`
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.85rem',
          color: theme === 'dark' ? '#ccc' : '#666',
          textAlign: 'center'
        }}>
          Выбрано: {selectedCategories.length} категорий
        </p>
      </div>
    </aside>
  );
};

export default CategoryFilter;