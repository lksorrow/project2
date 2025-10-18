import React, { createContext, useContext, useReducer, useEffect } from 'react';

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
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
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

    default:
      newState = state;
  }

  return newState;
};

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('flowerShopCart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('error:', error);
  }
  return [];
};

const initialState = {
  items: []
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
    const savedItems = loadCartFromStorage();
    if (savedItems.length > 0) {
      dispatch({ type: 'load', payload: savedItems });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('flowerShopCart', JSON.stringify(state.items));
    } catch (error) {
      console.error('error', error);
    }
  }, [state.items]);

  const addToCart = (product) => {
    dispatch({ type: 'add', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'remove', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'update', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'clear' });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};