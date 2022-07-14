import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalPrice:0,
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;
            const isInCart = state.cartItems.some((x) => x.name === item.name)
            if (isInCart) {
                const addToQty = state.cartItems.find((x) => x.name === item.name)
                console.log("Is In Cart")
                addToQty.qty = addToQty.qty + 1
            } else {
                console.log("Not in Cart")
                state.cartItems = [...state.cartItems, item];
            }
        },
        removeItemFromCart: (state, action) => {
            const item = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.name !== item.name)
        },
    },
});

export const {addItemToCart, removeItemFromCart,} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartQuantity = (state) => state.cart.cartItems.length;
export const selectCartTotal = (state) => state.cart.cartTotalPrice

export default cartSlice.reducer;