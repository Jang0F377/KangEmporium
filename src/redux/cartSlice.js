import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const isInCart = state.cartItems.some((x) => x.name === item.name);
      if (isInCart) {
        const addToQty = state.cartItems.find((x) => x.name === item.name);
        addToQty.qty = addToQty.qty + 1;
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItemFromCart: (state, action) => {
      const item = action.payload;
      const moreThanOne = item.qty > 1;
      if (moreThanOne) {
        const minusToQty = state.cartItems.find((x) => x.name === item.name);
        minusToQty.qty = minusToQty.qty - 1;
      } else {
        state.cartItems = state.cartItems.filter((x) => x.name !== item.name);
      }
    },
    strictIncreaseQty: (state, action) => {
      const item = action.payload;
      const isInCart = state.cartItems.find((x) => x.name === item.name);
      if (isInCart) {
        isInCart.qty = isInCart.qty + 1;
      }
    },
    resetState: (state, action) => {
      return initialState;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  strictIncreaseQty,
  resetState,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
