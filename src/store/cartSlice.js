import { createSlice } from '@reduxjs/toolkit';

// Load cart state from localStorage if available
const loadCartState = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return {
    items: [],
    totalQuantity: 0,
  };
};

const initialState = loadCartState();

// Save cart state to localStorage
const saveCartState = (state) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      // Only add the item if it doesn't already exist in the cart
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          src: newItem.src,
          alt: newItem.alt,
          quantity: 1, // Always set quantity to 1
        });
        state.totalQuantity++;

        // Save updated state to localStorage
        saveCartState(state);
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        // Always remove the item completely from the cart
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity--;

        // Save updated state to localStorage
        saveCartState(state);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
