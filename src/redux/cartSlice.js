import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;
            state.cartItems = [...state.cartItems, item];
        },
        removeItemFromCart: (state, action) => {
            const item = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.name !== item.name)
        }
    },
});

export const {addItemToCart, removeItemFromCart} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartQuantity = (state) => state.cart.cartItems.length;

export default cartSlice.reducer;