import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'add':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      break;

    case 'remove':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      break;

    case 'update':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
      break;

    case 'clear':
      newState = {
        ...state,
        items: []
      };
      break;

    case 'load':
      newState = {
        ...state,
        items: action.payload || []
      };
      break;

    case 'discount':
      newState = {
        ...state,
        personalDiscount: action.payload
      };
      break;

    default:
      newState = state;
  }

  return newState;
};

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('flowerServicesCart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Ошибка загрузки корзины:', error);
    return [];
  }
};

const initialState = {
  items: [],
  personalDiscount: 0
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.length > 0) {
      dispatch({ type: 'load', payload: savedCart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flowerServicesCart', JSON.stringify(state.items));
  }, [state.items]);

  const getItemTotalPrice = (item) => {
    const itemDiscount = item.discount || 0;
    const finalDiscount = Math.max(itemDiscount, state.personalDiscount);
    const discountedPrice = item.price * (1 - finalDiscount / 100);
    return discountedPrice * item.quantity;
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getTotalDiscount = () => {
    return state.items.reduce((total, item) => {
      const itemDiscount = item.discount || 0;
      const finalDiscount = Math.max(itemDiscount, state.personalDiscount);
      return total + (item.price * item.quantity * (finalDiscount / 100));
    }, 0);
  };

  const getTotalPrice = () => {
    return getSubtotal() - getTotalDiscount();
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (serviceId) => {
    const item = state.items.find(item => item.id === serviceId);
    return item ? item.quantity : 0;
  };

  const addToCart = (service) => {
    dispatch({ type: 'add', payload: service });
  };

  const removeFromCart = (serviceId) => {
    dispatch({ type: 'remove', payload: serviceId });
  };

  const updateQuantity = (serviceId, quantity) => {
    dispatch({ type: 'update', payload: { id: serviceId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'clear' });
  };

  const applyPersonalDiscount = (discount) => {
    dispatch({ type: 'discount', payload: discount });
  };

  const value = {
    items: state.items,
    personalDiscount: state.personalDiscount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPersonalDiscount,
    getSubtotal,
    getTotalDiscount,
    getTotalPrice,
    getTotalItems,
    getItemQuantity,
    getItemTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};