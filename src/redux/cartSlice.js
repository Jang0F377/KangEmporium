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
            const itemExists = state.cartItems.find((x) => x.name === item.name);
            if (itemExists) {
                const index = state.cartItems.findIndex((x) => x.name === item.name);
                state.cartItems[index].qty++

            } else {
                state.cartItems.push(item)
            }
            // return [...state.cartItems,item]
        },
    },
});

export const {addItemToCart} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartQuantity = (state) => state.cart.cartItems.length;

export default cartSlice.reducer;